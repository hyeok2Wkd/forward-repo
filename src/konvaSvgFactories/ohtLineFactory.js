// Auto-generated from oht-line.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const OHT_LINE_BASE_WIDTH = 60.0;
export const OHT_LINE_BASE_HEIGHT = 30.0;
export const OHT_LINE_SHAPE_TYPE = 'oht-line';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 60.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "fixedLine",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 8,
    "x1": 0,
    "y1": 9,
    "x2": 60,
    "y2": 9
  },
  {
    "type": "fixedLine",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 8,
    "x1": 0,
    "y1": 21,
    "x2": 60,
    "y2": 21
  }
];

export function createOhtLineShape({
  id,
  x = 0,
  y = 0,
  width = OHT_LINE_BASE_WIDTH,
  height = OHT_LINE_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: OHT_LINE_SHAPE_TYPE,
    baseWidth: OHT_LINE_BASE_WIDTH,
    baseHeight: OHT_LINE_BASE_HEIGHT,
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

export function serializeOhtLineShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreOhtLineShape(item) {
  return createOhtLineShape({
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
