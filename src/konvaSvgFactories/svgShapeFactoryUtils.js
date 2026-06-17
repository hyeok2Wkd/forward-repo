// Shared helper for SVG-like Konva.Shape factories.
//
// Design goals for this version:
// 1. Each SVG is rendered as a single Konva.Shape, not a Konva.Group.
// 2. No Konva node `name` is assigned.
// 3. No drag/transform coordinate correction helpers are included.
//    Keep Konva's x/y/width/height/scaleX/scaleY/rotation exactly as they are.
// 4. Stroke width is fixed in screen pixels, independent of Shape size and transforms.
// 5. Rect strokes are edge-aligned so their outside edge stays on the SVG boundary.

import Konva from 'konva';

const pathCache = new Map();
export const FIXED_STROKE_WIDTH_RATIO_ATTR = 'fixedStrokeWidthRatio';
export const DEFAULT_FIXED_STROKE_WIDTH_RATIO = 3;

export function normalizeFixedStrokeWidthRatio(value, fallback = DEFAULT_FIXED_STROKE_WIDTH_RATIO) {
  const numericValue = Number(value);
  const fallbackValue = Number(fallback);
  const safeFallback = Number.isFinite(fallbackValue) && fallbackValue > 0
    ? fallbackValue
    : DEFAULT_FIXED_STROKE_WIDTH_RATIO;

  return Number.isFinite(numericValue) && numericValue > 0
    ? numericValue
    : safeFallback;
}

export function getFixedStrokeWidthRatio(shape) {
  const value = shape && typeof shape.getAttr === 'function'
    ? shape.getAttr(FIXED_STROKE_WIDTH_RATIO_ATTR)
    : undefined;

  return normalizeFixedStrokeWidthRatio(value);
}

export function createSvgLikeShape({
  id,
  shapeType,
  baseWidth,
  baseHeight,
  viewBox = { x: 0, y: 0, width: baseWidth, height: baseHeight },
  drawCommands,
  x = 0,
  y = 0,
  width = baseWidth,
  height = baseHeight,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
  strokeWidthRatio = DEFAULT_FIXED_STROKE_WIDTH_RATIO,
} = {}) {
  const safeWidth = Math.max(width || baseWidth || viewBox.width || 1, 1);
  const safeHeight = Math.max(height || baseHeight || viewBox.height || 1, 1);

  const shape = new Konva.Shape({
    id,
    x,
    y,
    width: safeWidth,
    height: safeHeight,
    scaleX,
    scaleY,
    rotation,
    draggable,

    // Do not set Konva `name`.
    // Use custom attrs instead if the app needs to identify the object type.
    shapeType,
    equipmentType: shapeType,
    svgBaseWidth: baseWidth,
    svgBaseHeight: baseHeight,
    [FIXED_STROKE_WIDTH_RATIO_ATTR]: normalizeFixedStrokeWidthRatio(strokeWidthRatio),

    // hitFunc uses fillStrokeShape, so provide a fill only for hit canvas.
    // It is not used by sceneFunc.
    fill: 'black',

    sceneFunc(context, shape) {
      drawSvgLikeScene(context, shape, drawCommands, viewBox);
    },

    hitFunc(context, shape) {
      context.beginPath();
      context.rect(0, 0, Math.max(shape.width(), 1), Math.max(shape.height(), 1));
      context.closePath();
      context.fillStrokeShape(shape);
    },
  });

  return shape;
}

export function serializeSvgLikeShape(shape) {
  return {
    id: shape.id(),
    type: shape.getAttr('shapeType'),
    x: shape.x(),
    y: shape.y(),
    width: shape.width(),
    height: shape.height(),
    scaleX: shape.scaleX(),
    scaleY: shape.scaleY(),
    rotation: shape.rotation(),
    draggable: shape.draggable(),
    strokeWidthRatio: getFixedStrokeWidthRatio(shape),
  };
}

