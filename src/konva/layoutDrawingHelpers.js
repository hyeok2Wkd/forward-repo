import Konva from 'konva';
import {
  createShapeNode,
  getCanonicalShapeType,
  getShapeTypeFromNode,
  restoreShapeNode,
} from './shapeFactoryRegistry';
import {
  FIXED_STROKE_WIDTH_RATIO_ATTR,
  FILL_COLOR_ATTR,
  STROKE_COLOR_ATTR,
  getFixedStrokeWidthRatio,
  getShapeColorOverride,
} from '../konvaSvgFactories/svgShapeFactoryUtils';

export const EQUIPMENT_GROUP_KIND = 'equipmentGroup';
export const LABEL_ROLE = 'equipmentLabel';
export const DEFAULT_LABEL_FONT_SIZE = 13;

export function normalizeDragRect(start, current) {
  if (!start || !current) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.abs(current.x - start.x);
  const height = Math.abs(current.y - start.y);

  return { x, y, width, height };
}

export function getRelativePointerPosition(node) {
  if (!node || typeof node.getStage !== 'function') return null;

  const stage = node.getStage();
  const pointerPosition = stage && stage.getPointerPosition();
  if (!stage || !pointerPosition) return null;

  const transform = node.getAbsoluteTransform().copy();
  transform.invert();
  return transform.point(pointerPosition);
}

export function getTransformerTarget(node) {
  if (!node || isStageNode(node)) return null;

  const equipmentGroup = findAncestorEquipmentGroup(node);
  if (equipmentGroup) return equipmentGroup;

  let current = node;
  while (current && !isStageNode(current)) {
    if (isEquipmentShape(current)) return current;
    current = getParentNode(current);
  }

  return null;
}

export function wrapShapeWithLabelGroup(shape, labelText = '') {
  if (!isEquipmentShape(shape)) return null;

  const originalId = shape.id();
  const type = getShapeTypeFromNode(shape);
  const rawShapeType = shape.getAttr('shapeType') || shape.getAttr('equipmentType') || type;
  const parent = shape.getParent();
  const zIndex = typeof shape.zIndex === 'function' ? shape.zIndex() : null;

  const group = new Konva.Group({
    id: originalId || createGeneratedId(type || 'equipment'),
    x: shape.x(),
    y: shape.y(),
    scaleX: shape.scaleX(),
    scaleY: shape.scaleY(),
    rotation: shape.rotation(),
    draggable: true,
    shapeType: rawShapeType,
    equipmentType: rawShapeType,
    layoutShapeType: type,
    layoutNodeKind: EQUIPMENT_GROUP_KIND,
  });

  shape.off('dragstart transformstart dragend transformend');
  shape.setAttrs({
    id: originalId ? `${originalId}__shape` : shape.id(),
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    draggable: false,
    layoutShapeType: type,
  });

  group.add(shape);
  setGroupLabelText(group, labelText);

  if (parent) {
    parent.add(group);
    if (zIndex != null) group.zIndex(zIndex);
  }

  return group;
}

export function serializeNode(node) {
  const target = getTransformerTarget(node) || node;
  if (!target) return null;

  if (isEquipmentGroup(target)) {
    const shape = findEquipmentShape(target);
    const type = getShapeTypeFromNode(shape) || getShapeTypeFromNode(target);
    const labelText = getNodeLabelText(target);

    return {
      id: target.id(),
      type,
      name: labelText,
      x: target.x(),
      y: target.y(),
      width: readNodeMethod(shape, 'width'),
      height: readNodeMethod(shape, 'height'),
      scaleX: target.scaleX(),
      scaleY: target.scaleY(),
      rotation: target.rotation(),
      draggable: target.draggable(),
      strokeWidthRatio: getNodeStrokeWidthRatio(shape),
      fillColor: getNodeColorOverride(target, shape, FILL_COLOR_ATTR),
      strokeColor: getNodeColorOverride(target, shape, STROKE_COLOR_ATTR),
      equipmentCategory: readNodeAttr(target, 'equipmentCategory') || readNodeAttr(shape, 'equipmentCategory'),
      equipmentState: readNodeAttr(target, 'equipmentState') || readNodeAttr(shape, 'equipmentState'),
      equipmentStatus: readNodeAttr(target, 'equipmentStatus') || readNodeAttr(shape, 'equipmentStatus'),
      rgb: readNodeAttr(target, 'rgb') || readNodeAttr(shape, 'rgb'),
      hasLabel: Boolean(labelText),
      labelText,
    };
  }

  if (isEquipmentShape(target)) {
    const type = getShapeTypeFromNode(target);

    return {
      id: target.id(),
      type,
      name: '',
      x: target.x(),
      y: target.y(),
      width: readNodeMethod(target, 'width'),
      height: readNodeMethod(target, 'height'),
      scaleX: target.scaleX(),
      scaleY: target.scaleY(),
      rotation: target.rotation(),
      draggable: target.draggable(),
      strokeWidthRatio: getNodeStrokeWidthRatio(target),
      fillColor: getNodeColorOverride(target, target, FILL_COLOR_ATTR),
      strokeColor: getNodeColorOverride(target, target, STROKE_COLOR_ATTR),
      equipmentCategory: readNodeAttr(target, 'equipmentCategory'),
      equipmentState: readNodeAttr(target, 'equipmentState'),
      equipmentStatus: readNodeAttr(target, 'equipmentStatus'),
      rgb: readNodeAttr(target, 'rgb'),
      hasLabel: false,
      labelText: '',
    };
  }

  return null;
}

