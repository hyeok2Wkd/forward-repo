// Auto-generated from lifter.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const LIFTER_BASE_WIDTH = 30.0;
export const LIFTER_BASE_HEIGHT = 24.0;
export const LIFTER_SHAPE_TYPE = 'lifter';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 30.0, height: 24.0 };

const DRAW_COMMANDS = [
  {
    "type": "path",
    "opacity": 1,
    "fill": "black",
    "fillOpacity": 0.5,
    "data": "M0 0H30V5.33333V24H23.2258V22.9565H29.0323V1.04348H0.967742V22.9565H6.77419V24H0V0Z"
  },
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 3.0,
    "y": 3.0,
    "width": 24.0,
    "height": 18.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "x": 3.5,
    "y": 3.5,
    "width": 23.0,
    "height": 17.0
  },
  {
    "type": "path",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 0.5,
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
  return createSvgLikeShape({
    id,
    shapeType: LIFTER_SHAPE_TYPE,
    baseWidth: LIFTER_BASE_WIDTH,
    baseHeight: LIFTER_BASE_HEIGHT,
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

export function serializeLifterShape(shape) {
  return serializeSvgLikeShape(shape);
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
