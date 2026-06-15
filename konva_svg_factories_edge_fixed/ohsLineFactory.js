// Auto-generated from OHS line.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It is intended to replace Konva.Image usage while keeping your existing
// "Group means label/equipment-name is attached" logic intact.
import { createSvgLikeShape, updateSvgLikeShapeByDrag, serializeSvgLikeShape } from './svgShapeFactoryUtils';

export const OHS_LINE_BASE_WIDTH = 60.0;
export const OHS_LINE_BASE_HEIGHT = 30.0;
export const OHS_LINE_SHAPE_TYPE = 'ohs-line';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 60.0, height: 30.0 };

const DRAW_COMMANDS = [
  {
    "type": "path",
    "opacity": 1,
    "fill": "white",
    "fillOpacity": 0.5,
    "data": "M0 0H60V30H0V0Z"
  },
  {
    "type": "path",
    "opacity": 1,
    "fill": "black",
    "fillOpacity": 0.5,
    "data": "M0 0V3H60V0V-3H0V0ZM60 30V27H0V30V33H60V30Z"
  }
];

export function createOhsLineShape({
  id,
  x = 0,
  y = 0,
  width = OHS_LINE_BASE_WIDTH,
  height = OHS_LINE_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: OHS_LINE_SHAPE_TYPE,
    name: 'ohs-line-shape',
    baseWidth: OHS_LINE_BASE_WIDTH,
    baseHeight: OHS_LINE_BASE_HEIGHT,
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

export function createOhsLineShapeFromDrag({ id, start, current, draggable = true } = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createOhsLineShape({ id, x, y, width, height, draggable });
}

export function updateOhsLineShapeByDrag(shape, start, current) {
  updateSvgLikeShapeByDrag(shape, start, current);
}

export function serializeOhsLineShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreOhsLineShape(item) {
  return createOhsLineShape({
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
