// Auto-generated from zone.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const ZONE_BASE_WIDTH = 64.0;
export const ZONE_BASE_HEIGHT = 34.0;
export const ZONE_SHAPE_TYPE = "zone";

const VIEW_BOX = {
  "x": 0.0,
  "y": 0.0,
  "width": 64.0,
  "height": 34.0
};

const DRAW_COMMANDS = [
  {
    "opacity": 1.0,
    "fill": "white",
    "type": "rect",
    "x": 0,
    "y": 0,
    "width": 60.0,
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
    "width": 59.0,
    "height": 29.0
  },
  {
    "opacity": 1.0,
    "fill": "white",
    "type": "rect",
    "x": 2.0,
    "y": 2.0,
    "width": 56.0,
    "height": 26.0
  },
  {
    "opacity": 1.0,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "type": "rect",
    "x": 2.5,
    "y": 2.5,
    "width": 55.0,
    "height": 25.0
  }
];

export function createZoneShape({
  id,
  x = 0,
  y = 0,
  width = ZONE_BASE_WIDTH,
  height = ZONE_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgShape({
    id,
    shapeType: ZONE_SHAPE_TYPE,
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

export function createZoneShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createZoneShape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updateZoneShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializeZoneShape(shape) {
  return serializeSvgShape(shape);
}

export function restoreZoneShape(item) {
  return createZoneShape({
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
