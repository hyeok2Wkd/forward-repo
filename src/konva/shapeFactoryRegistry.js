import {
  createAgvLineShape,
  restoreAgvLineShape,
  serializeAgvLineShape,
  createBridgeShape,
  restoreBridgeShape,
  serializeBridgeShape,
  createConveyorShape,
  restoreConveyorShape,
  serializeConveyorShape,
  createCraneShape,
  restoreCraneShape,
  serializeCraneShape,
  createFullRateShape,
  restoreFullRateShape,
  serializeFullRateShape,
  createLifterShape,
  restoreLifterShape,
  serializeLifterShape,
  createMicShape,
  restoreMicShape,
  serializeMicShape,
  createOhsLineShape,
  restoreOhsLineShape,
  serializeOhsLineShape,
  createOhtLineShape,
  restoreOhtLineShape,
  serializeOhtLineShape,
  createPortShape,
  restorePortShape,
  serializePortShape,
  createProcessShape,
  restoreProcessShape,
  serializeProcessShape,
  createRailBufferShape,
  restoreRailBufferShape,
  serializeRailBufferShape,
  createStockerShape,
  restoreStockerShape,
  serializeStockerShape,
  createStbShape,
  restoreStbShape,
  serializeStbShape,
  createVehicle1Shape,
  restoreVehicle1Shape,
  serializeVehicle1Shape,
  createVehicle2Shape,
  restoreVehicle2Shape,
  serializeVehicle2Shape,
  createVehicle3Shape,
  restoreVehicle3Shape,
  serializeVehicle3Shape,
  createWaypointShape,
  restoreWaypointShape,
  serializeWaypointShape,
  createZoneContainerShape,
  restoreZoneContainerShape,
  serializeZoneContainerShape,
  createZoneShape,
  restoreZoneShape,
  serializeZoneShape,
} from '../konvaSvgFactories';
import {
  FIXED_STROKE_WIDTH_RATIO_ATTR,
  normalizeFixedStrokeWidthRatio,
} from '../konvaSvgFactories/svgShapeFactoryUtils';

const COMPACT_EQUIPMENT_STROKE_WIDTH_RATIO = 2;

export const SHAPE_FACTORY_REGISTRY = Object.freeze({
  stocker: {
    type: 'stocker',
    shapeType: 'stocker',
    label: 'Stocker',
    create: createStockerShape,
    restore: restoreStockerShape,
    serialize: serializeStockerShape,
  },
  conveyor: {
    type: 'conveyor',
    shapeType: 'conveyor',
    label: 'Conveyor',
    create: createConveyorShape,
    restore: restoreConveyorShape,
    serialize: serializeConveyorShape,
  },
  port: {
    type: 'port',
    shapeType: 'port',
    label: 'Port',
    strokeWidthRatio: COMPACT_EQUIPMENT_STROKE_WIDTH_RATIO,
    create: createPortShape,
    restore: restorePortShape,
    serialize: serializePortShape,
  },
  process: {
    type: 'process',
    shapeType: 'process',
    label: 'Process',
    create: createProcessShape,
    restore: restoreProcessShape,
    serialize: serializeProcessShape,
  },
  crane: {
    type: 'crane',
    shapeType: 'crane',
    label: 'Crane',
    create: createCraneShape,
    restore: restoreCraneShape,
    serialize: serializeCraneShape,
  },
  agvLine: {
    type: 'agvLine',
    shapeType: 'agv-line',
    label: 'AGV Line',
    create: createAgvLineShape,
    restore: restoreAgvLineShape,
    serialize: serializeAgvLineShape,
  },
  ohsLine: {
    type: 'ohsLine',
    shapeType: 'ohs-line',
    label: 'OHS Line',
    create: createOhsLineShape,
    restore: restoreOhsLineShape,
    serialize: serializeOhsLineShape,
  },
  ohtLine: {
    type: 'ohtLine',
    shapeType: 'oht-line',
    label: 'OHT Line',
    create: createOhtLineShape,
    restore: restoreOhtLineShape,
    serialize: serializeOhtLineShape,
  },
  bridge: {
    type: 'bridge',
    shapeType: 'bridge',
    label: 'Bridge',
    create: createBridgeShape,
    restore: restoreBridgeShape,
    serialize: serializeBridgeShape,
  },
  lifter: {
    type: 'lifter',
    shapeType: 'lifter',
    label: 'Lifter',
    create: createLifterShape,
    restore: restoreLifterShape,
    serialize: serializeLifterShape,
  },
  mic: {
    type: 'mic',
    shapeType: 'mic',
    label: 'MIC',
    create: createMicShape,
    restore: restoreMicShape,
    serialize: serializeMicShape,
  },
  railBuffer: {
    type: 'railBuffer',
    shapeType: 'rail-buffer',
    label: 'Rail Buffer',
    create: createRailBufferShape,
    restore: restoreRailBufferShape,
    serialize: serializeRailBufferShape,
  },
  fullRate: {
    type: 'fullRate',
    shapeType: 'full-rate',
    label: 'Full Rate',
    create: createFullRateShape,
    restore: restoreFullRateShape,
    serialize: serializeFullRateShape,
  },
  stb: {
    type: 'stb',
    shapeType: 'stb',
    label: 'STB',
    create: createStbShape,
    restore: restoreStbShape,
    serialize: serializeStbShape,
  },
  vehicle1: {
    type: 'vehicle1',
    shapeType: 'vehicle1',
    label: 'Vehicle 1',
    strokeWidthRatio: COMPACT_EQUIPMENT_STROKE_WIDTH_RATIO,
    create: createVehicle1Shape,
    restore: restoreVehicle1Shape,
    serialize: serializeVehicle1Shape,
  },
  vehicle2: {
    type: 'vehicle2',
    shapeType: 'vehicle2',
    label: 'Vehicle 2',
    strokeWidthRatio: COMPACT_EQUIPMENT_STROKE_WIDTH_RATIO,
    create: createVehicle2Shape,
    restore: restoreVehicle2Shape,
    serialize: serializeVehicle2Shape,
  },
  vehicle3: {
    type: 'vehicle3',
    shapeType: 'vehicle3',
    label: 'Vehicle 3',
    strokeWidthRatio: COMPACT_EQUIPMENT_STROKE_WIDTH_RATIO,
    create: createVehicle3Shape,
    restore: restoreVehicle3Shape,
    serialize: serializeVehicle3Shape,
  },
  waypoint: {
    type: 'waypoint',
    shapeType: 'waypoint',
    label: 'Waypoint',
    create: createWaypointShape,
    restore: restoreWaypointShape,
    serialize: serializeWaypointShape,
  },
  zone: {
    type: 'zone',
    shapeType: 'zone',
    label: 'Zone',
    create: createZoneShape,
    restore: restoreZoneShape,
    serialize: serializeZoneShape,
  },
  zoneContainer: {
    type: 'zoneContainer',
    shapeType: 'zone-container',
    label: 'Zone Container',
    create: createZoneContainerShape,
    restore: restoreZoneContainerShape,
    serialize: serializeZoneContainerShape,
  },
});

