// Auto-generated from rail buffer.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const RAIL_BUFFER_BASE_WIDTH = 60.0;
export const RAIL_BUFFER_BASE_HEIGHT = 30.0;
export const RAIL_BUFFER_SHAPE_TYPE = "railBuffer";

const VIEW_BOX = {
  "x": 0.0,
  "y": 0.0,
  "width": 60.0,
  "height": 30.0
};

const DRAW_COMMANDS = [
  {
    "opacity": 1.0,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "lineJoin": "bevel",
    "dash": [
      1.0,
      3.0
    ],
    "type": "rect",
    "x": 0.5,
    "y": 0.5,
    "width": 59.0,
    "height": 29.0
  },
  {
    "opacity": 1.0,
    "fill": "white",
    "stroke": "#4B5565",
    "strokeWidth": 1,
    "type": "rect",
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
  return createSvgShape({
    id,
    shapeType: RAIL_BUFFER_SHAPE_TYPE,
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

export function createRailBufferShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createRailBufferShape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updateRailBufferShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializeRailBufferShape(shape) {
  return serializeSvgShape(shape);
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
