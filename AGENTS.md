# Repository Development Notes

- Treat `factory_sources/konva_svg_factories_constant_stroke_custom` as the canonical source for generated Konva SVG factory files.
- Design factory-related changes so replacing files in that directory is sufficient whenever possible.
- If a requested change requires editing files outside that directory, adding new files, or depending on shared runtime logic elsewhere, call that out explicitly before or while making the change.
- Keep generated `src/konvaSvgFactories` files synchronized with the canonical factory source files when implementing changes in this repository.
