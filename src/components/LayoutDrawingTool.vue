<template>
  <div class="layout-drawing-tool">
    <ToolPalette
      :items="paletteItems"
      :selected-type="selectedTool"
      @select="handlePaletteSelect"
    />

    <section class="layout-drawing-tool__workspace">
      <div class="layout-drawing-tool__toolbar">
        <button
          type="button"
          class="toolbar-button"
          :class="{ 'toolbar-button--active': !selectedTool }"
          @click="setSelectMode"
        >
          Select
        </button>
        <button type="button" class="toolbar-button" @click="saveLayout">
          Save JSON
        </button>
        <button type="button" class="toolbar-button" @click="restoreLayoutFromJson">
          Restore JSON
        </button>
        <button
          type="button"
          class="toolbar-button"
          :disabled="!canOpenSvgCompare"
          :title="svgCompareButtonTitle"
          @click="openSvgCompare"
        >
          SVG compare
        </button>
        <label class="stroke-ratio-control">
          <span class="stroke-ratio-control__label">Stroke</span>
          <input
            v-model.number="strokeWidthRatio"
            class="stroke-ratio-control__range"
            type="range"
            :min="strokeWidthRatioMin"
            :max="strokeWidthRatioMax"
            :step="strokeWidthRatioStep"
            aria-label="Stroke width ratio"
          />
          <input
            v-model.number="strokeWidthRatio"
            class="stroke-ratio-control__input"
            type="number"
            :min="strokeWidthRatioMin"
            :max="strokeWidthRatioMax"
            :step="strokeWidthRatioStep"
            aria-label="Stroke width ratio value"
            @blur="normalizeStrokeWidthRatioInput"
            @change="normalizeStrokeWidthRatioInput"
          />
        </label>
        <button
          type="button"
          class="toolbar-button"
          :disabled="!selectedNode"
          @click="deleteSelectedNode"
        >
          Delete
        </button>
        <button type="button" class="toolbar-button" @click="clearAllNodes">
          Clear All
        </button>
        <span v-if="errorMessage" class="toolbar-error">{{ errorMessage }}</span>
      </div>

      <div ref="stageShell" class="layout-drawing-tool__stage-shell">
        <div ref="stageContainer" class="layout-drawing-tool__stage"></div>

        <form
          v-if="labelEditor.visible"
          class="label-editor"
          :style="labelEditorStyle"
          @submit.prevent="applyLabelEditor"
        >
          <input
            ref="labelInput"
            v-model="labelEditor.value"
            class="label-editor__input"
            type="text"
            placeholder="Name"
            autocomplete="off"
            @keydown.esc.prevent="closeLabelEditor"
          />
          <div class="label-editor__actions">
            <button type="submit" class="label-editor__button">OK</button>
            <button type="button" class="label-editor__button" @click="closeLabelEditor">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <textarea
        v-model="layoutJson"
        class="layout-drawing-tool__json"
        spellcheck="false"
      ></textarea>
    </section>

    <div
      v-if="svgCompareDialog.visible"
      class="svg-compare-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="`SVG compare ${svgCompareDialog.label}`"
      @click.self="closeSvgCompare"
    >
      <div class="svg-compare-modal__panel">
        <header class="svg-compare-modal__header">
          <div>
            <h2 class="svg-compare-modal__title">
              SVG Compare - {{ svgCompareDialog.label }}
            </h2>
            <div class="svg-compare-modal__meta">
              {{ svgCompareDialog.fileName }} / {{ svgCompareDialog.actualWidth }} x
              {{ svgCompareDialog.actualHeight }}
            </div>
          </div>
          <button
            type="button"
            class="svg-compare-modal__close"
            aria-label="Close SVG compare"
            @click="closeSvgCompare"
          >
            X
          </button>
        </header>

        <div class="svg-compare-modal__grid">
          <section class="svg-compare-card">
            <h3 class="svg-compare-card__title">Factory render</h3>
            <div class="svg-compare-card__artboard">
              <img
                class="svg-compare-card__image"
                :src="svgCompareDialog.factoryImageDataUrl"
                :alt="`${svgCompareDialog.label} factory render`"
                :style="svgComparePreviewStyle"
              />
            </div>
          </section>

          <section class="svg-compare-card">
            <h3 class="svg-compare-card__title">Source SVG</h3>
            <div class="svg-compare-card__artboard">
              <img
                class="svg-compare-card__image"
                :src="svgCompareDialog.sourceUrl"
                :alt="`${svgCompareDialog.label} source SVG`"
                :style="svgComparePreviewStyle"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Konva from 'konva';
