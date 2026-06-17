// Auto-generated from vehicle1.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const VEHICLE1_BASE_WIDTH = 30.0;
export const VEHICLE1_BASE_HEIGHT = 30.0;
export const VEHICLE1_SHAPE_TYPE = 'vehicle1';
export const VEHICLE1_STROKE_WIDTH_RATIO = 2;

const VIEW_BOX = { x: 0.0, y: 0.0, width: 30.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 0,
    "y": 0,
    "width": 30.0,
    "height": 30.0,
    "rx": 5.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1.5,
    "x": 0.75,
    "y": 0.75,
    "width": 28.5,
    "height": 28.5,
    "rx": 4.25
  },
  {
    "type": "path",
    "opacity": 0.7,
    "fill": "white",
    "data": "M4.5 1H25C27.2092 1 29 2.79086 29 5V25.5L16.5 13.5L4.5 1Z"
  },
  {
    "type": "path",
    "opacity": 0.3,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 4.0,
    "lineCap": "round",
    "fixedStroke": false,
    "data": "M15 9V21"
  },
  {
    "type": "path",
    "opacity": 0.3,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1.0,
    "fixedStroke": false,
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
  strokeWidthRatio = VEHICLE1_STROKE_WIDTH_RATIO,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: VEHICLE1_SHAPE_TYPE,
    baseWidth: VEHICLE1_BASE_WIDTH,
    baseHeight: VEHICLE1_BASE_HEIGHT,
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
    strokeWidthRatio,
  });
}

export function serializeVehicle1Shape(shape) {
  return serializeSvgLikeShape(shape);
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
    strokeWidthRatio: item.strokeWidthRatio,
  });
}
