# Konva SVG Factory Files - edge-fixed version

These files convert the uploaded SVG assets into single `Konva.Shape` factories.
They are intended to replace `Konva.Image` usage while preserving the existing app meaning:

- single node = equipment without label/name
- `Konva.Group` = equipment with label/name attached

## Main change in this version

The previous generated factories kept stroke thickness stable, but SVG border rects such as:

```svg
<rect x="0.5" y="0.5" width="29" height="29" stroke-width="1" />
```

could visually drift inward when resized.

This version detects those outer-border rects and dynamically repositions the stroke centerline so the border's **outer edge remains attached to the shape boundary**, while the stroke thickness stays visually stable.

## Port check

`port.svg` contains an internal X line:

```svg
<path opacity="0.3" d="M1 29L29 1M29 29L1 1" stroke="black" stroke-opacity="0.5" stroke-width="0.5"/>
```

`portFactory.js` includes that same X path in `DRAW_COMMANDS`, so the internal X mark is preserved.

## Usage example

```js
import { createPortShape, updatePortShapeByDrag } from '@/konva_svg_factories';

const node = createPortShape({
  id: `port-${Date.now()}`,
  x: 100,
  y: 100,
  width: 300,
  height: 300,
  draggable: true,
});

layer.add(node);
layer.batchDraw();
```

During drag:

```js
updatePortShapeByDrag(node, startPoint, currentPoint);
layer.batchDraw();
```

## Notes

- All factories return a single `Konva.Shape`, not a `Konva.Group`.
- `Path2D` is used for SVG path rendering. This is supported by modern browsers.
- `filter`, `mask`, and complex SVG effects are approximated. Basic fill/path/stroke geometry is preserved.