function drawSvgLikeScene(context, shape, commands, viewBox) {
  const ctx = getNativeContext(context);

  const width = Math.max(shape.width(), 1);
  const height = Math.max(shape.height(), 1);
  const scaleX = width / Math.max(viewBox.width, 1);
  const scaleY = height / Math.max(viewBox.height, 1);
  const canvasPixelScale = getCanvasPixelScale(ctx, shape);
  const shapeScale = getShapeScale(shape, viewBox, canvasPixelScale);

  ctx.save();

  // Convert SVG viewBox coordinates into this Shape's local width/height.
  ctx.scale(scaleX, scaleY);
  ctx.translate(-viewBox.x, -viewBox.y);

  // Clip to the original SVG viewBox. This approximates mask/clipPath usage.
  ctx.beginPath();
  ctx.rect(viewBox.x, viewBox.y, viewBox.width, viewBox.height);
  ctx.clip();

  for (const command of commands) {
    drawCommand(ctx, command, viewBox, shapeScale);
  }

  ctx.restore();
}

function drawCommand(ctx, command, viewBox, shapeScale) {
  ctx.save();
  ctx.globalAlpha = command.opacity == null ? 1 : command.opacity;
  ctx.setLineDash([]);

  if (command.type === 'fixedLine') {
    drawFixedLine(ctx, command, viewBox, shapeScale);
    ctx.restore();
    return;
  }

  if (command.type === 'fixedRectGrid') {
    drawFixedRectGrid(ctx, command, viewBox);
    ctx.restore();
    return;
  }

  if (command.type === 'fixedEllipseStroke') {
    drawFixedEllipseStroke(ctx, command, shapeScale);
    ctx.restore();
    return;
  }

  if (command.type === 'fixedPolygonStroke') {
    drawFixedPolygonStroke(ctx, command, shapeScale);
    ctx.restore();
    return;
  }

  if (command.type === 'fixedChamferOctagon') {
    drawFixedChamferOctagon(ctx, command, viewBox, shapeScale);
    ctx.restore();
    return;
  }

  if (command.type === 'path') {
    const path = getPath(command.data);
    if (path) paintPath(ctx, path, command, shapeScale);
    ctx.restore();
    return;
  }

  // For primitive rects, fill and stroke are handled separately so that
  // rect strokes can be edge-aligned.
  if (command.type === 'rect') {
    if (command.fill) {
      createPrimitivePath(ctx, command);
      ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
      ctx.fill(command.fillRule === 'evenodd' ? 'evenodd' : 'nonzero');
    }

    if (command.stroke) {
      drawEdgeAlignedRectStroke(ctx, command, shapeScale);
    }

    ctx.restore();
    return;
  }

  createPrimitivePath(ctx, command);
  paintCurrentPath(ctx, command, shapeScale);
  ctx.restore();
}

