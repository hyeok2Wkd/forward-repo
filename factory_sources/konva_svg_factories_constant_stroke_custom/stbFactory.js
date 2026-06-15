// Auto-generated from STB.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const STB_BASE_WIDTH = 60.0;
export const STB_BASE_HEIGHT = 30.0;
export const STB_SHAPE_TYPE = 'stb';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 60.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    type: 'fixedLine',
    opacity: 1,
    edge: 'top',
    stroke: 'black',
    strokeOpacity: 0.5,
    strokeWidth: 1,
  },
  {
    type: 'fixedLine',
    opacity: 1,
    edge: 'right',
    stroke: 'black',
    strokeOpacity: 0.5,
    strokeWidth: 1,
  },
  {
    type: 'fixedLine',
    opacity: 1,
    edge: 'bottom',
    stroke: 'black',
    strokeOpacity: 0.5,
    strokeWidth: 1,
  },
  {
    type: 'fixedLine',
    opacity: 1,
    edge: 'left',
    stroke: 'black',
    strokeOpacity: 0.5,
    strokeWidth: 1,
  },
  {
    type: 'rect',
    opacity: 1,
    fill: 'white',
    x: 4,
    y: 4,
    width: 52,
    height: 22,
  },
  {
    type: 'rect',
    opacity: 1,
    stroke: 'black',
    strokeOpacity: 0.9,
    strokeWidth: 1,
    dash: [1, 3],
    x: 4.5,
    y: 4.5,
    width: 51,
    height: 21,
  },
];

export function createStbShape({
  id,
  x = 0,
  y = 0,
  width = STB_BASE_WIDTH,
  height = STB_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: STB_SHAPE_TYPE,
    baseWidth: STB_BASE_WIDTH,
    baseHeight: STB_BASE_HEIGHT,
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

export function serializeStbShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreStbShape(item) {
  return createStbShape({
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
