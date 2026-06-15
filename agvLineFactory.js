// Auto-generated from AGV line.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It is intended to replace Konva.Image usage while keeping your existing
// "Group means label/equipment-name is attached" logic intact.
import { createSvgLikeShape, updateSvgLikeShapeByDrag, serializeSvgLikeShape } from './svgShapeFactoryUtils';

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
    "type": "path",
    "opacity": 1,
    "fill": "black",
    "fillOpacity": 0.5,
    "data": "M0 30V30.5H2.34375V30V29.5H0V30ZM5.15625 30V30.5H9.84375V30V29.5H5.15625V30ZM12.6562 30V30.5H17.3438V30V29.5H12.6562V30ZM20.1562 30V30.5H24.8438V30V29.5H20.1562V30ZM27.6562 30V30.5H32.3438V30V29.5H27.6562V30ZM35.1562 30V30.5H39.8438V30V29.5H35.1562V30ZM42.6562 30V30.5H47.3438V30V29.5H42.6562V30ZM50.1562 30V30.5H54.8438V30V29.5H50.1562V30ZM57.6562 30V30.5H60V30V29.5H57.6562V30ZM60 0V-0.5H57.6562V0V0.5H60V0ZM54.8438 0V-0.5H50.1562V0V0.5H54.8438V0ZM47.3438 0V-0.5H42.6562V0V0.5H47.3438V0ZM39.8438 0V-0.5H35.1562V0V0.5H39.8438V0ZM32.3438 0V-0.5H27.6562V0V0.5H32.3438V0ZM24.8438 0V-0.5H20.1562V0V0.5H24.8438V0ZM17.3438 0V-0.5H12.6562V0V0.5H17.3438V0ZM9.84375 0V-0.5H5.15625V0V0.5H9.84375V0ZM2.34375 0V-0.5H0V0V0.5H2.34375V0ZM0 30V31H2.34375V30V29H0V30ZM5.15625 30V31H9.84375V30V29H5.15625V30ZM12.6562 30V31H17.3438V30V29H12.6562V30ZM20.1562 30V31H24.8438V30V29H20.1562V30ZM27.6562 30V31H32.3438V30V29H27.6562V30ZM35.1562 30V31H39.8438V30V29H35.1562V30ZM42.6562 30V31H47.3438V30V29H42.6562V30ZM50.1562 30V31H54.8438V30V29H50.1562V30ZM57.6562 30V31H60V30V29H57.6562V30ZM60 0V-1H57.6562V0V1H60V0ZM54.8438 0V-1H50.1562V0V1H54.8438V0ZM47.3438 0V-1H42.6562V0V1H47.3438V0ZM39.8438 0V-1H35.1562V0V1H39.8438V0ZM32.3438 0V-1H27.6562V0V1H32.3438V0ZM24.8438 0V-1H20.1562V0V1H24.8438V0ZM17.3438 0V-1H12.6562V0V1H17.3438V0ZM9.84375 0V-1H5.15625V0V1H9.84375V0ZM2.34375 0V-1H0V0V1H2.34375V0Z"
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
    name: 'agv-line-shape',
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

export function createAgvLineShapeFromDrag({ id, start, current, draggable = true } = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createAgvLineShape({ id, x, y, width, height, draggable });
}

export function updateAgvLineShapeByDrag(shape, start, current) {
  updateSvgLikeShapeByDrag(shape, start, current);
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