function drawFixedLine(ctx, command, viewBox, shapeScale) {
  const { scaleX, scaleY, maxScale } = getCurrentCanvasScale(ctx);
  const edge = command.edge;
  const isHorizontal = edge === 'top'
    || edge === 'bottom'
    || command.y1 === command.y2;
  const isVertical = edge === 'left'
    || edge === 'right'
    || command.x1 === command.x2;
  const strokeWidth = command.strokeWidth || 1;
  const lineScale = isHorizontal
    ? scaleY
    : isVertical
      ? scaleX
      : maxScale;
  const dashScale = isHorizontal
    ? scaleX
    : isVertical
      ? scaleY
      : maxScale;
  const designLineScale = shapeScale.strokeMaxScale;
  const designDashScale = isHorizontal
    ? shapeScale.strokeScaleX
    : isVertical
      ? shapeScale.strokeScaleY
      : shapeScale.strokeMaxScale;
  const localLineWidth = (strokeWidth * designLineScale) / Math.max(lineScale, 0.0001);
  let x1 = command.x1 == null ? viewBox.x : command.x1;
  let y1 = command.y1 == null ? viewBox.y : command.y1;
  let x2 = command.x2 == null ? viewBox.x + viewBox.width : command.x2;
  let y2 = command.y2 == null ? viewBox.y + viewBox.height : command.y2;

  if (edge === 'top') {
    y1 = viewBox.y + localLineWidth / 2;
    y2 = y1;
  } else if (edge === 'bottom') {
    y1 = viewBox.y + viewBox.height - localLineWidth / 2;
    y2 = y1;
  } else if (edge === 'left') {
    x1 = viewBox.x + localLineWidth / 2;
    x2 = x1;
  } else if (edge === 'right') {
    x1 = viewBox.x + viewBox.width - localLineWidth / 2;
    x2 = x1;
  }

  if (isVertical && command.innerEdgeX != null && command.innerEdgeSide) {
    const innerEdgeX = Number(command.innerEdgeX);
    if (Number.isFinite(innerEdgeX)) {
      const sideOffset = command.innerEdgeSide === 'left'
        ? localLineWidth / 2
        : command.innerEdgeSide === 'right'
          ? -localLineWidth / 2
          : 0;
      x1 = innerEdgeX + sideOffset;
      x2 = x1;
    }
  }

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = applyOpacity(command.stroke || 'black', command.strokeOpacity);
  ctx.lineWidth = localLineWidth;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;

  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash.map((value) => (
      (value * designDashScale) / Math.max(dashScale, 0.0001)
    )));
  }

  ctx.stroke();
}

function drawFixedRectGrid(ctx, command, viewBox) {
  const { scaleX, scaleY } = getCurrentCanvasScale(ctx);
  const usesDesignScale = command.sizingMode === 'heightScale';
  const horizontalDesignRatio = usesDesignScale
    ? Math.max(scaleY, 1) / Math.max(scaleX, 1)
    : 1 / Math.max(scaleX, 1);
  const verticalDesignRatio = usesDesignScale
    ? 1
    : 1 / Math.max(scaleY, 1);
  const localRectWidth = (command.rectWidth || 1) * horizontalDesignRatio;
  const localRectHeight = (command.rectHeight || 1) * verticalDesignRatio;
  const localGapX = (command.gapX == null ? 0 : command.gapX) * horizontalDesignRatio;
  const localGapY = (command.gapY == null ? 0 : command.gapY) * verticalDesignRatio;
  const localPaddingLeft = (command.paddingLeft == null ? command.paddingX || 0 : command.paddingLeft) * horizontalDesignRatio;
  const localPaddingRight = (command.paddingRight == null ? command.paddingX || 0 : command.paddingRight) * horizontalDesignRatio;
  const localPaddingTop = (command.paddingTop == null ? command.paddingY || 0 : command.paddingTop) * verticalDesignRatio;
  const localPaddingBottom = (command.paddingBottom == null ? command.paddingY || 0 : command.paddingBottom) * verticalDesignRatio;
  const minX = viewBox.x + localPaddingLeft;
  const minY = viewBox.y + localPaddingTop;
  const maxX = viewBox.x + viewBox.width - localPaddingRight;
  const maxY = viewBox.y + viewBox.height - localPaddingBottom;
  const stepX = Math.max(localRectWidth + localGapX, localRectWidth);
  const stepY = Math.max(localRectHeight + localGapY, localRectHeight);

  if (localRectWidth <= 0 || localRectHeight <= 0 || maxX <= minX || maxY <= minY) {
    return;
  }

  const availableWidth = maxX - minX;
  const availableHeight = maxY - minY;
  const columnCount = Math.max(
    Math.floor((availableWidth + localGapX) / Math.max(stepX, 0.0001)),
    0
  );
  const rowCount = Math.max(
    Math.floor((availableHeight + localGapY) / Math.max(stepY, 0.0001)),
    0
  );
  const usedWidth = columnCount > 0
    ? columnCount * localRectWidth + Math.max(columnCount - 1, 0) * localGapX
    : 0;
  const usedHeight = rowCount > 0
    ? rowCount * localRectHeight + Math.max(rowCount - 1, 0) * localGapY
    : 0;
  const startX = minX + Math.max((availableWidth - usedWidth) / 2, 0);
  const startY = minY + Math.max((availableHeight - usedHeight) / 2, 0);

  ctx.fillStyle = applyOpacity(command.fill || 'black', command.fillOpacity);

  for (let row = 0; row < rowCount; row += 1) {
    const y = startY + row * stepY;
    for (let column = 0; column < columnCount; column += 1) {
      const x = startX + column * stepX;
      ctx.fillRect(x, y, localRectWidth, localRectHeight);
    }
  }
}

