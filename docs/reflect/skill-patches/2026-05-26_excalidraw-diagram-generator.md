# Skill Patch: excalidraw-diagram-generator

_Date: 2026-05-26_

## Issue

The current skill can generate `.excalidraw` files, but the Aisee docs workflow also needs source-to-SVG export, page embedding, font consistency, text realignment after font changes, and visual verification in VuePress.

## Proposed Change

Add a section for documentation-site usage with explicit source-first and verification rules.

## Before

The workflow ends after creating a `.excalidraw` JSON file and telling the user how to open it.

## After

Add this text:

```markdown
## Documentation Site Export Workflow

When the diagram is for a VuePress, Docusaurus, or static documentation site, treat `.excalidraw` as the source file and SVG/PNG as generated display assets.

1. Write the diagram logic first: goal, reader context, nodes, edges, main path, branches, loops, and what not to show.
2. Modify the `.excalidraw` source file, not only the exported SVG.
3. Choose the layout from the content:
   - linear flows can be horizontal,
   - complex flows should use vertical, folded, or grouped layout,
   - architecture diagrams may use wide layout,
   - small concept diagrams should stay compact.
4. Export the source to SVG using the project’s preferred export command.
5. Render the SVG to PNG or capture the docs page in a browser to verify arrows, labels, clipping, and page overflow.
6. If fonts change, recenter independent text elements in the `.excalidraw` source before export.

Do not rely on macOS Quick Look thumbnails as the only visual check because they can crop or square-pad SVG previews.
```

## Edge Cases Addressed

- Exported SVG looked clipped in Quick Look but was correct when rendered with `rsvg-convert`.
- Text moved after switching from Excalidraw hand-drawn font to normal sans-serif.
- A diagram card overflowed into the VuePress right-side TOC because the component widened the page instead of containing the image.

## Verification

Use the patched skill on a docs page containing `.excalidraw` source and require both source export and page screenshot verification.
