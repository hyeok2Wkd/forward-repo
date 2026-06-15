# Konva SVG Shape Factories - Shape Only

이 패키지는 제공된 SVG들을 `Konva.Image`가 아니라 **단일 `Konva.Shape`** 로 그리기 위한 JS factory 모음입니다.

이번 버전의 목표는 단 하나입니다.

```text
SVG를 Konva.Shape로 표시한다.
```

포함하지 않은 것:

```text
- stroke 고정 보정
- edge 보정
- transform 보정
- Group 대응 보정
- name 설정
- cache 처리
```

사용 예시:

```js
import { createStockerShape } from './konva_svg_factories_shape_only';

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

드래그 생성용 helper도 포함되어 있지만, transform 이벤트 처리나 scale reset 같은 로직은 포함하지 않습니다.

```js
const node = createStockerShapeFromDrag({ id, start, current });
updateStockerShapeByDrag(node, start, current);
```

주의:

- SVG의 `mask`, `clipPath`, `filter`는 완전한 SVG 렌더러 수준으로 재현하지 않습니다.
- 전체 viewBox 기준 clipping은 적용합니다.
- `filter` drop shadow 등은 무시됩니다.
- 이 버전은 stroke를 고정하지 않습니다. Konva transform에 따라 자연스럽게 scale됩니다.
