// Custom conveyor factory.
// - Single Konva.Shape
// - No Konva `name`
// - Internal slat rectangles keep a fixed visual size
// - Slat count changes consistently based on available width
// - No shadow/effect logic

import Konva from 'konva';

export const CONVEYOR_BASE_WIDTH = 60.0;
export const CONVEYOR_BASE_HEIGHT = 30.0;
export const CONVEYOR_SHAPE_TYPE = 'conveyor';

export function createConveyorShape({
  id,
  x = 0,
  y = 0,
  width = CONVEYOR_BASE_WIDTH,
  height = CONVEYOR_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  const shape = new Konva.Shape({
    id,
    x,
    y,
    width: Math.max(width, 1),
    height: Math.max(height, 1),
    scaleX,
    scaleY,
    rotation,
    draggable,
    shapeType: CONVEYOR_SHAPE_TYPE,
    equipmentType: CONVEYOR_SHAPE_TYPE,
    fill: 'black',
    sceneFunc(context, shape) {
      drawConveyor(context, shape);
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

export function serializeConveyorShape(shape) {
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

export function restoreConveyorShape(item) {
  return createConveyorShape({
    id: item.id,
    x: item.x,
    y: item.y,
    width: item.width,
    height: item.height,
    scaleX: item.scaleX,
    scaleY: item.scaleY,
    rotation: item.rotation,
    draggable: item.draggable,
  });
}

function drawConveyor(context, shape) {
  const ctx = getNativeContext(context);
  const width = Math.max(shape.width(), 1);
  const height = Math.max(shape.height(), 1);

  const { scaleX, scaleY } = getCurrentCanvasScale(ctx);

  // Fixed visual sizes in screen pixels.
  const slatVisualWidth = 4;
  const slatVisualGap = 2;
  const slatVisualHeight = 24;
  const fillOpacity = 0.5;
  const slatColor = applyOpacity('#D1D1D6', fillOpacity);

  const localSlatWidth = slatVisualWidth / scaleX;
  const localGap = slatVisualGap / scaleX;
  const localSlatHeight = Math.min(slatVisualHeight / scaleY, height);
  const startY = Math.max((height - localSlatHeight) / 2, 0);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.clip();

  // Background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  // Repeating fixed-size slats.
  ctx.fillStyle = slatColor;
  let x = 0;
  while (x + localSlatWidth <= width + 0.0001) {
    ctx.fillRect(x, startY, localSlatWidth, localSlatHeight);
    x += localSlatWidth + localGap;
  }

  ctx.restore();
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

function getNativeContext(context) {
  return context._context || context;
}
