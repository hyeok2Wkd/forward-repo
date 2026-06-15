// Auto-generated from waypoint.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It does NOT assign Konva node `name`.

import {
  createSvgLikeShape,
  serializeSvgLikeShape,
} from './svgShapeFactoryUtils';

export const WAYPOINT_BASE_WIDTH = 15.0;
export const WAYPOINT_BASE_HEIGHT = 15.0;
export const WAYPOINT_SHAPE_TYPE = 'waypoint';

const VIEW_BOX = { x: 0.0, y: 0.0, width: 15.0, height: 15.0 };

const DRAW_COMMANDS = [
  {
    type: 'circle',
    opacity: 1,
    fill: 'white',
    cx: 7.5,
    cy: 7.5,
    r: 7.5,
  },
  {
    type: 'fixedEllipseStroke',
    opacity: 1,
    stroke: 'black',
    strokeOpacity: 0.5,
    strokeWidth: 1,
    cx: 7.5,
    cy: 7.5,
    r: 7.5,
    edgeAligned: true,
  },
];

export function createWaypointShape({
  id,
  x = 0,
  y = 0,
  width = WAYPOINT_BASE_WIDTH,
  height = WAYPOINT_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: WAYPOINT_SHAPE_TYPE,
    baseWidth: WAYPOINT_BASE_WIDTH,
    baseHeight: WAYPOINT_BASE_HEIGHT,
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

export function serializeWaypointShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreWaypointShape(item) {
  return createWaypointShape({
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
