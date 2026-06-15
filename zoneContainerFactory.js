// Auto-generated from zone-container.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const ZONE_CONTAINER_BASE_WIDTH = 56.0;
export const ZONE_CONTAINER_BASE_HEIGHT = 25.0;
export const ZONE_CONTAINER_SHAPE_TYPE = 'zone-container';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 56.0, height: 25.0 };

const DRAW_COMMANDS = [
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
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
  return createSvgLikeShape({
    id,
    shapeType: ZONE_CONTAINER_SHAPE_TYPE,
    baseWidth: ZONE_CONTAINER_BASE_WIDTH,
    baseHeight: ZONE_CONTAINER_BASE_HEIGHT,
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

export function serializeZoneContainerShape(shape) {
  return serializeSvgLikeShape(shape);
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
