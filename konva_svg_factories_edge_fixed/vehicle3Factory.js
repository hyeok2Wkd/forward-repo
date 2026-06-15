// Auto-generated from vehicle3.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It is intended to replace Konva.Image usage while keeping your existing
// "Group means label/equipment-name is attached" logic intact.
import { createSvgLikeShape, updateSvgLikeShapeByDrag, serializeSvgLikeShape } from './svgShapeFactoryUtils';

export const VEHICLE3_BASE_WIDTH = 30.0;
export const VEHICLE3_BASE_HEIGHT = 30.0;
export const VEHICLE3_SHAPE_TYPE = 'vehicle3';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 30.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "path",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 3.0,
    "lineCap": "round",
    "data": "M28.5 12V17.5M1.5 12V17.5"
  },
  {
    "type": "path",
    "opacity": 1,
    "fill": "white",
    "data": "M2 5C2 2.23858 4.23858 0 7 0H23C25.7614 0 28 2.23858 28 5V25C28 27.7614 25.7614 30 23 30H7C4.23858 30 2 27.7614 2 25V5Z"
  },
  {
    "type": "path",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "data": "M7 0.5H23C25.4853 0.5 27.5 2.51472 27.5 5V25C27.5 27.4853 25.4853 29.5 23 29.5H7C4.51472 29.5 2.5 27.4853 2.5 25V5C2.5 2.51472 4.51472 0.5 7 0.5Z"
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
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: VEHICLE3_SHAPE_TYPE,
    name: 'vehicle3-shape',
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
  });
}

export function createVehicle3ShapeFromDrag({ id, start, current, draggable = true } = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createVehicle3Shape({ id, x, y, width, height, draggable });
}

export function updateVehicle3ShapeByDrag(shape, start, current) {
  updateSvgLikeShapeByDrag(shape, start, current);
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
  });
}
