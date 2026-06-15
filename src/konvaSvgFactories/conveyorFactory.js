// Conveyor factory based on conveyor.svg.
// Internal rectangles keep the original design density and spacing.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const CONVEYOR_BASE_WIDTH = 60.0;
export const CONVEYOR_BASE_HEIGHT = 30.0;
export const CONVEYOR_SHAPE_TYPE = 'conveyor';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 60.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    type: 'path',
    opacity: 1,
    fill: 'white',
    data: 'M0 0H60V30H0V0Z',
  },
  {
    type: 'fixedRectGrid',
    opacity: 0.5,
    fill: '#D1D1D6',
    sizingMode: 'heightScale',
    rectWidth: 4,
    rectHeight: 24,
    gapX: 2,
    gapY: 0,
    paddingX: 0,
    paddingY: 3,
  },
  {
    type: 'fixedLine',
    opacity: 1,
    stroke: 'black',
    strokeOpacity: 0.5,
    strokeWidth: 1,
    edge: 'top',
  },
  {
    type: 'fixedLine',
    opacity: 1,
    stroke: 'black',
    strokeOpacity: 0.5,
    strokeWidth: 1,
    edge: 'bottom',
  },
];

export function createConveyorShape({
  id,
  x = 0,
  y = 0,
  width = CONVEYOR_BASE_WIDTH,
  height = CONVEYOR_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: CONVEYOR_SHAPE_TYPE,
    baseWidth: CONVEYOR_BASE_WIDTH,
    baseHeight: CONVEYOR_BASE_HEIGHT,
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

export function serializeConveyorShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreConveyorShape(item) {
  return createConveyorShape({
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