function drawFixedEllipseStroke(ctx, command, shapeScale) {
  const { maxScale } = getCurrentCanvasScale(ctx);
  const strokeWidth = command.strokeWidth || 1;
  const localLineWidth = (strokeWidth * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001);
  const inset = command.edgeAligned === false ? 0 : localLineWidth / 2;
  const rx = Math.max((command.rx == null ? command.r : command.rx) - inset, 0);
  const ry = Math.max((command.ry == null ? command.r : command.ry) - inset, 0);

  if (!rx || !ry) return;

  ctx.beginPath();
  ctx.ellipse(command.cx || 0, command.cy || 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.closePath();
  ctx.strokeStyle = applyOpacity(command.stroke || 'black', command.strokeOpacity);
  ctx.lineWidth = localLineWidth;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;

  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash.map((value) => (
      (value * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001)
    )));
  }

  ctx.stroke();
}

function drawFixedPolygonStroke(ctx, command, shapeScale) {
  const points = command.points || [];
  if (points.length < 2) return;

  if (command.edgeAligned !== false && command.closed !== false && !Array.isArray(command.dash) && points.length > 2) {
    drawEdgeAlignedPolygonStroke(ctx, command, points, shapeScale);
    return;
  }

  const { maxScale } = getCurrentCanvasScale(ctx);
  const strokeWidth = command.strokeWidth || 1;
  const localLineWidth = (strokeWidth * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001);
  const inset = command.edgeAligned === false ? 0 : localLineWidth / 2;
  const strokePoints = inset && points.length > 2
    ? offsetClosedPolygon(points, inset)
    : points;

  if (strokePoints.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(strokePoints[0].x, strokePoints[0].y);
  for (let index = 1; index < strokePoints.length; index += 1) {
    ctx.lineTo(strokePoints[index].x, strokePoints[index].y);
  }
  if (command.closed !== false) ctx.closePath();

  ctx.strokeStyle = applyOpacity(command.stroke || 'black', command.strokeOpacity);
  ctx.lineWidth = localLineWidth;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;

  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash.map((value) => (
      (value * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001)
    )));
  }

  ctx.stroke();
}

function drawFixedChamferOctagon(ctx, command, viewBox, shapeScale) {
  const points = getFixedChamferOctagonPoints(ctx, command, viewBox);
  if (points.length < 8) return;

  if (command.fill) {
    ctx.beginPath();
    drawPolygonPath(ctx, points);
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill(command.fillRule === 'evenodd' ? 'evenodd' : 'nonzero');
  }

  if (command.stroke) {
    drawEdgeAlignedPolygonStroke(ctx, { ...command, points }, points, shapeScale);
  }
}

