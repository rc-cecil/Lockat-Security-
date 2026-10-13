# LOCKAT visual system

Bright architectural security experience, approved by the user. Audience: homeowners and property managers of homes, offices, schools and estates in Ghana. Persuade through clear product context and a working illustrative 3D scene.

- Taste settings: DESIGN_VARIANCE 7, MOTION_INTENSITY 6, VISUAL_DENSITY 4.
- Manrope Variable, self hosted through @fontsource-variable/manrope. Sans-serif throughout.
- Light: surface #f8fbff, secondary surface #edf3f8, card #ffffff, text #102d45, muted #506478, accent #0867c4, action blue #0875de.
- Dark: surface #091a2b, secondary #10263b, card #142d43, text #edf5fc, muted #b0c3d3, accent #82c7ff.
- Light is the user-selected default; manual theme selection persists. One theme across the page.
- Cards/media radius 20px, compact fields 9px, primary buttons full pill. Mobile large surfaces use 16px.
- Max content width 1320px. Desktop section spacing 108px, mobile 68px. Native scroll.
- Layers: header 20, mobile navigation 30, bottom actions 19; native dialog uses browser top layer.
- ScrollExpand is the signature media reveal. ScrollStack explains the installation sequence. GooeyNav highlights navigation, BorderGlow quietly responds to service-card pointers, SpecularButton adds restrained edge highlights.
- Reduced motion renders static media and process cards; all operations remain available. Touch removes tilt/hover dependence. Continuous values stay outside React state.
- Original logo is preserved using an exact CSS viewport crop. No redrawing of brand lettering.

## Guidance applied
Taste provides composition and hierarchy. Emil Kowalski provides responsive press feedback, restrained easing, clear motion purpose and cleanup. Impeccable provides spacing, contrast, browser-state and complete-experience review. Humanizer provides direct supported copy. The user-approved plan takes priority over any conflicting default skill style or extra confirmation workflow.

## Curated React Bits refinement

- BlurText: brief word-level focus reveal for the hero and About heading, static with reduced motion. Semantic headings and accessible text are preserved.
- GlareHover: a restrained optical sheen over property imagery on pointer hover; no idle loop, no touch effect.
- Magnet: quote buttons gently respond within 5px, with keyboard/mobile/reduced-motion safeguards.
- Product category changes use short layout transitions. Native details and dialogs retain semantics with brief entrances.
- Keep the architectural imagery and interactive security tour as the visual anchors.
