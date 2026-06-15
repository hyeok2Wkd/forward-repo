# Konva SVG factories

This folder was auto-generated from the SVG files in `konva-svg.zip`.

## What these files do

- Each `*Factory.js` creates a **single `Konva.Shape`**.
- It does **not** create a `Konva.Group`, so your existing rule can remain:
  - single node = no equipment label yet
  - Group = equipment shape + label
- Actual SVG primitives are drawn in `sceneFunc`.
- Strokes are compensated by the current scale so they do not become excessively thick when the shape is resized.

## Basic usage

```js
import { createStockerShape, updateStockerShapeByDrag } from '@/konva/svgFactories';

const node = createStockerShape({
  id: `stocker-${Date.now()}`,
  x: 100,
  y: 100,
  width: 300,
  height: 150,
  draggable: true,
});

layer.add(node);
layer.batchDraw();
```

During drawing:

```js
updateStockerShapeByDrag(node, startPoint, currentPoint);
layer.batchDraw();
```

## Notes

Some original SVGs include `mask`, `clipPath`, and `filter` from Figma exports. The generator approximates this by clipping to the original viewBox. Drop shadows / filters are not fully reproduced.

The generated drawing uses `Path2D` for SVG path data. This is supported in modern browsers. If your target environment lacks `Path2D`, path elements will not render.
