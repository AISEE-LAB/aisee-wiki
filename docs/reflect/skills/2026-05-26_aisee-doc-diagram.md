# Skill Draft: aisee-doc-diagram

> Status: Draft. Review before promoting to an active skill directory.

---
name: aisee-doc-diagram
description: Create and maintain source-first diagrams for the Aisee VuePress documentation site. Use when drawing, fixing, exporting, or embedding Excalidraw diagrams, SVG diagrams, Vue Flow diagrams, DiagramFigure components, learning-path visuals, Agent workflow diagrams, architecture diagrams, or any doc visual where layout, fonts, arrows, page overflow, or source-to-output consistency matters.
---

# aisee-doc-diagram

## Purpose

Create documentation diagrams that are logically clear, maintainable from source files, and safe to embed in the VuePress / Plume site without overflowing the page layout.

## When To Use

- The user asks to draw, fix, or optimize a diagram for the docs site.
- The diagram uses `.excalidraw`, SVG, Vue Flow, or `DiagramFigure`.
- A diagram has wrong arrows, unclear reading order, bad typography, clipping, or page overflow.
- The user wants Excalidraw source files, exported SVG, or reusable diagram workflow.

## Workflow

1. Read the target page and existing diagram files.
2. Write or update a logic document under `docs/assets/diagram-logic/`.
3. Decide the layout before drawing:
   - `fit` for most diagrams.
   - `wide` only for genuinely wide architecture, topology, or swimlane diagrams.
   - `compact` for small concept diagrams.
4. Modify the diagram source first:
   - `.excalidraw` for static Excalidraw diagrams.
   - Vue component source for interactive diagrams.
   - Do not patch only the exported SVG unless the source is unavailable and the user accepts that limitation.
5. Export `.excalidraw` to SVG using `excalidraw-brute-export-cli` when applicable.
6. Validate visually:
   - Render SVG to PNG with `rsvg-convert`.
   - Use browser screenshot for the VuePress page when layout or component behavior changed.
7. Update docs or memory candidates if a reusable workflow decision was discovered.

## Excalidraw Export

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

Render-check:

```bash
mkdir -p /tmp/aisee-diagram-check
rsvg-convert -w 1600 \
  site/.vuepress/public/diagrams/<section>/<name>.svg \
  -o /tmp/aisee-diagram-check/<name>.png
```

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

## Outputs

- Updated page file under `site/`.
- Source diagram file under `site/.vuepress/public/diagrams/`.
- Exported SVG under `site/.vuepress/public/diagrams/`.
- Logic document under `docs/assets/diagram-logic/`.
- Verification summary with commands run.

## Verification

Run the smallest relevant set:

```bash
pnpm docs:build
```

For visual changes, also run at least one of:

```bash
rsvg-convert -w 1600 <diagram.svg> -o /tmp/aisee-diagram-check/<name>.png
pnpm dlx playwright@1.60.0 screenshot --viewport-size=1440,1100 --full-page <local-url> /tmp/<name>.png
```

## Boundaries

- Do not add new visual libraries unless existing VuePress, Plume, Vue Flow, Excalidraw, or SVG approaches cannot handle the requirement.
- Do not turn every diagram into a horizontal flow; choose layout from content.
- Do not promote reflect notes to `.memory/` unless the user explicitly asks.
