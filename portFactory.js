// Auto-generated from port.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const PORT_BASE_WIDTH = 30.0;
export const PORT_BASE_HEIGHT = 30.0;
export const PORT_SHAPE_TYPE = 'port';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 30.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 0,
    "y": 0,
    "width": 30.0,
    "height": 30.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "x": 0.5,
    "y": 0.5,
    "width": 29.0,
    "height": 29.0
  },
  {
    "type": "path",
    "opacity": 0.3,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 0.5,
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
  return createSvgLikeShape({
    id,
    shapeType: PORT_SHAPE_TYPE,
    baseWidth: PORT_BASE_WIDTH,
    baseHeight: PORT_BASE_HEIGHT,
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

export function serializePortShape(shape) {
  return serializeSvgLikeShape(shape);
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
