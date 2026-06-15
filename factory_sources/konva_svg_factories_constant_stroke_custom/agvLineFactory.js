// Auto-generated from agv-line.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.
// It does NOT include drag/transform correction logic.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const AGV_LINE_BASE_WIDTH = 60.0;
export const AGV_LINE_BASE_HEIGHT = 30.0;
export const AGV_LINE_SHAPE_TYPE = 'agv-line';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 60.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "path",
    "opacity": 1,
    "fill": "white",
    "data": "M0 0H60V30H0V0Z"
  },
  {
    "type": "fixedLine",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "edge": "top",
    "dash": [4.6875, 2.8125]
  },
  {
    "type": "fixedLine",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "edge": "bottom",
    "dash": [4.6875, 2.8125]
  }
];

export function createAgvLineShape({
  id,
  x = 0,
  y = 0,
  width = AGV_LINE_BASE_WIDTH,
  height = AGV_LINE_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: AGV_LINE_SHAPE_TYPE,
    baseWidth: AGV_LINE_BASE_WIDTH,
    baseHeight: AGV_LINE_BASE_HEIGHT,
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

export function serializeAgvLineShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreAgvLineShape(item) {
  return createAgvLineShape({
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