function getFixedChamferOctagonPoints(ctx, command, viewBox) {
  const { scaleX, scaleY } = getCurrentCanvasScale(ctx);
  const x = command.x == null ? viewBox.x : command.x;
  const y = command.y == null ? viewBox.y : command.y;
  const width = command.width == null ? viewBox.width : command.width;
  const height = command.height == null ? viewBox.height : command.height;
  const chamferX = Math.max(command.chamferX || 0, 0);
  const chamferY = Math.max(command.chamferY || 0, 0);
  const slopeLockedChamferX = chamferX * (scaleY / Math.max(scaleX, 0.0001));
  const clampedChamferX = Math.min(slopeLockedChamferX, width / 2);
  const clampedChamferY = Math.min(chamferY, height / 2);
  const right = x + width;
  const bottom = y + height;

  return [
    { x: x + clampedChamferX, y },
    { x: right - clampedChamferX, y },
    { x: right, y: y + clampedChamferY },
    { x: right, y: bottom - clampedChamferY },
    { x: right - clampedChamferX, y: bottom },
    { x: x + clampedChamferX, y: bottom },
    { x, y: bottom - clampedChamferY },
    { x, y: y + clampedChamferY },
  ];
}

function drawEdgeAlignedPolygonStroke(ctx, command, points, shapeScale) {
  const matrix = ctx && typeof ctx.getTransform === 'function'
    ? ctx.getTransform()
    : null;
  const targetStrokeWidth = (command.strokeWidth || 1) * shapeScale.strokeMaxScale;

  if (!matrix || targetStrokeWidth <= 0) {
    drawFixedPolygonStrokeFallback(ctx, command, points, shapeScale);
    return;
  }

  const canvasPoints = points.map((point) => transformPoint(matrix, point));
  const innerCanvasPoints = offsetClosedPolygon(canvasPoints, targetStrokeWidth);
  const innerPoints = innerCanvasPoints.map((point) => inverseTransformPoint(matrix, point));

  if (innerPoints.some((point) => !point)) {
    drawFixedPolygonStrokeFallback(ctx, command, points, shapeScale);
    return;
  }

  ctx.beginPath();
  drawPolygonPath(ctx, points);
  drawPolygonPath(ctx, innerPoints);
  ctx.fillStyle = applyOpacity(command.stroke || 'black', command.strokeOpacity);
  ctx.fill('evenodd');
}

function drawFixedPolygonStrokeFallback(ctx, command, points, shapeScale) {
  const { maxScale } = getCurrentCanvasScale(ctx);
  const strokeWidth = command.strokeWidth || 1;
  const localLineWidth = (strokeWidth * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001);
  const inset = localLineWidth / 2;
  const strokePoints = offsetClosedPolygon(points, inset);

  if (strokePoints.length < 2) return;

  ctx.beginPath();
  drawPolygonPath(ctx, strokePoints);
  ctx.strokeStyle = applyOpacity(command.stroke || 'black', command.strokeOpacity);
  ctx.lineWidth = localLineWidth;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;
  ctx.stroke();
}

function drawPolygonPath(ctx, points) {
  if (!points.length) return;

  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.closePath();
}

function offsetClosedPolygon(points, inset) {
  const area = getPolygonSignedArea(points);
  const normalDirection = area >= 0 ? 1 : -1;
  const edgeLines = points.map((point, index) => {
    const next = points[(index + 1) % points.length];
    const dx = next.x - point.x;
    const dy = next.y - point.y;
    const length = Math.hypot(dx, dy) || 1;
    const normal = {
      x: (-dy / length) * normalDirection,
      y: (dx / length) * normalDirection,
    };

    return {
      start: {
        x: point.x + normal.x * inset,
        y: point.y + normal.y * inset,
      },
      end: {
        x: next.x + normal.x * inset,
        y: next.y + normal.y * inset,
      },
    };
  });

  return points.map((point, index) => {
    const previousLine = edgeLines[(index - 1 + edgeLines.length) % edgeLines.length];
    const currentLine = edgeLines[index];
    return getLineIntersection(previousLine.start, previousLine.end, currentLine.start, currentLine.end)
      || currentLine.start
      || point;
  });
}

function getPolygonSignedArea(points) {
  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return area / 2;
}