import { markRaw } from 'vue';
import ToolPalette from './ToolPalette.vue';
import { PALETTE_ITEMS, getShapeTypeFromNode } from '../konva/shapeFactoryRegistry';
import { getSvgSourceForShapeType } from '../konva/svgSourceRegistry';
import {
  DEFAULT_FIXED_STROKE_WIDTH_RATIO,
  getFixedStrokeWidthRatio,
  normalizeFixedStrokeWidthRatio,
} from '../konvaSvgFactories/svgShapeFactoryUtils';
import {
  createNodeFromType,
  findEquipmentShape,
  getNodeLabelText,
  getRelativePointerPosition,
  getTransformerTarget,
  normalizeDragRect,
  restoreNodeFromData,
  serializeNode,
  setGroupLabelText,
  wrapShapeWithLabelGroup,
} from '../konva/layoutDrawingHelpers';

const MIN_SHAPE_SIZE = 8;
const MIN_STROKE_WIDTH_RATIO = 0.25;
const MAX_STROKE_WIDTH_RATIO = 4;
const STROKE_WIDTH_RATIO_STEP = 0.05;

export default {
  name: 'LayoutDrawingTool',
  components: {
    ToolPalette,
  },
  emits: ['change', 'node-change'],
  data() {
    return {
      paletteItems: PALETTE_ITEMS,
      selectedTool: null,
      strokeWidthRatio: DEFAULT_FIXED_STROKE_WIDTH_RATIO,
      strokeWidthRatioMin: MIN_STROKE_WIDTH_RATIO,
      strokeWidthRatioMax: MAX_STROKE_WIDTH_RATIO,
      strokeWidthRatioStep: STROKE_WIDTH_RATIO_STEP,
      stage: null,
      layer: null,
      transformer: null,
      selectedNode: null,
      isDrawing: false,
      drawStart: null,
      draftNode: null,
      nodeSequence: 0,
      layoutJson: '[]',
      errorMessage: '',
      ignoreNextClick: false,
      resizeObserver: null,
      cleanupComplete: false,
      stageEventHandlers: null,
      nodeEventHandlers: null,
      labelEditor: {
        visible: false,
        value: '',
        target: null,
        left: 0,
        top: 0,
      },
      svgCompareDialog: {
        visible: false,
        label: '',
        fileName: '',
        sourceUrl: '',
        factoryImageDataUrl: '',
        actualWidth: 0,
        actualHeight: 0,
        displayWidth: 0,
        displayHeight: 0,
      },
    };
  },
  computed: {
    labelEditorStyle() {
      return {
        left: `${this.labelEditor.left}px`,
        top: `${this.labelEditor.top}px`,
      };
    },

    canOpenSvgCompare() {
      const compareTarget = this.getSvgCompareTarget();
      return Boolean(compareTarget && compareTarget.source);
    },

    svgCompareButtonTitle() {
      const compareTarget = this.getSvgCompareTarget();
      if (!compareTarget) return 'Select a drawn shape first';
      if (!compareTarget.source) return 'No source SVG is registered for this shape';
      return `Compare with ${compareTarget.source.fileName}`;
    },

    svgComparePreviewStyle() {
      return {
        width: `${this.svgCompareDialog.displayWidth}px`,
        height: `${this.svgCompareDialog.displayHeight}px`,
      };
    },

    normalizedStrokeWidthRatio() {
      return this.clampStrokeWidthRatio(this.strokeWidthRatio);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initStage();
      this.installResizeHandling();
      this.resizeStage();
      window.addEventListener('keydown', this.handleKeyDown);
    });
  },
  beforeDestroy() {
    this.cleanup();
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    initStage() {
      if (this.stage) return;

      this.stage = markRaw(new Konva.Stage({
        container: this.$refs.stageContainer,
        width: 1,
        height: 1,
      }));

      this.layer = markRaw(new Konva.Layer());
      this.transformer = markRaw(new Konva.Transformer({
        rotateEnabled: true,
        keepRatio: false,
        ignoreStroke: true,
      }));

      this.layer.add(this.transformer);
      this.stage.add(this.layer);

      this.stageEventHandlers = {
        pointerDown: (event) => this.handleStagePointerDown(event),
        pointerMove: (event) => this.handleStagePointerMove(event),
        pointerUp: (event) => this.handleStagePointerUp(event),
        click: (event) => this.handleStageClick(event),
        doubleClick: (event) => this.handleStageDoubleClick(event),
      };

      this.stage.on('mousedown touchstart', this.stageEventHandlers.pointerDown);
      this.stage.on('mousemove touchmove', this.stageEventHandlers.pointerMove);
      this.stage.on('mouseup touchend', this.stageEventHandlers.pointerUp);
      this.stage.on('click tap', this.stageEventHandlers.click);
      this.stage.on('dblclick dbltap', this.stageEventHandlers.doubleClick);

    },

    installResizeHandling() {
      if (!this.$refs.stageShell) return;

      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(this.resizeStage);
        this.resizeObserver.observe(this.$refs.stageShell);
        return;
      }

      window.addEventListener('resize', this.resizeStage);
    },

    resizeStage() {
      if (!this.stage || !this.$refs.stageShell) return;

      const rect = this.$refs.stageShell.getBoundingClientRect();
      const width = Math.max(Math.floor(rect.width), 320);
      const height = Math.max(Math.floor(rect.height), 320);

      this.stage.size({ width, height });
      this.layer.batchDraw();
    },

    handlePaletteSelect(type) {
      this.selectedTool = type;
      this.clearSelection();
      this.closeLabelEditor();
      this.closeSvgCompare();
    },

    setSelectMode() {
      this.selectedTool = null;
      this.closeLabelEditor();
    },

    handleStagePointerDown(event) {
      if (!this.stage || !this.layer || this.isTransformerEventTarget(event.target)) return;
      if (!this.selectedTool || !this.isBlankCanvasTarget(event.target)) return;

      const pointer = this.getPointerPosition(event);
      if (!pointer) return;

      if (event.evt && typeof event.evt.preventDefault === 'function') {
        event.evt.preventDefault();
      }

      this.errorMessage = '';
      this.closeLabelEditor();
      this.clearSelection();
      this.isDrawing = true;
      this.ignoreNextClick = true;
      this.drawStart = pointer;
      this.draftNode = this.createDraftNode(pointer);
      event.cancelBubble = true;
    },

    handleStagePointerMove(event) {
      if (!this.isDrawing || !this.draftNode || !this.layer) return;

      const pointer = this.getPointerPosition(event);
      if (!pointer) return;

      if (event.evt && typeof event.evt.preventDefault === 'function') {
        event.evt.preventDefault();
      }

      this.updateDraftNode(normalizeDragRect(this.drawStart, pointer));
    },

    handleStagePointerUp(event) {
      if (!this.isDrawing) return;

      const pointer = this.getPointerPosition(event) || this.drawStart;
      const rect = normalizeDragRect(this.drawStart, pointer);

      if (event.evt && typeof event.evt.preventDefault === 'function') {
        event.evt.preventDefault();
      }

      this.finishDrawing(rect);
      event.cancelBubble = true;
    },

    handleStageClick(event) {
      if (this.ignoreNextClick) {
        this.ignoreNextClick = false;
        return;
      }

      if (this.isDrawing || this.isTransformerEventTarget(event.target)) return;

      const target = getTransformerTarget(event.target);
      if (target) {
        this.selectNode(target);
        return;
      }

      this.clearSelection();
    },

    handleStageDoubleClick(event) {
      if (this.isDrawing || this.isTransformerEventTarget(event.target)) return;

      const target = getTransformerTarget(event.target);
      if (!target) return;

      this.selectNode(target);
      this.openLabelEditor(target);
    },

    createDraftNode(pointer) {
      const node = markRaw(createNodeFromType(this.selectedTool, {
        id: this.createNodeId(this.selectedTool),
        x: pointer.x,
        y: pointer.y,
        width: 1,
        height: 1,
        draggable: true,
        strokeWidthRatio: this.normalizedStrokeWidthRatio,
      }));

      node.opacity(0.72);
      node.listening(false);
      this.layer.add(node);
      this.layer.batchDraw();
      return node;
    },

    updateDraftNode(rect) {
      this.draftNode.setAttrs({
        x: rect.x,
        y: rect.y,
        width: Math.max(rect.width, 1),
        height: Math.max(rect.height, 1),
      });
      this.layer.batchDraw();
    },

    finishDrawing(rect) {
      const node = this.draftNode;
      this.isDrawing = false;
      this.drawStart = null;
      this.draftNode = null;

      if (!node) return;

      if (rect.width < MIN_SHAPE_SIZE || rect.height < MIN_SHAPE_SIZE) {
        node.destroy();
        this.layer.batchDraw();
        return;
      }

      node.setAttrs({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        opacity: 1,
        listening: true,
        draggable: true,
      });

      this.registerEquipmentNode(node);
      this.selectNode(node);
      this.saveLayout();
    },

    registerEquipmentNode(node) {
      if (!node) return;

      if (!this.nodeEventHandlers) {
        this.nodeEventHandlers = {
          interactionStart: (event) => this.handleNodeInteractionStart(event),
          interactionEnd: (event) => this.handleNodeInteractionEnd(event),
        };
      }

      node.off('dragstart transformstart dragend transformend');
      node.draggable(true);
      node.on('dragstart transformstart', this.nodeEventHandlers.interactionStart);
      node.on('dragend transformend', this.nodeEventHandlers.interactionEnd);
    },

    handleNodeInteractionStart() {
      this.closeLabelEditor();
    },

    handleNodeInteractionEnd(event) {
      const target = getTransformerTarget(event.target) || this.selectedNode;
      if (target) {
        this.selectedNode = markRaw(target);
        this.attachTransformer(target);
        this.$emit('node-change', serializeNode(target));
      }
      this.saveLayout();
    },

    selectNode(node) {
      const target = getTransformerTarget(node) || node;
      if (!target) return;

      this.selectedNode = markRaw(target);
      this.attachTransformer(target);
    },

    attachTransformer(node) {
      if (!this.transformer || !this.layer) return;

      this.transformer.nodes(node ? [node] : []);
      this.transformer.moveToTop();
      this.layer.batchDraw();
    },

    clearSelection() {
      this.selectedNode = null;
      this.attachTransformer(null);
    },

    deleteSelectedNode() {
      if (!this.selectedNode || !this.layer) return;

      this.closeLabelEditor();
      this.closeSvgCompare();
      this.selectedNode.destroy();
      this.clearSelection();
      this.layer.batchDraw();
      this.saveLayout();
    },

    clearAllNodes() {
      if (!this.layer) return;

      this.closeLabelEditor();
      this.closeSvgCompare();
      this.clearSelection();
      this.destroyEquipmentNodes();
      this.transformer.moveToTop();
      this.layer.batchDraw();
      this.saveLayout();
    },

    handleKeyDown(event) {
      if (this.isEditableElement(event.target)) return;
      if (event.key === 'Escape' && this.svgCompareDialog.visible) {
        event.preventDefault();
        this.closeSvgCompare();
        return;
      }

      if (event.key !== 'Delete' && event.key !== 'Backspace') return;

      if (this.selectedNode) {
        event.preventDefault();
        this.deleteSelectedNode();
      }
    },

    openLabelEditor(node) {
      const labelText = getNodeLabelText(node);
      const position = this.getLabelEditorPosition();

      this.labelEditor = {
        visible: true,
        value: labelText,
        target: markRaw(node),
        left: position.left,
        top: position.top,
      };

      this.$nextTick(() => {
        if (this.$refs.labelInput) {
          this.$refs.labelInput.focus();
          this.$refs.labelInput.select();
        }
      });
    },

    applyLabelEditor() {
      const target = this.labelEditor.target;
      const labelText = this.labelEditor.value.trim();
      if (!target || !labelText) {
        this.closeLabelEditor();
        return;
      }

      let nextTarget = target;
      if (target.getClassName && target.getClassName() === 'Group') {
        setGroupLabelText(target, labelText);
      } else {
        const group = wrapShapeWithLabelGroup(target, labelText);
        if (group) {
          nextTarget = markRaw(group);
          this.registerEquipmentNode(group);
        }
      }

      this.closeLabelEditor();
      this.selectNode(nextTarget);
      this.saveLayout();
    },

    closeLabelEditor() {
      this.labelEditor = {
        visible: false,
        value: '',
        target: null,
        left: 0,
        top: 0,
      };
    },

    getLabelEditorPosition() {
      const fallback = { left: 16, top: 16 };
      if (!this.stage || !this.$refs.stageShell) return fallback;

      const pointer = this.stage.getPointerPosition();
      if (!pointer) return fallback;

      const shellRect = this.$refs.stageShell.getBoundingClientRect();
      const stageRect = this.stage.container().getBoundingClientRect();
      const left = pointer.x + stageRect.left - shellRect.left + 12;
      const top = pointer.y + stageRect.top - shellRect.top + 12;

      return {
        left: Math.max(8, Math.min(left, Math.max(shellRect.width - 264, 8))),
        top: Math.max(8, Math.min(top, Math.max(shellRect.height - 118, 8))),
      };
    },

    saveLayout() {
      const data = this.serializeLayout();
      this.layoutJson = JSON.stringify(data, null, 2);
      this.errorMessage = '';
      this.$emit('change', data);
      return data;
    },

    serializeLayout() {
      if (!this.layer) return [];

      return this.getTopLevelEquipmentNodes()
        .map((node) => serializeNode(node))
        .filter(Boolean);
    },

    restoreLayoutFromJson() {
      try {
        const payload = this.layoutJson.trim() ? JSON.parse(this.layoutJson) : [];
        this.restoreLayout(this.normalizeLayoutPayload(payload));
      } catch (error) {
        this.errorMessage = error && error.message ? error.message : 'Invalid layout JSON';
      }
    },

    restoreLayout(items) {
      if (!this.layer) return;

      const restoredNodes = items.map((item) => markRaw(restoreNodeFromData(item)));

      this.closeLabelEditor();
      this.closeSvgCompare();
      this.clearSelection();
      this.destroyEquipmentNodes();

      restoredNodes.forEach((node) => {
        this.layer.add(node);
        this.registerEquipmentNode(node);
      });

      this.transformer.moveToTop();
      this.layer.batchDraw();
      this.saveLayout();
    },

    normalizeLayoutPayload(payload) {
      if (Array.isArray(payload)) return payload;
      if (payload && Array.isArray(payload.items)) return payload.items;
      if (payload && Array.isArray(payload.nodes)) return payload.nodes;
      if (payload && Array.isArray(payload.layout)) return payload.layout;
      throw new Error('Layout JSON must be an array or contain items, nodes, or layout.');
    },

    openSvgCompare() {
      const compareTarget = this.getSvgCompareTarget();
      if (!compareTarget) {
        this.errorMessage = 'Select a drawn shape first.';
        return;
      }

      if (!compareTarget.source) {
        this.errorMessage = 'No source SVG is registered for this shape.';
        return;
      }

      try {
        const dimensions = this.getSvgCompareDimensions(compareTarget.shape);
        const factoryImageDataUrl = this.createFactoryPreviewDataUrl(
          compareTarget.type,
          dimensions.renderWidth,
          dimensions.renderHeight,
          getFixedStrokeWidthRatio(compareTarget.shape)
        );

        this.closeLabelEditor();
        this.errorMessage = '';
        this.svgCompareDialog = {
          visible: true,
          label: compareTarget.source.label,
          fileName: compareTarget.source.fileName,
          sourceUrl: compareTarget.source.url,
          factoryImageDataUrl,
          actualWidth: dimensions.actualWidth,
          actualHeight: dimensions.actualHeight,
          displayWidth: dimensions.displayWidth,
          displayHeight: dimensions.displayHeight,
        };
      } catch (error) {
        this.errorMessage = error && error.message
          ? error.message
          : 'Unable to render SVG comparison.';
      }
    },

    closeSvgCompare() {
      if (!this.svgCompareDialog.visible) return;

      this.svgCompareDialog = {
        visible: false,
        label: '',
        fileName: '',
        sourceUrl: '',
        factoryImageDataUrl: '',
        actualWidth: 0,
        actualHeight: 0,
        displayWidth: 0,
        displayHeight: 0,
      };
    },

    getSvgCompareTarget() {
      if (!this.selectedNode) return null;

      const target = getTransformerTarget(this.selectedNode) || this.selectedNode;
      const shape = findEquipmentShape(target) || target;
      const type = getShapeTypeFromNode(shape) || getShapeTypeFromNode(target);

      if (!type) return null;

      return {
        target,
        shape,
        type,
        source: getSvgSourceForShapeType(type),
      };
    },

    getSvgCompareDimensions(shape) {
      const baseWidth = this.readNodeMethod(shape, 'width') || 1;
      const baseHeight = this.readNodeMethod(shape, 'height') || 1;
      const scale = shape && typeof shape.getAbsoluteScale === 'function'
        ? shape.getAbsoluteScale()
        : {
          x: this.readNodeMethod(shape, 'scaleX') || 1,
          y: this.readNodeMethod(shape, 'scaleY') || 1,
        };
      const actualWidth = Math.max(Math.round(baseWidth * Math.abs(scale.x || 1)), 1);
      const actualHeight = Math.max(Math.round(baseHeight * Math.abs(scale.y || 1)), 1);
      const renderScale = Math.min(1, 1200 / Math.max(actualWidth, actualHeight));
      const renderWidth = Math.max(Math.round(actualWidth * renderScale), 1);
      const renderHeight = Math.max(Math.round(actualHeight * renderScale), 1);
      const displayScale = Math.min(1, 520 / renderWidth, 320 / renderHeight);

      return {
        actualWidth,
        actualHeight,
        renderWidth,
        renderHeight,
        displayWidth: Math.max(Math.round(renderWidth * displayScale), 1),
        displayHeight: Math.max(Math.round(renderHeight * displayScale), 1),
      };
    },

    createFactoryPreviewDataUrl(type, width, height, strokeWidthRatio = this.normalizedStrokeWidthRatio) {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-10000px';
      container.style.top = '-10000px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);

      const stage = new Konva.Stage({
        container,
        width,
        height,
      });
      const layer = new Konva.Layer();
      const previewNode = createNodeFromType(type, {
        id: `svg-compare-${type}`,
        x: 0,
        y: 0,
        width,
        height,
        draggable: false,
        strokeWidthRatio,
      });

      try {
        previewNode.listening(false);
        layer.add(previewNode);
        stage.add(layer);
        layer.draw();
        return stage.toDataURL({ pixelRatio: 2 });
      } finally {
        stage.destroy();
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }
    },

    destroyEquipmentNodes() {
      this.getTopLevelEquipmentNodes().forEach((node) => {
        node.destroy();
      });
    },

    getTopLevelEquipmentNodes() {
      if (!this.layer) return [];

      return this.toNodeArray(this.layer.getChildren()).filter((node) => (
        node !== this.transformer && Boolean(getTransformerTarget(node))
      ));
    },

    isTransformerEventTarget(node) {
      let current = node;
      while (current) {
        if (current === this.transformer) return true;
        current = current.getParent && current.getParent();
      }
      return false;
    },

    isBlankCanvasTarget(node) {
      return node === this.stage || node === this.layer;
    },

    getPointerPosition(event) {
      const pointer = getRelativePointerPosition(this.layer);
      if (pointer || !event || !event.evt || !this.stage || !this.layer) return pointer;

      const sourceEvent = event.evt.touches && event.evt.touches[0]
        ? event.evt.touches[0]
        : event.evt.changedTouches && event.evt.changedTouches[0]
          ? event.evt.changedTouches[0]
          : event.evt;

      if (typeof sourceEvent.clientX !== 'number' || typeof sourceEvent.clientY !== 'number') {
        return null;
      }

      const stageRect = this.stage.container().getBoundingClientRect();
      const stagePointer = {
        x: sourceEvent.clientX - stageRect.left,
        y: sourceEvent.clientY - stageRect.top,
      };
      const transform = this.layer.getAbsoluteTransform().copy();
      transform.invert();
      return transform.point(stagePointer);
    },

    isEditableElement(element) {
      if (!element) return false;

      const tagName = element.tagName ? element.tagName.toLowerCase() : '';
      return tagName === 'input'
        || tagName === 'textarea'
        || tagName === 'select'
        || element.isContentEditable;
    },

    toNodeArray(collection) {
      if (!collection) return [];
      if (typeof collection.toArray === 'function') return collection.toArray();
      return Array.from(collection);
    },

    readNodeMethod(node, methodName) {
      return node && typeof node[methodName] === 'function'
        ? node[methodName]()
        : undefined;
    },

    clampStrokeWidthRatio(value) {
      const ratio = normalizeFixedStrokeWidthRatio(value);
      return Math.min(Math.max(ratio, MIN_STROKE_WIDTH_RATIO), MAX_STROKE_WIDTH_RATIO);
    },

    normalizeStrokeWidthRatioInput() {
      this.strokeWidthRatio = this.normalizedStrokeWidthRatio;
    },

    createNodeId(type) {
      this.nodeSequence += 1;
      return `${type}-${Date.now()}-${this.nodeSequence}`;
    },

    cleanup() {
      if (this.cleanupComplete) return;
      this.cleanupComplete = true;

      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('resize', this.resizeStage);

      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }

      if (this.stage) {
        this.stage.off('mousedown touchstart');
        this.stage.off('mousemove touchmove');
        this.stage.off('mouseup touchend');
        this.stage.off('click tap');
        this.stage.off('dblclick dbltap');
        this.stage.destroy();
      }

      this.stage = null;
      this.layer = null;
      this.transformer = null;
      this.selectedNode = null;
      this.draftNode = null;
      this.stageEventHandlers = null;
      this.nodeEventHandlers = null;

    },
  },
};
</script>

