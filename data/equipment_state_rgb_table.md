# 설비 State별 RGB 테이블

기존 Status/RGB 값은 변경하지 않고, State 컬럼만 Configure State Color 화면의 `OverviewState -` 뒤 값 기준으로 수정했습니다.
새 화면에 표시되지 않는 기존 `Default`, `Connected` 행은 매핑 대상이 없어 기존 State 값을 유지했습니다.

| 설비타입 | State | Status | R | G | B |
|---|---|---:|---:|---:|---:|
| 저장설비 | Default | Status02 | 240 | 240 | 240 |
| 저장설비 | Connected | Status05 | 31 | 215 | 102 |
| 저장설비 | UP | Status08 | 66 | 138 | 255 |
| 저장설비 | DISCONNECTED | Status13 | 254 | 105 | 105 |
| 저장설비 | OUTOFSERVICE,PM | Status13 | 254 | 105 | 105 |
| 저장설비 | OFFLINE | Status13 | 254 | 105 | 105 |
| 저장설비 | DOWN | Status13 | 254 | 105 | 105 |
| 저장설비 | NOTAUTO | Status12 | 251 | 227 | 5 |
| 저장설비 | ALARM | Status11 | 255 | 185 | 75 |
| 저장설비 | FULL | Status14 | 255 | 190 | 190 |
| 저장설비 | BANNED | Status17 | 176 | 176 | 176 |
| 프로세스 설비 | Default | Status02 | 240 | 240 | 240 |
| 프로세스 설비 | Connected | Status05 | 31 | 215 | 102 |
| 프로세스 설비 | UP | Status08 | 66 | 138 | 255 |
| 프로세스 설비 | DISCONNECTED | Status13 | 254 | 105 | 105 |
| 프로세스 설비 | NOTINSERVICE | Status13 | 254 | 105 | 105 |
| 프로세스 설비 | NOTONLINE | Status13 | 254 | 105 | 105 |
| 프로세스 설비 | DOWN | Status13 | 254 | 105 | 105 |
| 프로세스 설비 | BANNED | Status17 | 176 | 176 | 176 |
| 반송 설비 | Default | Status02 | 240 | 240 | 240 |
| 반송 설비 | Connected | Status05 | 31 | 215 | 102 |
| 반송 설비 | UP | Status08 | 66 | 138 | 255 |
| 반송 설비 | DISCONNECTED | Status13 | 254 | 105 | 105 |
| 반송 설비 | OUTOFSERVICE,PM | Status13 | 254 | 105 | 105 |
| 반송 설비 | OFFLINE | Status13 | 254 | 105 | 105 |
| 반송 설비 | DOWN | Status13 | 254 | 105 | 105 |
| 반송 설비 | NOTAUTO | Status12 | 251 | 227 | 5 |
| 반송 설비 | ALARM | Status11 | 255 | 185 | 75 |
| 반송 설비 | BANNED | Status17 | 176 | 176 | 176 |
| 포트 | Default | Status02 | 240 | 240 | 240 |
| 포트 | FULL_RESERVED | Status05 | 31 | 215 | 102 |
| 포트 | FULL | Status08 | 66 | 138 | 255 |
| 포트 | OUTOFSERVICE | Status13 | 254 | 105 | 105 |
| 포트 | DOWN | Status13 | 254 | 105 | 105 |
| 포트 | EMPTY_RESERVED | Status12 | 251 | 227 | 5 |
| 포트 | PORT_ALARMSET | Status11 | 255 | 185 | 75 |
| 포트 | PORT_UNKCARSET | Status14 | 255 | 190 | 190 |
| 포트 | EMPTY | Status16 | 208 | 208 | 208 |
| 포트 | BANNED | Status17 | 176 | 176 | 176 |
| 포트 | FULL_ACCESS_MANUAL | Status10 | 161 | 133 | 250 |
| 포트 | EMPTY_ACCESS_MANUAL | Status09 | 229 | 214 | 255 |
| Crane | Default | Status02 | 240 | 240 | 240 |
| Crane | FULL_ACTIVE | Status05 | 31 | 215 | 102 |
| Crane | FULL_IDLE | Status08 | 66 | 138 | 255 |
| Crane | OUTOFSERVICE | Status13 | 254 | 105 | 105 |
| Crane | DOWN | Status13 | 254 | 105 | 105 |
| Crane | EMPTY_ACTIVE | Status12 | 251 | 227 | 5 |
| Crane | EMPTY_IDLE | Status16 | 208 | 208 | 208 |
| Vehicle | Default | Status02 | 240 | 240 | 240 |
| Vehicle | ASSIGNED | Status05 | 31 | 215 | 102 |
| Vehicle | INSTALLED | Status07 | 96 | 178 | 255 |
| Vehicle | OUTOFSERVICE | Status13 | 254 | 105 | 105 |
| Vehicle | CHARGING | Status09 | 229 | 214 | 255 |
| Vehicle | CHARGED | Status10 | 161 | 133 | 250 |
| Vehicle | VEHICLE_ALARMSET | Status11 | 255 | 185 | 75 |
| Vehicle | REMOVED | Status16 | 208 | 208 | 208 |
| Vehicle | NOTASSIGNED | Status17 | 176 | 176 | 176 |
