# Konva SVG Shape Factories - constant stroke / no name / no transform fix

This package renders the provided SVG files as single `Konva.Shape` nodes.

## What this version does

- Creates **single Konva.Shape** objects, not Groups.
- Does **not** set Konva node `name`.
- Uses custom attrs such as `shapeType` and `equipmentType` for type identification.
- Does **not** include drag/transform correction helpers.
- Does **not** modify x/y/width/height/scale during drag or transform.
- Keeps SVG `stroke` drawing visually constant by reading the current canvas transform.
- Edge-aligns SVG rect strokes so their outer edge stays on the original SVG boundary.

## Important limitation

If a line/border in the original SVG is not a real SVG `stroke`, but a filled `path`, it is rendered as a filled shape and will scale like a filled shape. Only actual SVG strokes can be kept screen-constant automatically.

## Usage

```js
import { createStockerShape } from './konva_svg_factories_constant_stroke_no_name';

const node = createStockerShape({
  id: 'stocker-1',
  x: 100,
  y: 100,
  width: 300,
  height: 150,
  draggable: true,
});

layer.add(node);
layer.batchDraw();
```

When a label/equipment name is added, you can wrap this Shape with your existing `Konva.Text`/Group logic.