<style scoped>
.layout-drawing-tool {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 640px;
  overflow: hidden;
  color: #111827;
  background: #ffffff;
  font-family: Arial, sans-serif;
}

.layout-drawing-tool__workspace {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
}

.layout-drawing-tool__toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 48px;
  padding: 8px 12px;
  border-bottom: 1px solid #d7dde7;
  background: #ffffff;
}

.toolbar-button {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #c8d0dc;
  border-radius: 6px;
  background: #ffffff;
  color: #1f2937;
  font: inherit;
  cursor: pointer;
}

.toolbar-button:hover:not(:disabled) {
  background: #f3f6fa;
}

.toolbar-button--active {
  border-color: #2563eb;
  background: #e8f0ff;
  color: #0f3f98;
}

.toolbar-button:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}

.stroke-ratio-control {
  display: inline-grid;
  grid-template-columns: auto 112px 64px;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 8px;
  border: 1px solid #c8d0dc;
  border-radius: 6px;
  background: #fbfcfe;
  color: #1f2937;
  font-size: 13px;
  white-space: nowrap;
}

.stroke-ratio-control__label {
  font-weight: 700;
}

.stroke-ratio-control__range {
  width: 112px;
  margin: 0;
}

.stroke-ratio-control__input {
  width: 64px;
  height: 24px;
  padding: 0 6px;
  border: 1px solid #c8d0dc;
  border-radius: 5px;
  background: #ffffff;
  color: #111827;
  font: inherit;
}

