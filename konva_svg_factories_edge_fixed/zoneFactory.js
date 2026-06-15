// Auto-generated from zone.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It is intended to replace Konva.Image usage while keeping your existing
// "Group means label/equipment-name is attached" logic intact.
import { createSvgLikeShape, updateSvgLikeShapeByDrag, serializeSvgLikeShape } from './svgShapeFactoryUtils';

export const ZONE_BASE_WIDTH = 64.0;
export const ZONE_BASE_HEIGHT = 34.0;
export const ZONE_SHAPE_TYPE = 'zone';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 64.0, height: 34.0 };

const DRAW_COMMANDS = [
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 0,
    "y": 0,
    "width": 60.0,
    "height": 30.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "x": 0.5,
    "y": 0.5,
    "width": 59.0,
    "height": 29.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "fill": "white",
    "x": 2.0,
    "y": 2.0,
    "width": 56.0,
    "height": 26.0
  },
  {
    "type": "rect",
    "opacity": 1,
    "stroke": "black",
    "strokeOpacity": 0.5,
    "strokeWidth": 1,
    "x": 2.5,
    "y": 2.5,
    "width": 55.0,
    "height": 25.0
  }
];

export function createZoneShape({
  id,
  x = 0,
  y = 0,
  width = ZONE_BASE_WIDTH,
  height = ZONE_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: ZONE_SHAPE_TYPE,
    name: 'zone-shape',
    baseWidth: ZONE_BASE_WIDTH,
    baseHeight: ZONE_BASE_HEIGHT,
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

export function createZoneShapeFromDrag({ id, start, current, draggable = true } = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createZoneShape({ id, x, y, width, height, draggable });
}

export function updateZoneShapeByDrag(shape, start, current) {
  updateSvgLikeShapeByDrag(shape, start, current);
}

export function serializeZoneShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreZoneShape(item) {
  return createZoneShape({
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
