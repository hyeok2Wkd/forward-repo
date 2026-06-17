// Auto-generated from process.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const PROCESS_BASE_WIDTH = 60.0;
export const PROCESS_BASE_HEIGHT = 30.0;
export const PROCESS_SHAPE_TYPE = 'process';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 60.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    type: 'fixedChamferOctagon',
    opacity: 1,
    fill: 'white',
    stroke: 'black',
    strokeOpacity: 0.5,
    strokeWidth: 1,
    chamferX: 7,
    chamferY: 5,
    edgeAligned: true,
  },
];

export function createProcessShape({
  id,
  x = 0,
  y = 0,
  width = PROCESS_BASE_WIDTH,
  height = PROCESS_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: PROCESS_SHAPE_TYPE,
    baseWidth: PROCESS_BASE_WIDTH,
    baseHeight: PROCESS_BASE_HEIGHT,
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

export function serializeProcessShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreProcessShape(item) {
  return createProcessShape({
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