.stroke-ratio-control__input:focus {
  border-color: #2563eb;
  outline: none;
}

.toolbar-error {
  overflow: hidden;
  color: #b42318;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-drawing-tool__stage-shell {
  position: relative;
  flex: 1;
  min-height: 440px;
  overflow: hidden;
  background: #eef2f7;
}

.layout-drawing-tool__stage {
  width: 100%;
  height: 100%;
}

.layout-drawing-tool__json {
  width: 100%;
  height: 168px;
  min-height: 168px;
  padding: 10px 12px;
  border: 0;
  border-top: 1px solid #d7dde7;
  resize: vertical;
  background: #fbfcfe;
  color: #111827;
  font: 12px/1.45 Consolas, Monaco, monospace;
  outline: none;
}

.label-editor {
  position: absolute;
  z-index: 10;
  width: 248px;
  padding: 10px;
  border: 1px solid #c8d0dc;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
}

.label-editor__input {
  width: 100%;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #b8c2d0;
  border-radius: 5px;
  color: #111827;
  font: inherit;
  outline: none;
}

.label-editor__input:focus {
  border-color: #2563eb;
}

.label-editor__actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 8px;
}

.label-editor__button {
  height: 28px;
  padding: 0 10px;
  border: 1px solid #c8d0dc;
  border-radius: 5px;
  background: #ffffff;
  color: #1f2937;
  font: inherit;
  cursor: pointer;
}