function getLineIntersection(a1, a2, b1, b2) {
  const r = { x: a2.x - a1.x, y: a2.y - a1.y };
  const s = { x: b2.x - b1.x, y: b2.y - b1.y };
  const denominator = r.x * s.y - r.y * s.x;

  if (Math.abs(denominator) < 0.000001) return null;

  const qp = { x: b1.x - a1.x, y: b1.y - a1.y };
  const t = (qp.x * s.y - qp.y * s.x) / denominator;

  return {
    x: a1.x + t * r.x,
    y: a1.y + t * r.y,
  };
}

function transformPoint(matrix, point) {
  return {
    x: matrix.a * point.x + matrix.c * point.y + matrix.e,
    y: matrix.b * point.x + matrix.d * point.y + matrix.f,
  };
}

function inverseTransformPoint(matrix, point) {
  const determinant = matrix.a * matrix.d - matrix.b * matrix.c;
  if (Math.abs(determinant) < 0.000001) return null;

  const x = point.x - matrix.e;
  const y = point.y - matrix.f;

  return {
    x: (matrix.d * x - matrix.c * y) / determinant,
    y: (-matrix.b * x + matrix.a * y) / determinant,
  };
}

function getPath(data) {
  if (typeof Path2D === 'undefined') return null;
  if (!pathCache.has(data)) {
    pathCache.set(data, new Path2D(data));
  }
  return pathCache.get(data);
}

function paintPath(ctx, path, command, shapeScale) {
  if (command.fill) {
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill(path, command.fillRule === 'evenodd' ? 'evenodd' : 'nonzero');
  }

  if (command.stroke) {
    applyStroke(ctx, command, shapeScale);
    ctx.stroke(path);
  }
}

function paintCurrentPath(ctx, command, shapeScale) {
  if (command.fill) {
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill(command.fillRule === 'evenodd' ? 'evenodd' : 'nonzero');
  }

  if (command.stroke) {
    applyStroke(ctx, command, shapeScale);
    ctx.stroke();
  }
}

function applyStroke(ctx, command, shapeScale) {
  if (command.fixedStroke === false) {
    applyScaledStroke(ctx, command);
    return;
  }

  applyFixedStroke(ctx, command, shapeScale);
}

function applyScaledStroke(ctx, command) {
  ctx.strokeStyle = applyOpacity(command.stroke, command.strokeOpacity);
  ctx.lineWidth = command.strokeWidth || 1;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;

  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash);
  }
}

function applyFixedStroke(ctx, command, shapeScale) {
  const { maxScale } = getCurrentCanvasScale(ctx);
  const strokeWidth = command.strokeWidth || 1;
  const localLineWidth = (strokeWidth * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001);

  ctx.strokeStyle = applyOpacity(command.stroke, command.strokeOpacity);
  ctx.lineWidth = localLineWidth;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;

  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash.map((value) => (
      (value * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001)
    )));
  }
}

