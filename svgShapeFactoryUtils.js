// Shared helper for SVG-like Konva.Shape factories.
//
// Design goals for this version:
// 1. Each SVG is rendered as a single Konva.Shape, not a Konva.Group.
// 2. No Konva node `name` is assigned.
// 3. No drag/transform coordinate correction helpers are included.
//    Keep Konva's x/y/width/height/scaleX/scaleY/rotation exactly as they are.
// 4. Stroke width is drawn in screen-stable pixels by using the current canvas transform.
// 5. Rect strokes are edge-aligned so their outside edge stays on the SVG boundary.

import Konva from 'konva';

const pathCache = new Map();

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
  };
}

function drawSvgLikeScene(context, shape, commands, viewBox) {
  const ctx = getNativeContext(context);

  const width = Math.max(shape.width(), 1);
  const height = Math.max(shape.height(), 1);
  const scaleX = width / Math.max(viewBox.width, 1);
  const scaleY = height / Math.max(viewBox.height, 1);

  ctx.save();

  // Convert SVG viewBox coordinates into this Shape's local width/height.
  ctx.scale(scaleX, scaleY);
  ctx.translate(-viewBox.x, -viewBox.y);

  // Clip to the original SVG viewBox. This approximates mask/clipPath usage.
  ctx.beginPath();
  ctx.rect(viewBox.x, viewBox.y, viewBox.width, viewBox.height);
  ctx.clip();

  for (const command of commands) {
    drawCommand(ctx, command);
  }

  ctx.restore();
}

function drawCommand(ctx, command) {
  ctx.save();
  ctx.globalAlpha = command.opacity == null ? 1 : command.opacity;
  ctx.setLineDash([]);

  if (command.type === 'path') {
    const path = getPath(command.data);
    if (path) paintPath(ctx, path, command);
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
      drawEdgeAlignedRectStroke(ctx, command);
    }

    ctx.restore();
    return;
  }

  createPrimitivePath(ctx, command);
  paintCurrentPath(ctx, command);
  ctx.restore();
}

function getPath(data) {
  if (typeof Path2D === 'undefined') return null;
  if (!pathCache.has(data)) {
    pathCache.set(data, new Path2D(data));
  }
  return pathCache.get(data);
}

function paintPath(ctx, path, command) {
  if (command.fill) {
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill(path, command.fillRule === 'evenodd' ? 'evenodd' : 'nonzero');
  }

  if (command.stroke) {
    applyFixedStroke(ctx, command);
    ctx.stroke(path);
  }
}

function paintCurrentPath(ctx, command) {
  if (command.fill) {
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill(command.fillRule === 'evenodd' ? 'evenodd' : 'nonzero');
  }

  if (command.stroke) {
    applyFixedStroke(ctx, command);
    ctx.stroke();
  }
}

function applyFixedStroke(ctx, command) {
  const { maxScale } = getCurrentCanvasScale(ctx);
  const strokeWidth = command.strokeWidth || 1;
  const localLineWidth = strokeWidth / maxScale;

  ctx.strokeStyle = applyOpacity(command.stroke, command.strokeOpacity);
  ctx.lineWidth = localLineWidth;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;

  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash.map((value) => value / maxScale));
  }
}

function drawEdgeAlignedRectStroke(ctx, command) {
  const { maxScale } = getCurrentCanvasScale(ctx);
  const originalStrokeWidth = command.strokeWidth || 1;
  const localLineWidth = originalStrokeWidth / maxScale;

  // SVG rect strokes are centered on the rect edge. If the original SVG used
  // x=stroke/2 and width=outerWidth-stroke, its outside edge is the real visual
  // boundary. Reconstruct that outer boundary, then place a fixed-width stroke
  // inside it so the outside edge stays aligned with the SVG boundary.
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

  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash.map((value) => value / maxScale));
  }

  ctx.stroke();
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
    maxScale: Math.max(scaleX, scaleY, 1),
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
