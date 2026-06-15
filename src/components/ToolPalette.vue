<template>
  <aside class="tool-palette">
    <button
      v-for="item in items"
      :key="item.type"
      type="button"
      class="tool-palette__item"
      :class="{ 'tool-palette__item--active': item.type === selectedType }"
      @click="selectTool(item.type)"
    >
      <span class="tool-palette__swatch" aria-hidden="true"></span>
      <span class="tool-palette__label">{{ item.label }}</span>
    </button>
  </aside>
</template>

<script>
export default {
  name: 'ToolPalette',
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedType: {
      type: String,
      default: null,
    },
  },
  emits: ['select'],
  methods: {
    selectTool(type) {
      this.$emit('select', type);
    },
  },
};
</script>

<style scoped>
.tool-palette {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 184px;
  min-width: 184px;
  padding: 12px;
  overflow-y: auto;
  border-right: 1px solid #d7dde7;
  background: #f7f9fc;
}

.tool-palette__item {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 7px 9px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: #1f2937;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.tool-palette__item:hover {
  background: #eef3f9;
}

.tool-palette__item--active {
  border-color: #2563eb;
  background: #e8f0ff;
  color: #0f3f98;
}

.tool-palette__swatch {
  width: 14px;
  height: 14px;
  border: 1px solid #6b7280;
  border-radius: 3px;
  background: #fff;
  box-shadow: inset 0 0 0 2px rgba(31, 41, 55, 0.08);
}

.tool-palette__item--active .tool-palette__swatch {
  border-color: #2563eb;
  background: #dbeafe;
}

.tool-palette__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
