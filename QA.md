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
