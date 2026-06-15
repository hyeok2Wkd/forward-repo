// svgShapeFactoryUtils.js
// 목적: SVG 태그를 단일 Konva.Shape의 sceneFunc에서 그대로 그리기 위한 단순 유틸.
// 이 버전은 stroke 고정, edge 보정, transform 보정 같은 추가 계산을 하지 않는다.
// Konva의 drag/transform 결과는 그대로 사용한다.

import Konva from 'konva';

export function createSvgShape({
  id,
  shapeType,
  viewBox,
  drawCommands,
  x = 0,
  y = 0,
  width,
  height,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  const baseWidth = viewBox.width;
  const baseHeight = viewBox.height;

  return new Konva.Shape({
    id,
    x,
    y,
    width: Math.max(width == null ? baseWidth : width, 1),
    height: Math.max(height == null ? baseHeight : height, 1),
    scaleX,
    scaleY,
    rotation,
    draggable,
    shapeType,

    sceneFunc(context, shape) {
      const ctx = getNativeContext(context);
      drawSvgCommands(ctx, shape, viewBox, drawCommands);
    },

    hitFunc(context, shape) {
      const ctx = getNativeContext(context);
      ctx.beginPath();
      ctx.rect(0, 0, shape.width(), shape.height());
      ctx.closePath();
      context.fillStrokeShape(shape);
    },
  });
}

export function serializeSvgShape(shape) {
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

export function updateSvgShapeByDrag(shape, start, current) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  shape.position({ x, y });
  shape.width(width);
  shape.height(height);
}

function drawSvgCommands(ctx, shape, viewBox, drawCommands) {
  const width = Math.max(shape.width(), 1);
  const height = Math.max(shape.height(), 1);
  const scaleX = width / viewBox.width;
  const scaleY = height / viewBox.height;

  ctx.save();
  ctx.scale(scaleX, scaleY);
  ctx.translate(-viewBox.x, -viewBox.y);

  // SVG viewBox와 비슷하게 밖으로 나가는 도형을 잘라낸다.
  ctx.beginPath();
  ctx.rect(viewBox.x, viewBox.y, viewBox.width, viewBox.height);
  ctx.clip();

  for (const command of drawCommands) {
    ctx.save();
    drawCommand(ctx, command);
    ctx.restore();
  }

  ctx.restore();
}

function drawCommand(ctx, command) {
  ctx.globalAlpha = command.opacity == null ? 1 : command.opacity;

  if (command.type === 'path') {
    const path = new Path2D(command.data);
    fillAndStrokePath(ctx, command, path);
    return;
  }

  if (command.type === 'rect') {
    ctx.beginPath();
    roundedRect(
      ctx,
      command.x || 0,
      command.y || 0,
      command.width || 0,
      command.height || 0,
      command.rx || 0,
      command.ry == null ? command.rx || 0 : command.ry
    );
    fillAndStrokeCurrentPath(ctx, command);
    return;
  }

  if (command.type === 'circle') {
    ctx.beginPath();
    ctx.arc(command.cx || 0, command.cy || 0, command.r || 0, 0, Math.PI * 2);
    fillAndStrokeCurrentPath(ctx, command);
    return;
  }

  if (command.type === 'ellipse') {
    ctx.beginPath();
    ctx.ellipse(command.cx || 0, command.cy || 0, command.rx || 0, command.ry || 0, 0, 0, Math.PI * 2);
    fillAndStrokeCurrentPath(ctx, command);
    return;
  }

  if (command.type === 'line') {
    ctx.beginPath();
    ctx.moveTo(command.x1 || 0, command.y1 || 0);
    ctx.lineTo(command.x2 || 0, command.y2 || 0);
    strokeCurrentPath(ctx, command);
    return;
  }

  if (command.type === 'polyline' || command.type === 'polygon') {
    const points = command.points || [];
    if (!points.length) return;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    if (command.type === 'polygon') ctx.closePath();
    fillAndStrokeCurrentPath(ctx, command);
  }
}

function fillAndStrokePath(ctx, command, path) {
  if (command.fill) {
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill(path);
  }
  if (command.stroke) {
    applyStroke(ctx, command);
    ctx.stroke(path);
  }
}

function fillAndStrokeCurrentPath(ctx, command) {
  if (command.fill) {
    ctx.fillStyle = applyOpacity(command.fill, command.fillOpacity);
    ctx.fill();
  }
  if (command.stroke) {
    applyStroke(ctx, command);
    ctx.stroke();
  }
}

function strokeCurrentPath(ctx, command) {
  if (!command.stroke) return;
  applyStroke(ctx, command);
  ctx.stroke();
}

function applyStroke(ctx, command) {
  ctx.strokeStyle = applyOpacity(command.stroke, command.strokeOpacity);
  ctx.lineWidth = command.strokeWidth == null ? 1 : command.strokeWidth;
  ctx.lineCap = command.lineCap || 'butt';
  ctx.lineJoin = command.lineJoin || 'miter';
  ctx.miterLimit = command.miterLimit || 10;
  if (Array.isArray(command.dash)) {
    ctx.setLineDash(command.dash);
  }
}

function roundedRect(ctx, x, y, width, height, rx = 0, ry = rx) {
  const safeWidth = Math.max(width, 0);
  const safeHeight = Math.max(height, 0);
  const rX = Math.min(Math.max(rx, 0), safeWidth / 2);
  const rY = Math.min(Math.max(ry, 0), safeHeight / 2);

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

function applyOpacity(color, opacity) {
  if (opacity == null || opacity === 1 || color == null) return color;

  if (color === 'black') return `rgba(0, 0, 0, ${opacity})`;
  if (color === 'white') return `rgba(255, 255, 255, ${opacity})`;
  if (color.startsWith('#')) return hexToRgba(color, opacity);
  if (color.startsWith('rgb')) return color;
  return color;
}

function hexToRgba(hex, opacity) {
  const normalized = hex.replace('#', '');
  const expanded = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized;

  const bigint = parseInt(expanded, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function getNativeContext(context) {
  return context._context || context;
}
