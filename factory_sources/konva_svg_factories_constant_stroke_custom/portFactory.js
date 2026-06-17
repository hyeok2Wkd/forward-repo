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
export const PORT_STROKE_WIDTH_RATIO = 2;

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
    "strokeWidth": 1.5,
    "x": 0.75,
    "y": 0.75,
    "width": 28.5,
    "height": 28.5
  },
  {
    "type": "path",
    "opacity": 0.3,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 0.75,
    "lineCap": "square",
    "data": "M0 30L30 0M30 30L0 0"
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
  strokeWidthRatio = PORT_STROKE_WIDTH_RATIO,
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
    strokeWidthRatio,
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
    strokeWidthRatio: item.strokeWidthRatio,
  });
}