export const PALETTE_ITEMS = Object.freeze(
  Object.values(SHAPE_FACTORY_REGISTRY).map(({ type, label }) => ({ type, label }))
);

const shapeTypeAliases = Object.values(SHAPE_FACTORY_REGISTRY).reduce((aliases, item) => {
  aliases[item.type] = item.type;
  aliases[item.shapeType] = item.type;
  return aliases;
}, {});

shapeTypeAliases.STB = 'stb';

export const SHAPE_TYPE_ALIASES = Object.freeze(shapeTypeAliases);

export function getCanonicalShapeType(type) {
  return type ? SHAPE_TYPE_ALIASES[type] || null : null;
}

export function getShapeFactory(type) {
  const canonicalType = getCanonicalShapeType(type);
  return canonicalType ? SHAPE_FACTORY_REGISTRY[canonicalType] : null;
}

export function getShapeTypeFromNode(node) {
  if (!node || typeof node.getAttr !== 'function') return null;

  const rawType = node.getAttr('shapeType')
    || node.getAttr('equipmentType')
    || node.getAttr('layoutShapeType')
    || node.getAttr('type');

  return getCanonicalShapeType(rawType);
}

export function createShapeNode(type, attrs = {}) {
  const factory = getShapeFactory(type);
  if (!factory) {
    throw new Error(`Unknown shape type: ${type}`);
  }

  const node = factory.create({
    ...attrs,
    strokeWidthRatio: factory.strokeWidthRatio ?? attrs.strokeWidthRatio,
    draggable: attrs.draggable !== false,
  });

  tagShapeNode(node, factory, attrs);
  return node;
}

export function restoreShapeNode(data = {}) {
  const factory = getShapeFactory(data.type);
  if (!factory) {
    throw new Error(`Unknown shape type: ${data.type}`);
  }

  const restoreData = {
    ...data,
    strokeWidthRatio: factory.strokeWidthRatio ?? data.strokeWidthRatio,
    draggable: data.draggable !== false,
  };

  const node = factory.restore
    ? factory.restore(restoreData)
    : factory.create(restoreData);

  tagShapeNode(node, factory, restoreData);
  return node;
}

function tagShapeNode(node, factory, sourceAttrs = {}) {
  if (!node || typeof node.setAttrs !== 'function') return;

  const strokeWidthRatio = normalizeFixedStrokeWidthRatio(
    factory.strokeWidthRatio
      ?? sourceAttrs.strokeWidthRatio
      ?? sourceAttrs[FIXED_STROKE_WIDTH_RATIO_ATTR]
      ?? node.getAttr(FIXED_STROKE_WIDTH_RATIO_ATTR)
  );

  const attrs = {
    layoutShapeType: factory.type,
    [FIXED_STROKE_WIDTH_RATIO_ATTR]: strokeWidthRatio,
  };

  if (!node.getAttr('shapeType')) attrs.shapeType = factory.shapeType;
  if (!node.getAttr('equipmentType')) attrs.equipmentType = factory.shapeType;

  node.setAttrs(attrs);
}
