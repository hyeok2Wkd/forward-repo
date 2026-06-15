// Auto-generated from stocker.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const STOCKER_BASE_WIDTH = 60.0;
export const STOCKER_BASE_HEIGHT = 30.0;
export const STOCKER_SHAPE_TYPE = 'stocker';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 60.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 0,
    "y": 0,
    "width": 60.0,
    "height": 30.0,
    "rx": 7.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 2.0,
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
  return createSvgLikeShape({
    id,
    shapeType: STOCKER_SHAPE_TYPE,
    baseWidth: STOCKER_BASE_WIDTH,
    baseHeight: STOCKER_BASE_HEIGHT,
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

export function serializeStockerShape(shape) {
  return serializeSvgLikeShape(shape);
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
