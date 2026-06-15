// Auto-generated from vehicle2.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const VEHICLE2_BASE_WIDTH = 30.0;
export const VEHICLE2_BASE_HEIGHT = 30.0;
export const VEHICLE2_SHAPE_TYPE = 'vehicle2';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 30.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 0,
    "y": 0,
    "width": 4.0,
    "height": 30.0,
    "rx": 2.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "x": 0.5,
    "y": 0.5,
    "width": 3.0,
    "height": 29.0,
    "rx": 1.5
  },
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 3.0,
    "y": 0,
    "width": 24.0,
    "height": 30.0,
    "rx": 5.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "x": 3.5,
    "y": 0.5,
    "width": 23.0,
    "height": 29.0,
    "rx": 4.5
  },
  {
    "type": "path",
    "opacity": 0.7,
    "fill": "white",
    "data": "M7.5 1H22C24.2092 1 26 2.79086 26 5V25.5L16.5 13L7.5 1Z"
  },
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 26.0,
    "y": 0,
    "width": 4.0,
    "height": 30.0,
    "rx": 2.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "x": 26.5,
    "y": 0.5,
    "width": 3.0,
    "height": 29.0,
    "rx": 1.5
  }
];

export function createVehicle2Shape({
  id,
  x = 0,
  y = 0,
  width = VEHICLE2_BASE_WIDTH,
  height = VEHICLE2_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: VEHICLE2_SHAPE_TYPE,
    baseWidth: VEHICLE2_BASE_WIDTH,
    baseHeight: VEHICLE2_BASE_HEIGHT,
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

export function serializeVehicle2Shape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreVehicle2Shape(item) {
  return createVehicle2Shape({
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
