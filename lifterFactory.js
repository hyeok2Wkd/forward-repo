// Auto-generated from lifter.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const LIFTER_BASE_WIDTH = 30.0;
export const LIFTER_BASE_HEIGHT = 24.0;
export const LIFTER_SHAPE_TYPE = "lifter";

const VIEW_BOX = {
  "x": 0.0,
  "y": 0.0,
  "width": 30.0,
  "height": 24.0
};

const DRAW_COMMANDS = [
  {
    "opacity": 1.0,
    "fill": "black",
    "fillOpacity": 0.5,
    "type": "path",
    "data": "M0 0H30V5.33333V24H23.2258V22.9565H29.0323V1.04348H0.967742V22.9565H6.77419V24H0V0Z"
  },
  {
    "opacity": 1.0,
    "fill": "white",
    "type": "rect",
    "x": 3.0,
    "y": 3.0,
    "width": 24.0,
    "height": 18.0
  },
  {
    "opacity": 1.0,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "type": "rect",
    "x": 3.5,
    "y": 3.5,
    "width": 23.0,
    "height": 17.0
  },
  {
    "opacity": 1.0,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 0.5,
    "type": "path",
    "data": "M4 20L26 4M26 20L4 4"
  }
];

export function createLifterShape({
  id,
  x = 0,
  y = 0,
  width = LIFTER_BASE_WIDTH,
  height = LIFTER_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgShape({
    id,
    shapeType: LIFTER_SHAPE_TYPE,
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

export function createLifterShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createLifterShape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updateLifterShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializeLifterShape(shape) {
  return serializeSvgShape(shape);
}

export function restoreLifterShape(item) {
  return createLifterShape({
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
