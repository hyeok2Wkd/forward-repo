const EQUIPMENT_TYPE_MAP = Object.freeze({
  '저장설비': 'stocker',
  '프로세스 설비': 'process',
  '포트': 'port',
  Crane: 'crane',
  Vehicle: 'vehicle1',
});

const SKIPPED_EQUIPMENT_TYPES = new Set(['반송 설비']);

export function parseEquipmentStateRgbMarkdown(markdown = '') {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !line.includes('---'))
    .map(parseMarkdownTableRow)
    .filter((columns) => columns.length >= 6)
    .filter((columns) => columns[0] !== '설비타입')
    .map(([equipmentType, state, status, red, green, blue]) => ({
      equipmentType,
      state,
      status,
      red: normalizeRgbValue(red),
      green: normalizeRgbValue(green),
      blue: normalizeRgbValue(blue),
    }))
    .filter((item) => (
      item.equipmentType
      && item.state
      && item.status
      && item.red != null
      && item.green != null
      && item.blue != null
    ));
}

export function createMappedEquipmentStateItems(markdown = '') {
  return parseEquipmentStateRgbMarkdown(markdown)
    .filter((item) => !SKIPPED_EQUIPMENT_TYPES.has(item.equipmentType))
    .map((item) => ({
      ...item,
      shapeType: EQUIPMENT_TYPE_MAP[item.equipmentType],
      fillColor: rgbToHex(item.red, item.green, item.blue),
    }))
    .filter((item) => Boolean(item.shapeType));
}

function parseMarkdownTableRow(line) {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((column) => column.trim());
}

function normalizeRgbValue(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return null;
  return Math.min(Math.max(Math.round(numericValue), 0), 255);
}

function rgbToHex(red, green, blue) {
  return `#${[red, green, blue]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}`;
}
