# Verification record

Verified 13 October 2026 with production Vite build and isolated local Chrome.

- Production build passes. Quote unit tests pass.
- Browser checks: service detail and selection, product filtering and selection, invalid form errors, encoded WhatsApp destination and content, theme toggle, mobile navigation, six demo controls, accepted/denied access, alarm reset and Reset View.
- No horizontal overflow at 320, 375, 768, 1366 and 1920 pixels in both themes.
- Dialog Escape and focus restoration verified. Reduced motion yields static ScrollStack slots; native page scrolling retained.
- Clipboard rejection exposes a selectable prepared enquiry. WebGL failure event activates functional HTML fallback. Mobile fixed actions hide while form input has focus.
- No broken images or browser runtime errors in the confirmation pass. Final architectural hero visually reviewed at desktop and mobile sizes.
- Local mobile Lighthouse after the shader startup fix: performance 89, accessibility 100, best practices 100, SEO 100; LCP 3.0s, TBT 240ms, CLS 0.001. These measurements preceded the final optimized hero/image replacement; scores vary by device and run.

Limits: mobile sizes and keyboard overlap behavior were checked in desktop Chrome, not on a physical touchscreen/phone keyboard. Automatic accessibility checks supplement keyboard checks and do not constitute a full assistive-technology audit. A separate review agent could not complete because its usage limit was reached; final visual and functional review was completed in the primary session. No actual WhatsApp message or email was sent.

React Bits MCP configuration requires restarting Codex; supplied source components are already integrated.

## CircularGallery services update

Integrated the user-supplied JavaScript/CSS CircularGallery for all six services. Preserved its API; fixed StrictMode resource cleanup, keyboard activation callbacks, vertical wheel scrolling, WebGL-loss fallback, and reduced-motion fallback. Gallery lazy-loads near the viewport and uses local Manrope and images. Details and quote preselection remain connected.

Production build and `tests/services-gallery.mjs` pass: keyboard navigation/activation, details/Escape, selected-service quotation, native vertical scrolling, 320/375/768/1366 widths, both themes, reduced motion, and WebGL context loss. No captured browser runtime errors.

Publication blocked: Sites get-site and write-credential operations both returned project_not_found for the existing manifest project. No replacement project was created and the existing identity was preserved. Source changes remain local, ready to synchronize after access is restored.

## Detail image correction

Added matching illustrations to all four property dialogs, replaced Businesses & Offices with offices-v2.webp, and made service index labels open their illustrated detail dialogs. Equipment images use contain sizing and a visible illustrative caption. `tests/detail-images.mjs` confirms all six service and all four property images load and are visible, including mobile; no broken images. Production build passes. Sites access remains blocked with project_not_found.

## Interactive property close-ups

Refined the live property with detailed device geometry, gate rail/motor, fence insulators and wires, paving, window frames and warmer lighting. Selecting each of six systems triggers a smooth camera close-up; selecting physical equipment does the same. Zoom buttons and Property overview preserve action state; Reset View restores the initial demo. Reduced motion moves directly to the view. CCTV Show coverage uses a contextual camera position to include the viewing frustum and ground footprint. Lightweight view uses the selected system image and functional HTML action/status controls.

`tests/property-closeups.mjs` passed all six close-ups/actions, zoom and overview state preservation, reset, mobile layout and lightweight operation, with no captured page errors. Images in artifacts document the visual review. Source remains ready locally; existing Sites project access is still unavailable.

Final focused check also passes contextual CCTV coverage framing and direct reduced-motion equipment navigation, with no captured runtime errors. Local development preview remains running for user review.

## React Bits registry and polish

The workspace-root and app components.json now both expose @react-bits, with matching @ aliases. MCP confirms the registry and returns BlurText searches/examples. Installed BlurText-JS-CSS, GlareHover-JS-CSS and Magnet-JS-CSS through the official registry. Meaningful browser checks pass for headline accessibility, magnetic quote actions, animated filters, product selection, illustrated property details, five widths in both themes, reduced motion and no runtime errors. Touch has static fallback. No additional animation runtime was added; Motion was already installed.