.label-editor__button:hover {
  background: #f3f6fa;
}

.svg-compare-modal {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.42);
}

.svg-compare-modal__panel {
  display: flex;
  width: min(1120px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #c8d0dc;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.28);
}

.svg-compare-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border-bottom: 1px solid #d7dde7;
  background: #fbfcfe;
}

.svg-compare-modal__title {
  margin: 0;
  color: #111827;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.25;
}

.svg-compare-modal__meta {
  margin-top: 4px;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.35;
}

.svg-compare-modal__close {
  display: inline-flex;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid #c8d0dc;
  border-radius: 6px;
  background: #ffffff;
  color: #1f2937;
  font: inherit;
  cursor: pointer;
}

.svg-compare-modal__close:hover {
  background: #f3f6fa;
}

.svg-compare-modal__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  min-height: 0;
  padding: 16px;
  overflow: auto;
}

.svg-compare-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #d7dde7;
  border-radius: 8px;
  background: #ffffff;
}

.svg-compare-card__title {
  margin: 0;
  padding: 10px 12px;
  border-bottom: 1px solid #d7dde7;
  color: #1f2937;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
}

.svg-compare-card__artboard {
  display: flex;
  min-height: 360px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: auto;
  background-color: #f8fafc;
  background-image:
    linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
    linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
  background-position: 0 0, 0 8px, 8px -8px, -8px 0;
  background-size: 16px 16px;
}

.svg-compare-card__image {
  display: block;
  max-width: 100%;
  object-fit: contain;
}

@media (max-width: 860px) {
  .svg-compare-modal {
    padding: 12px;
  }

  .svg-compare-modal__grid {
    grid-template-columns: 1fr;
  }

  .svg-compare-card__artboard {
    min-height: 260px;
  }
}
</style>
