// Auto-generated from stocker.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const STOCKER_BASE_WIDTH = 60.0;
export const STOCKER_BASE_HEIGHT = 30.0;
export const STOCKER_SHAPE_TYPE = "stocker";

const VIEW_BOX = {
  "x": 0.0,
  "y": 0.0,
  "width": 60.0,
  "height": 30.0
};

const DRAW_COMMANDS = [
  {
    "opacity": 1.0,
    "fill": "white",
    "type": "rect",
    "x": 0,
    "y": 0,
    "width": 60.0,
    "height": 30.0,
    "rx": 7.0
  },
  {
    "opacity": 1.0,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 2.0,
    "type": "rect",
    "x": 1.0,
    "y": 1.0,
    "width": 58.0,
    "height": 28.0,
    "rx": 6.0
  }
];

export function createStockerShape({
  id,
  x = 0,
  y = 0,
  width = STOCKER_BASE_WIDTH,
  height = STOCKER_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgShape({
    id,
    shapeType: STOCKER_SHAPE_TYPE,
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

export function createStockerShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createStockerShape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updateStockerShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializeStockerShape(shape) {
  return serializeSvgShape(shape);
}

export function restoreStockerShape(item) {
  return createStockerShape({
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
