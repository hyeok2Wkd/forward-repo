// Auto-generated from zone container.svg
// 단일 Konva.Shape로 SVG 모양만 표시하는 factory.

import {
  createSvgShape,
  updateSvgShapeByDrag,
  serializeSvgShape,
} from './svgShapeFactoryUtils';

export const ZONE_CONTAINER_BASE_WIDTH = 56.0;
export const ZONE_CONTAINER_BASE_HEIGHT = 25.0;
export const ZONE_CONTAINER_SHAPE_TYPE = "zoneContainer";

const VIEW_BOX = {
  "x": 0.0,
  "y": 0.0,
  "width": 56.0,
  "height": 25.0
};

const DRAW_COMMANDS = [
  {
    "opacity": 1.0,
    "fill": "white",
    "type": "rect",
    "x": 0,
    "y": 0,
    "width": 56.0,
    "height": 25.0
  }
];

export function createZoneContainerShape({
  id,
  x = 0,
  y = 0,
  width = ZONE_CONTAINER_BASE_WIDTH,
  height = ZONE_CONTAINER_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgShape({
    id,
    shapeType: ZONE_CONTAINER_SHAPE_TYPE,
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

export function createZoneContainerShapeFromDrag({
  id,
  start,
  current,
  draggable = true,
} = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createZoneContainerShape({
    id,
    x,
    y,
    width,
    height,
    draggable,
  });
}

export function updateZoneContainerShapeByDrag(shape, start, current) {
  updateSvgShapeByDrag(shape, start, current);
}

export function serializeZoneContainerShape(shape) {
  return serializeSvgShape(shape);
}

export function restoreZoneContainerShape(item) {
  return createZoneContainerShape({
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
