# Konva SVG Factories - no transform correction version

이 버전은 SVG들을 `Konva.Image` 대신 **단일 `Konva.Shape`**로 생성하기 위한 factory 모음입니다.

## 핵심 정책

- `Konva.Group`을 만들지 않습니다.
- 기존 프로젝트의 `Group = 설비명/Label 등록됨` 의미를 유지할 수 있습니다.
- Transformer/transform 시점의 좌표, scale, width, height 보정 로직을 넣지 않았습니다.
- stroke 두께 역보정, edge-aligned rect 보정, `getAbsoluteScale()` 기반 보정을 모두 제거했습니다.
- Konva가 변경하는 `x`, `y`, `width`, `height`, `scaleX`, `scaleY`, `rotation` 값을 그대로 사용합니다.

## 사용 예시

```js
import { createStockerShape, updateStockerShapeByDrag } from './konva_svg_factories_no_transform_fix';

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

드래그 중 크기 변경:

```js
updateStockerShapeByDrag(node, startPoint, currentPoint);
layer.batchDraw();
```

## 주의

이 버전은 stroke 두께를 고정하지 않습니다. Transform/resize 시 Konva/canvas transform에 따라 SVG 원본처럼 선 두께도 같이 커질 수 있습니다.
