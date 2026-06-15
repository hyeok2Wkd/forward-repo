// Auto-generated from crane.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const CRANE_BASE_WIDTH = 30.0;
export const CRANE_BASE_HEIGHT = 31.0;
export const CRANE_SHAPE_TYPE = "crane";

const VIEW_BOX = {
  "x": 0.0,
  "y": 0.0,
  "width": 30.0,
  "height": 31.0
};

const DRAW_COMMANDS = [
  {
    "opacity": 1.0,
    "fill": "white",
    "type": "rect",
    "x": 0,
    "y": 11.0,
    "width": 30.0,
    "height": 20.0,
    "rx": 5.0
  },
  {
    "opacity": 1.0,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "type": "rect",
    "x": 0.5,
    "y": 11.5,
    "width": 29.0,
    "height": 19.0,
    "rx": 4.5
  },
  {
    "opacity": 1.0,
    "fill": "black",
    "fillOpacity": 0.5,
    "type": "path",
    "data": "M11 1C11 0.447715 10.5523 0 10 0C9.44772 0 9 0.447715 9 1H10H11ZM21 1C21 0.447715 20.5523 0 20 0C19.4477 0 19 0.447715 19 1H20H21ZM10 1H9V20H10H11V1H10ZM20 1H19V20H20H21V1H20Z"
  },
  {
    "opacity": 1.0,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 3.0,
    "lineCap": "round",
    "type": "path",
    "data": "M24 20.9852L6 20.9852"
  }
];

export function createCraneShape({
  id,
  x = 0,
  y = 0,
  width = CRANE_BASE_WIDTH,
  height = CRANE_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgShape({
    id,
    shapeType: CRANE_SHAPE_TYPE,
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

export function createCraneShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createCraneShape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updateCraneShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializeCraneShape(shape) {
  return serializeSvgShape(shape);
}

export function restoreCraneShape(item) {
  return createCraneShape({
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