export function restoreNodeFromData(data = {}) {
  const type = getCanonicalShapeType(data.type);
  if (!type) {
    throw new Error(`Unknown shape type: ${data.type}`);
  }

  const shape = restoreShapeNode({
    ...data,
    type,
    draggable: data.draggable !== false,
  });
  applySerializedAttrs(shape, data);

  const nameText = data.name || data.labelText || '';
  if (data.hasLabel || nameText) {
    const group = wrapShapeWithLabelGroup(shape, nameText);
    applySerializedAttrs(group, data);
    return group;
  }

  return shape;
}

export function createNodeFromType(type, attrs = {}) {
  return createShapeNode(type, attrs);
}

export function setGroupLabelText(group, labelText = '') {
  if (!isEquipmentGroup(group)) return null;

  const shape = findEquipmentShape(group);
  if (!shape) return null;

  const width = Math.max(readNodeMethod(shape, 'width') || 1, 1);
  const height = Math.max(readNodeMethod(shape, 'height') || 1, 1);
  const fontSize = Math.min(DEFAULT_LABEL_FONT_SIZE, Math.max(8, Math.floor(height * 0.42)));
  let labelNode = findLabelTextNode(group);

  if (!labelNode) {
    labelNode = new Konva.Text({
      x: 0,
      y: 0,
      width,
      height,
      text: '',
      fontSize,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      fill: '#111827',
      align: 'center',
      verticalAlign: 'middle',
      ellipsis: true,
      listening: true,
      labelRole: LABEL_ROLE,
    });
    group.add(labelNode);
  }

  labelNode.setAttrs({
    x: 0,
    y: 0,
    width,
    height,
    text: labelText,
    fontSize,
    align: 'center',
    verticalAlign: 'middle',
    labelRole: LABEL_ROLE,
  });

  group.setAttr('labelText', labelText);
  group.setAttr('equipmentName', labelText);
  return labelNode;
}

export function getNodeLabelText(node) {
  const target = getTransformerTarget(node) || node;
  if (!isEquipmentGroup(target)) return '';

  const labelNode = findLabelTextNode(target);
  if (!labelNode) return '';

  const text = labelNode.text();
  return typeof text === 'string' ? text : '';
}

export function findEquipmentShape(node) {
  if (isEquipmentShape(node)) return node;
  if (!node || typeof node.getChildren !== 'function') return null;

  const children = toNodeArray(node.getChildren());
  for (const child of children) {
    if (isEquipmentShape(child)) return child;
  }

  for (const child of children) {
    const nestedShape = findEquipmentShape(child);
    if (nestedShape) return nestedShape;
  }

  return null;
}

export function isEquipmentShape(node) {
  if (!node || typeof node.getClassName !== 'function') return false;
  return node.getClassName() === 'Shape' && Boolean(getShapeTypeFromNode(node));
}

export function isEquipmentGroup(node) {
  if (!node || typeof node.getClassName !== 'function') return false;

  return node.getClassName() === 'Group'
    && (
      node.getAttr('layoutNodeKind') === EQUIPMENT_GROUP_KIND
      || Boolean(getShapeTypeFromNode(node))
    );
}

function findAncestorEquipmentGroup(node) {
  let current = node;
  while (current && !isStageNode(current)) {
    if (isEquipmentGroup(current)) return current;
    current = getParentNode(current);
  }
  return null;
}

function findLabelTextNode(group) {
  if (!group || typeof group.getChildren !== 'function') return null;

  return toNodeArray(group.getChildren()).find((child) => (
    child
    && typeof child.getClassName === 'function'
    && child.getClassName() === 'Text'
    && child.getAttr('labelRole') === LABEL_ROLE
  )) || null;
}

function readNodeMethod(node, methodName) {
  return node && typeof node[methodName] === 'function'
    ? node[methodName]()
    : undefined;
}

function readNodeAttr(node, attrName) {
  return node && typeof node.getAttr === 'function'
    ? node.getAttr(attrName)
    : undefined;
}

function applySerializedAttrs(node, data = {}) {
  if (!node || typeof node.setAttrs !== 'function') return;

  const attrs = {};
  setDefinedAttr(attrs, FIXED_STROKE_WIDTH_RATIO_ATTR, data.strokeWidthRatio);
  setDefinedAttr(attrs, FILL_COLOR_ATTR, data.fillColor);
  setDefinedAttr(attrs, STROKE_COLOR_ATTR, data.strokeColor);
  setDefinedAttr(attrs, 'equipmentCategory', data.equipmentCategory);
  setDefinedAttr(attrs, 'equipmentState', data.equipmentState);
  setDefinedAttr(attrs, 'equipmentStatus', data.equipmentStatus);
  setDefinedAttr(attrs, 'rgb', data.rgb);

  node.setAttrs(attrs);
}

function setDefinedAttr(attrs, key, value) {
  if (value !== undefined && value !== null && value !== '') {
    attrs[key] = value;
  }
}

function getNodeStrokeWidthRatio(node) {
  if (!node || typeof node.getAttr !== 'function') return undefined;
  return node.getAttr(FIXED_STROKE_WIDTH_RATIO_ATTR) == null
    ? undefined
    : getFixedStrokeWidthRatio(node);
}

function getNodeColorOverride(target, shape, attrName) {
  if (target && typeof target.getAttr === 'function') {
    const targetValue = target.getAttr(attrName);
    if (targetValue != null && targetValue !== '') return targetValue;
  }

  return getShapeColorOverride(shape, attrName);
}

function toNodeArray(collection) {
  if (!collection) return [];
  if (typeof collection.toArray === 'function') return collection.toArray();
  return Array.from(collection);
}

function getParentNode(node) {
  return node && typeof node.getParent === 'function' ? node.getParent() : null;
}

function isStageNode(node) {
  return node && typeof node.getClassName === 'function' && node.getClassName() === 'Stage';
}

function createGeneratedId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
