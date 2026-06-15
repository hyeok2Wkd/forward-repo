// Auto-generated from port.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const PORT_BASE_WIDTH = 30.0;
export const PORT_BASE_HEIGHT = 30.0;
export const PORT_SHAPE_TYPE = "port";

const VIEW_BOX = {
  "x": 0.0,
  "y": 0.0,
  "width": 30.0,
  "height": 30.0
};

const DRAW_COMMANDS = [
  {
    "opacity": 1.0,
    "fill": "white",
    "type": "rect",
    "x": 0,
    "y": 0,
    "width": 30.0,
    "height": 30.0
  },
  {
    "opacity": 1.0,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "type": "rect",
    "x": 0.5,
    "y": 0.5,
    "width": 29.0,
    "height": 29.0
  },
  {
    "opacity": 0.3,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 0.5,
    "type": "path",
    "data": "M1 29L29 1M29 29L1 1"
  }
];

export function createPortShape({
  id,
  x = 0,
  y = 0,
  width = PORT_BASE_WIDTH,
  height = PORT_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgShape({
    id,
    shapeType: PORT_SHAPE_TYPE,
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

export function createPortShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createPortShape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updatePortShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializePortShape(shape) {
  return serializeSvgShape(shape);
}

export function restorePortShape(item) {
  return createPortShape({
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
