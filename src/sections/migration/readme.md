ScrollForMigration
        │
        ▼
Narrative Progress
        │
        ▼
──────── Migration ────────
        │
        ▼
 Lookup Narrative Timeline
        │
        ▼
Derive Animation Progress
        │
        ▼
Lookup Animation Timeline
        │
        ▼
Derive Annotation Progress（仅 Inspection）
        │
        ▼
Render





Progress 是唯一的真值来源（Single Source of Truth）；State 完全由 Progress 推导，不保存、不缓存；Renderer 不解释 Progress，只消费 State，并查询自己所需的数据完成渲染。





Narrative Progress
        │
        ▼
 Lookup Narrative Timeline
        │
        ▼
 Narrative State
        │
        ├──────────────┐
        │              │
        ▼              ▼
 Overview         Animation
                       │
                       ▼
          Derive Animation Progress
                       │
                       ▼
         Lookup Animation Timeline
                       │
                       ▼
               Animation State
               (Travel / Inspection)
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
   Travel Render                 Inspection Render
        │                             │
        ▼                             ▼
 findSample()                 deriveAnnotationProgress()
 findTrack()                  findAnnotation()
 findCamera()



 // progress state machine

 Scroll
    │
    ▼
Narrative Progress
    │
    ▼
Progress State Engine
    │
    ▼
Narrative State
Animation Progress
Animation State
Annotation Progress



// renderer engine

Animation State
        │
        ├──────────────┐
        ▼              ▼
   Travel         Inspection
        │              │
        ▼              ▼
Renderer        Renderer
        │              │
        ▼              ▼
Render Data     Render Data
        │              │
        └──────┬───────┘
               ▼
         Map Update



// overview加入local progress计算

Narrative Progress
        │
        ▼
Narrative State
        │
        ├──────────────────────┐
        │                      │
        ▼                      ▼
Overview Progress       Animation Progress
        │                      │
        ▼                      ▼
Overview State          Animation State
                               │
                               ▼
                     Annotation Progress
                               │
                               ▼
                     Annotation State


init()

│
├── loadMigrationDataset()
│
├── createMainScene()
│
├── createNavigationScene()
│
└── createAnnotationScene()

setProgress()

│
├── renderMainScene()
│
├── renderNavigationScene()
│
└── renderAnnotationScene()