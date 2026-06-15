// Auto-generated from bridge.svg
// This factory creates a single Konva.Shape, not a Konva.Group.
// It is intended to replace Konva.Image usage while keeping your existing
// "Group means label/equipment-name is attached" logic intact.
import { createSvgLikeShape, updateSvgLikeShapeByDrag, serializeSvgLikeShape } from './svgShapeFactoryUtils';

export const BRIDGE_BASE_WIDTH = 60.0;
export const BRIDGE_BASE_HEIGHT = 30.0;
export const BRIDGE_SHAPE_TYPE = 'bridge';

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
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M0 3H4V13.5H0V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M6 3H10V13.5H6V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M12 3H16V13.5H12V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M18 3H22V13.5H18V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M24 3H28V13.5H24V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M30 3H34V13.5H30V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M36 3H40V13.5H36V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M42 3H46V13.5H42V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M48 3H52V13.5H48V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M54 3H58V13.5H54V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M60 3H64V13.5H60V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M66 3H70V13.5H66V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M72 3H76V13.5H72V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M78 3H82V13.5H78V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M84 3H88V13.5H84V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M90 3H94V13.5H90V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M96 3H100V13.5H96V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M102 3H106V13.5H102V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M108 3H112V13.5H108V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M114 3H118V13.5H114V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M120 3H124V13.5H120V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M126 3H130V13.5H126V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M132 3H136V13.5H132V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M138 3H142V13.5H138V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M144 3H148V13.5H144V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M150 3H154V13.5H150V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M156 3H160V13.5H156V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M162 3H166V13.5H162V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M168 3H172V13.5H168V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M174 3H178V13.5H174V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M180 3H184V13.5H180V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M186 3H190V13.5H186V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M192 3H196V13.5H192V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M198 3H202V13.5H198V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M204 3H208V13.5H204V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M210 3H214V13.5H210V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M216 3H220V13.5H216V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M222 3H226V13.5H222V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M228 3H232V13.5H228V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M234 3H238V13.5H234V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M240 3H244V13.5H240V3Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M0 16.5H4V27H0V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M6 16.5H10V27H6V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M12 16.5H16V27H12V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M18 16.5H22V27H18V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M24 16.5H28V27H24V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M30 16.5H34V27H30V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M36 16.5H40V27H36V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M42 16.5H46V27H42V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M48 16.5H52V27H48V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M54 16.5H58V27H54V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M60 16.5H64V27H60V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M66 16.5H70V27H66V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M72 16.5H76V27H72V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M78 16.5H82V27H78V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M84 16.5H88V27H84V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M90 16.5H94V27H90V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M96 16.5H100V27H96V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M102 16.5H106V27H102V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M108 16.5H112V27H108V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M114 16.5H118V27H114V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M120 16.5H124V27H120V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M126 16.5H130V27H126V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M132 16.5H136V27H132V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M138 16.5H142V27H138V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M144 16.5H148V27H144V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M150 16.5H154V27H150V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M156 16.5H160V27H156V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M162 16.5H166V27H162V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M168 16.5H172V27H168V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M174 16.5H178V27H174V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M180 16.5H184V27H180V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M186 16.5H190V27H186V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M192 16.5H196V27H192V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M198 16.5H202V27H198V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M204 16.5H208V27H204V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M210 16.5H214V27H210V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M216 16.5H220V27H216V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M222 16.5H226V27H222V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M228 16.5H232V27H228V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M234 16.5H238V27H234V16.5Z"
  },
  {
    "type": "path",
    "opacity": 0.5,
    "fill": "#D1D1D6",
    "data": "M240 16.5H244V27H240V16.5Z"
  },
  {
    "type": "path",
    "opacity": 1,
    "fill": "black",
    "fillOpacity": 0.5,
    "data": "M0 0V1H60V0V-1H0V0ZM60 30V29H0V30V31H60V30Z"
  }
];

export function createBridgeShape({
  id,
  x = 0,
  y = 0,
  width = BRIDGE_BASE_WIDTH,
  height = BRIDGE_BASE_HEIGHT,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  draggable = true,
} = {}) {
  return createSvgLikeShape({
    id,
    shapeType: BRIDGE_SHAPE_TYPE,
    name: 'bridge-shape',
    baseWidth: BRIDGE_BASE_WIDTH,
    baseHeight: BRIDGE_BASE_HEIGHT,
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

export function createBridgeShapeFromDrag({ id, start, current, draggable = true } = {}) {
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.max(Math.abs(current.x - start.x), 1);
  const height = Math.max(Math.abs(current.y - start.y), 1);

  return createBridgeShape({ id, x, y, width, height, draggable });
}

export function updateBridgeShapeByDrag(shape, start, current) {
  updateSvgLikeShapeByDrag(shape, start, current);
}

export function serializeBridgeShape(shape) {
  return serializeSvgLikeShape(shape);
}

export function restoreBridgeShape(item) {
  return createBridgeShape({
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