function drawEdgeAlignedRectStroke(ctx, command, shapeScale) {
  if (Array.isArray(command.dash) && command.dash.length) {
    drawDashedEdgeAlignedRectStroke(ctx, command, shapeScale);
    return;
  }

  const { scaleX, scaleY } = getCurrentCanvasScale(ctx);
  const originalStrokeWidth = command.strokeWidth || 1;
  const targetStrokeWidth = originalStrokeWidth * shapeScale.strokeMaxScale;

  // SVG rect strokes are centered on the rect edge. If the original SVG used
  // x=stroke/2 and width=outerWidth-stroke, its outside edge is the real visual
  // boundary. Reconstruct that outer boundary, then fill the stroke band so
  // non-uniform shape scaling cannot make vertical and horizontal edges differ.
  const originalInset = originalStrokeWidth / 2;
  const outerX = (command.x || 0) - originalInset;
  const outerY = (command.y || 0) - originalInset;
  const outerWidth = Math.max((command.width || 0) + originalStrokeWidth, 0);
  const outerHeight = Math.max((command.height || 0) + originalStrokeWidth, 0);
  const outerRx = command.rx == null
    ? 0
    : Math.max(command.rx + originalInset, 0);
  const ryBase = command.ry == null ? command.rx : command.ry;
  const outerRy = ryBase == null
    ? outerRx
    : Math.max(ryBase + originalInset, 0);

  const insetX = targetStrokeWidth / Math.max(scaleX, 0.0001);
  const insetY = targetStrokeWidth / Math.max(scaleY, 0.0001);
  const innerX = outerX + insetX;
  const innerY = outerY + insetY;
  const innerWidth = Math.max(outerWidth - insetX * 2, 0);
  const innerHeight = Math.max(outerHeight - insetY * 2, 0);
  const innerRx = Math.max(outerRx - insetX, 0);
  const innerRy = Math.max(outerRy - insetY, 0);

  ctx.beginPath();
  roundedRect(
    ctx,
    outerX,
    outerY,
    outerWidth,
    outerHeight,
    outerRx,
    outerRy
  );

  if (innerWidth > 0 && innerHeight > 0) {
    roundedRect(
      ctx,
      innerX,
      innerY,
      innerWidth,
      innerHeight,
      innerRx,
      innerRy
    );
  }

  ctx.fillStyle = applyOpacity(command.stroke, command.strokeOpacity);
  ctx.fill('evenodd');
}

function drawDashedEdgeAlignedRectStroke(ctx, command, shapeScale) {
  const { maxScale } = getCurrentCanvasScale(ctx);
  const originalStrokeWidth = command.strokeWidth || 1;
  const localLineWidth = (originalStrokeWidth * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001);
  const originalInset = originalStrokeWidth / 2;
  const outerX = (command.x || 0) - originalInset;
  const outerY = (command.y || 0) - originalInset;
  const outerWidth = Math.max((command.width || 0) + originalStrokeWidth, 0);
  const outerHeight = Math.max((command.height || 0) + originalStrokeWidth, 0);
  const dynamicInset = localLineWidth / 2;
  const rx = command.rx == null
    ? 0
    : Math.max(command.rx + originalInset - dynamicInset, 0);
  const ryBase = command.ry == null ? command.rx : command.ry;
  const ry = ryBase == null
    ? rx
    : Math.max(ryBase + originalInset - dynamicInset, 0);

  ctx.beginPath();
  roundedRect(
    ctx,
    outerX + dynamicInset,
    outerY + dynamicInset,
    Math.max(outerWidth - localLineWidth, 0),
    Math.max(outerHeight - localLineWidth, 0),
    rx,
    ry
  );

  ctx.strokeStyle = applyOpacity(command.stroke, command.strokeOpacity);
  ctx.lineWidth = localLineWidth;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;
  ctx.setLineDash(command.dash.map((value) => (
    (value * shapeScale.strokeMaxScale) / Math.max(maxScale, 0.0001)
  )));
  ctx.stroke();
}

function getShapeScale(shape, viewBox, canvasPixelScale) {
  const strokeWidthRatio = getFixedStrokeWidthRatio(shape);

  return {
    scaleX: strokeWidthRatio,
    scaleY: strokeWidthRatio,
    maxScale: strokeWidthRatio,
    strokeScaleX: strokeWidthRatio * canvasPixelScale.scaleX,
    strokeScaleY: strokeWidthRatio * canvasPixelScale.scaleY,
    strokeMaxScale: strokeWidthRatio * canvasPixelScale.maxScale,
  };
}

