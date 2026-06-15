// Auto-generated from vehicle1.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const VEHICLE1_BASE_WIDTH = 30.0;
export const VEHICLE1_BASE_HEIGHT = 30.0;
export const VEHICLE1_SHAPE_TYPE = "vehicle1";

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
    "height": 30.0,
    "rx": 5.0
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
    "height": 29.0,
    "rx": 4.5
  },
  {
    "opacity": 0.7,
    "fill": "white",
    "type": "path",
    "data": "M4.5 1H25C27.2092 1 29 2.79086 29 5V25.5L16.5 13.5L4.5 1Z"
  },
  {
    "opacity": 0.4,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 4.0,
    "lineCap": "round",
    "type": "path",
    "data": "M15 9V21"
  },
  {
    "opacity": 0.4,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "type": "path",
    "data": "M12.5 10V13M17.5 10V13M17.5 17V20M12.5 17V20"
  }
];

export function createVehicle1Shape({
  id,
  x = 0,
  y = 0,
  width = VEHICLE1_BASE_WIDTH,
  height = VEHICLE1_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgShape({
    id,
    shapeType: VEHICLE1_SHAPE_TYPE,
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

export function createVehicle1ShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createVehicle1Shape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updateVehicle1ShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializeVehicle1Shape(shape) {
  return serializeSvgShape(shape);
}

export function restoreVehicle1Shape(item) {
  return createVehicle1Shape({
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
