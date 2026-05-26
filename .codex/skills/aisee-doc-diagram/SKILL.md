---
name: aisee-doc-diagram
description: Create and maintain source-first diagrams for the Aisee VuePress documentation site. Use when drawing, fixing, exporting, or embedding Excalidraw diagrams, SVG diagrams, Vue Flow diagrams, DiagramFigure components, learning-path visuals, Agent workflow diagrams, architecture diagrams, or any doc visual where layout, fonts, arrows, page overflow, or source-to-output consistency matters.
---

# aisee-doc-diagram

## Overview

Use this skill to create documentation diagrams that are logically clear, maintainable from source files, and safe to embed in the VuePress / Plume site without overflowing the page layout.

## Workflow

1. Read the target page and existing diagram files.
2. Write or update a logic document under `docs/assets/diagram-logic/`.
3. Choose the layout from content, not from habit:
   - `fit` for most diagrams.
   - `wide` only for genuinely wide architecture, topology, or swimlane diagrams.
   - `compact` for small concept diagrams.
4. Modify the diagram source first:
   - `.excalidraw` for static Excalidraw diagrams.
   - Vue component source for interactive diagrams.
   - Do not patch only the exported SVG unless the source is unavailable and the user accepts that limitation.
5. Export `.excalidraw` to SVG when applicable.
6. Validate visually:
   - Render SVG to PNG with `rsvg-convert`.
   - Use browser screenshot for the VuePress page when layout or component behavior changed.
7. Run the smallest relevant build or test command.

## Logic Document

Before drawing, capture:

- Expression goal.
- Reader context.
- Diagram type.
- Nodes and node roles.
- Edges and labels.
- Main reading path.
- Branches and loops.
- Details intentionally left out.
- Asset or component choice.

If the logic is unclear, pause drawing and clarify the flow first.

## Layout Rules

- Do not default every diagram to horizontal layout.
- Use horizontal layout for short linear flows or wide architecture views.
- Use vertical, folded, or grouped layout for flows with many steps, decisions, or loops.
- Use matrices or cards for comparisons and responsibility boundaries instead of forcing a flowchart.
- Split a dense diagram into multiple smaller diagrams when it improves reading order.
- Ensure the diagram does not overlap the right-side TOC or create page-level horizontal overflow.

## Excalidraw Export

Treat `.excalidraw` as the source file and SVG as a generated display asset.

Use:

```bash
pnpm dlx excalidraw-brute-export-cli \
  -i site/.vuepress/public/diagrams/<section>/<name>.excalidraw \
  -o site/.vuepress/public/diagrams/<section>/<name>.svg \
  -f svg -s 1 -b true -e true \
  --timeout 60000 --action-sleep-time 300
```

If Playwright Firefox is missing:

```bash
pnpm dlx playwright@1.60.0 install firefox
```

Do not rely on macOS Quick Look thumbnails as the only visual check.

## Font Rules

- Default Excalidraw text font for this docs site: `fontFamily: 2`.
- Also set `appState.currentItemFontFamily: 2`.
- After changing fonts, recenter independent text elements in the `.excalidraw` source.
- Do not fix font mismatches by editing only the exported SVG.

## DiagramFigure Rules

- Default mode is `fit`.
- Use `mode="wide"` only when the diagram must be read horizontally and can tolerate internal scrolling.
- Use `mode="compact"` for small concept diagrams.
- The figure must not overlap the right-side TOC or create page-level horizontal overflow.

## Verification

For SVG output:

```bash
mkdir -p /tmp/aisee-diagram-check
rsvg-convert -w 1600 <diagram.svg> -o /tmp/aisee-diagram-check/<name>.png
```

For VuePress page layout:

```bash
pnpm dlx playwright@1.60.0 screenshot --viewport-size=1440,1100 --full-page <local-url> /tmp/<name>.png
```

For site build:

```bash
pnpm docs:build
```

## Boundaries

- Do not add new visual libraries unless existing VuePress, Plume, Vue Flow, Excalidraw, or SVG approaches cannot handle the requirement.
- Do not turn every diagram into a horizontal flow.
- Do not promote reflect notes to `.memory/` unless the user explicitly asks.
