# LOCKAT Security Systems

React/Vite landing page with curated React Bits components, a procedural React Three Fiber property, product enquiries, and a WhatsApp quotation workflow.

## Local development

Node 20.19+ or 22.12+ and pnpm are required.

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm test
```

This machine's bundled Node is `/Users/RCC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`; bundled pnpm is `/Users/RCC/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm`. Add the Node bin directory to PATH when using scripts from a shell without Node.

## Content and behavior

Edit `src/data/content.js` for services, products, property combinations, FAQs and contact settings. `src/lib/quote.js` validates and formats enquiries. The form opens WhatsApp or email for the visitor to send; it does not transmit a message automatically. No backend, credentials or customer data storage is required.

Use `public/images` for assets; image provenance and prompts are documented in `public/images/properties/GENERATION.md`. All product and property imagery is illustrative. Do not claim actual inventory, model specifications or installed projects from these images.

The demo offers camera coverage, perimeter highlighting, sliding gate, accepted/denied access, simulated intercom call, alarm/reset, orbit controls and a lightweight fallback. It uses no camera, microphone or authentication service.

The theme toggle persists only the theme setting. User contact data and enquiry selections remain in page memory. No personal details are saved to local storage.

## React Bits

Original user-provided JSX/CSS is under `src/components/reactbits`. Integration changes preserve component APIs and fix React StrictMode canvas cleanup, hidden overlay focus, reduced-motion behavior, viewport sizing and mobile stack fallback. ScrollStack smoothing/snap are disabled. React Bits registry configuration is in `components.json`.

Codex shadcn MCP is connected. The workspace-root `components.json` exposes the registry to MCP; the app's own `components.json` and `jsconfig.json` configure registry installation and aliases. Both use `@react-bits` → `https://reactbits.dev/r/{name}.json`. Registry search and examples were verified through MCP.

BlurText, GlareHover and Magnet were installed directly using the official shadcn registry. BlurText has an additive semantic `as` prop and reduced-motion/readable text fallback. GlareHover uses a transparent image sheen and ignores touch/reduced motion. Magnet has a 5px maximum offset on quote buttons, disables on mobile/reduced motion, and yields to keyboard focus. Product filter layout, dialog entrances and FAQ content transitions use Motion/native CSS. No new animation runtime dependency was needed.

## Hosting

The private Sites project is recorded in `.openai/hosting.json`. Static output is `dist`. Site source synchronization, packaging and private deployment use the Sites workflow helper.

## Verification

`tests/quote.test.js` covers validation and encoded enquiry contents. Browser scripts under `tests` exercise responsive layouts, filters, selection, dialogs, form validation, demo controls and theme/reduced-motion states using an isolated headless Chrome session. Test artifacts are local and ignored by Git.