function getCanvasPixelScale(ctx, shape) {
  const currentScale = getCurrentCanvasScale(ctx);
  const absoluteScale = shape && typeof shape.getAbsoluteScale === 'function'
    ? shape.getAbsoluteScale()
    : {
      x: shape && typeof shape.scaleX === 'function' ? shape.scaleX() : 1,
      y: shape && typeof shape.scaleY === 'function' ? shape.scaleY() : 1,
    };
  const scaleX = currentScale.scaleX / Math.max(Math.abs(absoluteScale.x || 1), 0.0001);
  const scaleY = currentScale.scaleY / Math.max(Math.abs(absoluteScale.y || 1), 0.0001);

  return {
    scaleX,
    scaleY,
    maxScale: Math.max(scaleX, scaleY, 0.0001),
  };
}

function getCurrentCanvasScale(ctx) {
  if (!ctx || typeof ctx.getTransform !== 'function') {
    return { scaleX: 1, scaleY: 1, maxScale: 1 };
  }

  const matrix = ctx.getTransform();
  const scaleX = Math.hypot(matrix.a, matrix.b) || 1;
  const scaleY = Math.hypot(matrix.c, matrix.d) || 1;

  return {
    scaleX,
    scaleY,
    maxScale: Math.max(scaleX, scaleY, 0.0001),
  };
}

function createPrimitivePath(ctx, command) {
  ctx.beginPath();

  if (command.type === 'rect') {
    roundedRect(
      ctx,
      command.x || 0,
      command.y || 0,
      command.width || 0,
      command.height || 0,
      command.rx || 0,
      command.ry || command.rx || 0
    );
    return;
  }

  if (command.type === 'circle') {
    ctx.arc(command.cx || 0, command.cy || 0, command.r || 0, 0, Math.PI * 2);
    ctx.closePath();
    return;
  }

  if (command.type === 'ellipse') {
    ctx.ellipse(command.cx || 0, command.cy || 0, command.rx || 0, command.ry || 0, 0, 0, Math.PI * 2);
    ctx.closePath();
    return;
  }

  if (command.type === 'line') {
    ctx.moveTo(command.x1 || 0, command.y1 || 0);
    ctx.lineTo(command.x2 || 0, command.y2 || 0);
    return;
  }

  if (command.type === 'polyline' || command.type === 'polygon') {
    const points = command.points || [];
    if (!points.length) return;
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    if (command.type === 'polygon') ctx.closePath();
  }
}

function roundedRect(ctx, x, y, width, height, rx = 0, ry = rx) {
  const safeWidth = Math.max(width, 0);
  const safeHeight = Math.max(height, 0);
  const rX = Math.min(Math.max(rx || 0, 0), safeWidth / 2);
  const rY = Math.min(Math.max(ry || rX, 0), safeHeight / 2);

  if (!rX && !rY) {
    ctx.rect(x, y, safeWidth, safeHeight);
    return;
  }

  ctx.moveTo(x + rX, y);
  ctx.lineTo(x + safeWidth - rX, y);
  ctx.quadraticCurveTo(x + safeWidth, y, x + safeWidth, y + rY);
  ctx.lineTo(x + safeWidth, y + safeHeight - rY);
  ctx.quadraticCurveTo(x + safeWidth, y + safeHeight, x + safeWidth - rX, y + safeHeight);
  ctx.lineTo(x + rX, y + safeHeight);
  ctx.quadraticCurveTo(x, y + safeHeight, x, y + safeHeight - rY);
  ctx.lineTo(x, y + rY);
  ctx.quadraticCurveTo(x, y, x + rX, y);
  ctx.closePath();
}

function applyOpacity(color, opacity = 1) {
  if (opacity == null || opacity === 1) return color;
  if (!color) return color;
  if (color === 'black') return `rgba(0, 0, 0, ${opacity})`;
  if (color === 'white') return `rgba(255, 255, 255, ${opacity})`;
  if (color.startsWith('#')) return hexToRgba(color, opacity);
  if (color.startsWith('rgb')) return color;
  return color;
}

function hexToRgba(hex, opacity) {
  const normalized = hex.replace('#', '');
  const full = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized;

  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function getNativeContext(context) {
  return context._context || context;
}
