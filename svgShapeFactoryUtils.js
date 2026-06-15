// Auto-generated helper for SVG-like Konva.Shape factories.
// Copy this file together with the generated *Factory.js files.
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
  name = `${shapeType}-shape`,
} = {}) {
  const shape = new Konva.Shape({
    id,
    name,
    x,
    y,
    width: Math.max(width || baseWidth, 1),
    height: Math.max(height || baseHeight, 1),
    scaleX,
    scaleY,
    rotation,
    draggable,

    // Keep existing app logic simple: this is a single node, not a Group.
    shapeType,
    equipmentType: shapeType,

    // Used only by hitFunc so the whole bounding box is selectable.
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

export function updateSvgLikeShapeByDrag(shape, start, current) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.abs(current.x - start.x);
  const height = Math.abs(current.y - start.y);

  shape.position({ x, y });
  shape.width(Math.max(width, 1));
  shape.height(Math.max(height, 1));
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

  const sx = width / viewBox.width;
  const sy = height / viewBox.height;

  const absScale = shape.getAbsoluteScale ? shape.getAbsoluteScale() : { x: 1, y: 1 };
  const effectiveScaleX = Math.abs(sx * (absScale.x || 1)) || 1;
  const effectiveScaleY = Math.abs(sy * (absScale.y || 1)) || 1;
  const effectiveMaxScale = Math.max(effectiveScaleX, effectiveScaleY, 1);

  ctx.save();
  ctx.scale(sx, sy);
  ctx.translate(-viewBox.x, -viewBox.y);

  // Approximate SVG clipPath/mask behavior by clipping to the original viewBox.
  ctx.beginPath();
  ctx.rect(viewBox.x, viewBox.y, viewBox.width, viewBox.height);
  ctx.clip();

  for (const command of commands) {
    drawCommand(ctx, command, effectiveMaxScale);
  }

  ctx.restore();
}

function drawCommand(ctx, command, effectiveMaxScale) {
  ctx.save();
  ctx.globalAlpha = command.opacity == null ? 1 : command.opacity;
  ctx.setLineDash([]);

  if (command.type === 'path') {
    const path = getPath(command.data);
    if (!path) {
      ctx.restore();
      return;
    }
    paintPath(ctx, path, command, effectiveMaxScale);
  } else {
    createPrimitivePath(ctx, command);
    paintCurrentPath(ctx, command, effectiveMaxScale);
  }

  ctx.restore();
}

function getPath(data) {
  if (typeof Path2D === 'undefined') return null;
  if (!pathCache.has(data)) {
    pathCache.set(data, new Path2D(data));
  }
  return pathCache.get(data);
}

function paintPath(ctx, path, command, effectiveMaxScale) {
  if (command.fill) {
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill(path, command.fillRule === 'evenodd' ? 'evenodd' : 'nonzero');
  }

  if (command.stroke) {
    applyStroke(ctx, command, effectiveMaxScale);
    ctx.stroke(path);
  }
}

function paintCurrentPath(ctx, command, effectiveMaxScale) {
  if (command.fill) {
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill(command.fillRule === 'evenodd' ? 'evenodd' : 'nonzero');
  }

  if (command.stroke) {
    applyStroke(ctx, command, effectiveMaxScale);
    ctx.stroke();
  }
}

function applyStroke(ctx, command, effectiveMaxScale) {
  ctx.strokeStyle = applyOpacity(command.stroke, command.strokeOpacity);
  ctx.lineWidth = (command.strokeWidth || 1) / effectiveMaxScale;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';

  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash.map((value) => value / effectiveMaxScale));
  }
}

function createPrimitivePath(ctx, command) {
  ctx.beginPath();

  if (command.type === 'rect') {
    roundedRect(ctx, command.x || 0, command.y || 0, command.width || 0, command.height || 0, command.rx || 0, command.ry || command.rx || 0);
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
  const rX = Math.min(rx || 0, Math.abs(width) / 2);
  const rY = Math.min(ry || rX, Math.abs(height) / 2);

  if (!rX && !rY) {
    ctx.rect(x, y, width, height);
    return;
  }

  ctx.moveTo(x + rX, y);
  ctx.lineTo(x + width - rX, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + rY);
  ctx.lineTo(x + width, y + height - rY);
  ctx.quadraticCurveTo(x + width, y + height, x + width - rX, y + height);
  ctx.lineTo(x + rX, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - rY);
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
