// Auto-generated from rail buffer.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It is intended to replace Konva.Image usage while keeping your existing
// "Group means label/equipment-name is attached" logic intact.
import { createSvgLikeShape, updateSvgLikeShapeByDrag, serializeSvgLikeShape } from './svgShapeFactoryUtils';

export const RAIL_BUFFER_BASE_WIDTH = 60.0;
export const RAIL_BUFFER_BASE_HEIGHT = 30.0;
export const RAIL_BUFFER_SHAPE_TYPE = 'rail-buffer';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 60.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "lineJoin": "bevel",
    "dash": [
      1.0,
      3.0
    ],
    "x": 0.5,
    "y": 0.5,
    "width": 59.0,
    "height": 29.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "stroke": "#4B5565",
    "strokeWidth": 1,
    "x": 4.5,
    "y": 4.5,
    "width": 51.0,
    "height": 21.0
  }
];

export function createRailBufferShape({
  id,
  x = 0,
  y = 0,
  width = RAIL_BUFFER_BASE_WIDTH,
  height = RAIL_BUFFER_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: RAIL_BUFFER_SHAPE_TYPE,
    name: 'rail-buffer-shape',
    baseWidth: RAIL_BUFFER_BASE_WIDTH,
    baseHeight: RAIL_BUFFER_BASE_HEIGHT,
    viewBox: VIEW_BOX,
    drawCommands: DRAW_COMMANDS,
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    rotation,
    draggable,
  });
}

export function createRailBufferShapeFromDrag({ id, start, current, draggable = true } = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createRailBufferShape({ id, x, y, width, height, draggable });
}

export function updateRailBufferShapeByDrag(shape, start, current) {
  updateSvgLikeShapeByDrag(shape, start, current);
}

export function serializeRailBufferShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreRailBufferShape(item) {
  return createRailBufferShape({
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
