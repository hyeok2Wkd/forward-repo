// Auto-generated from OHS line.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const OHS_LINE_BASE_WIDTH = 60.0;
export const OHS_LINE_BASE_HEIGHT = 30.0;
export const OHS_LINE_SHAPE_TYPE = "ohsLine";

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
    "fillOpacity": 0.5,
    "type": "path",
    "data": "M0 0H60V30H0V0Z"
  },
  {
    "opacity": 1.0,
    "fill": "black",
    "fillOpacity": 0.5,
    "type": "path",
    "data": "M0 0V3H60V0V-3H0V0ZM60 30V27H0V30V33H60V30Z"
  }
];

export function createOhsLineShape({
  id,
  x = 0,
  y = 0,
  width = OHS_LINE_BASE_WIDTH,
  height = OHS_LINE_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgShape({
    id,
    shapeType: OHS_LINE_SHAPE_TYPE,
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

export function createOhsLineShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createOhsLineShape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updateOhsLineShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializeOhsLineShape(shape) {
  return serializeSvgShape(shape);
}

export function restoreOhsLineShape(item) {
  return createOhsLineShape({
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
