// Auto-generated from vehicle3.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const VEHICLE3_BASE_WIDTH = 30.0;
export const VEHICLE3_BASE_HEIGHT = 30.0;
export const VEHICLE3_SHAPE_TYPE = 'vehicle3';
export const VEHICLE3_STROKE_WIDTH_RATIO = 2;

const VIEW_BOX = { x: 0.0, y: 0.0, width: 30.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "fixedLine",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 2.0,
    "lineCap": "round",
    "x1": 1.5,
    "y1": 12,
    "x2": 1.5,
    "y2": 17.5,
    "innerEdgeX": 2,
    "innerEdgeSide": "right"
  },
  {
    "type": "fixedLine",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 2.0,
    "lineCap": "round",
    "x1": 28.5,
    "y1": 12,
    "x2": 28.5,
    "y2": 17.5,
    "innerEdgeX": 28,
    "innerEdgeSide": "left"
  },
  {
    "type": "path",
    "opacity": 1,
    "fill": "white",
    "data": "M2 5C2 2.23858 4.23858 0 7 0H23C25.7614 0 28 2.23858 28 5V25C28 27.7614 25.7614 30 23 30H7C4.23858 30 2 27.7614 2 25V5Z"
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1.5,
    "x": 2.75,
    "y": 0.75,
    "width": 24.5,
    "height": 28.5,
    "rx": 4.25
  },
  {
    "type": "path",
    "opacity": 0.7,
    "fill": "white",
    "data": "M6.5 1H23C25.2091 1 27 2.79086 27 5V25.5L16.5 13L6.5 1Z"
  }
];

export function createVehicle3Shape({
  id,
  x = 0,
  y = 0,
  width = VEHICLE3_BASE_WIDTH,
  height = VEHICLE3_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
  strokeWidthRatio = VEHICLE3_STROKE_WIDTH_RATIO,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: VEHICLE3_SHAPE_TYPE,
    baseWidth: VEHICLE3_BASE_WIDTH,
    baseHeight: VEHICLE3_BASE_HEIGHT,
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

export function serializeVehicle3Shape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreVehicle3Shape(item) {
  return createVehicle3Shape({
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
