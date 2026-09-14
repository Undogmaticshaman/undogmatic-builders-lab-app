# Undogmatic Builders Lab App

A separate, installable application foundation for the Undogmatic Builders Lab member experience. It does not contain deployment settings for, link to, or modify the existing public website.

## What works in this foundation

- Home with a locally formatted next-class time, class information, safe Join placeholder, reminder state, and announcements
- Usable local member chat with channels and message composition
- Start Here learning path for ChatGPT, VS Code, GitHub, Vercel, agents, and MCP servers
- Downloadable worksheets, setup links, and a sample attendee transcript
- Editable My Build project, next action, notes, milestones, and saved progress
- Responsive desktop sidebar and mobile bottom navigation
- Local persistence, install manifest, and an offline app shell
- Portable Windows desktop package using the same React interface
- Accessible focus states, labels, keyboard-friendly controls, and reduced-motion support

All people, messages, class details, and project details are sensible mock data. Enrollment, payments, authentication, live meetings, and external accounts are intentionally not connected.

## Run it

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local address printed by Vite. Quality commands:

```bash
npm run check
npm test
npm run build
npm run preview
npm run desktop:run
npm run desktop:dist
```

## Architecture

The shared product is a React + TypeScript interface built by Vite. It uses web-platform capabilities supported by browsers, Electron, and Capacitor webviews. Member state is currently stored on the device behind one small persistence hook, making a later account-backed data service a contained replacement instead of a screen rewrite.

- `src/screens/` — the five member areas
- `src/components/` — shared shell and brand mark
- `src/data/` — replaceable foundation-stage content
- `src/hooks/usePersistentState.ts` — temporary on-device state boundary
- `public/resources/` — downloadable member materials
- `electron/` — secure Windows desktop shell
- `build/` — Windows icon assets generated from the approved symbol PNG
- `docs/PACKAGING.md` — the mobile and desktop packaging path

## Brand symbol

`public/undogmatic-symbol.png` is the approved symbol isolated from the supplied artwork with the lettering removed. It is the shared in-app PNG master. `build/icon.png` and `build/icon.ico` are the Windows packaging assets derived from that same mark.

## Deliberate boundaries

- No `.openai/hosting.json`, website deployment, or public-site code
- No payment or enrollment integration
- No live chat, calendar, meeting, or member-account connection
- No claim or placeholder for video/audio class replays
- No secrets or environment credentials

See [docs/PACKAGING.md](docs/PACKAGING.md) before adding native shells.

## Contributing

Students and collaborators are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md), choose a small issue, and keep pull requests focused on one clear improvement. Please do not add real member data, private meeting links, credentials, payment information, or transcripts from real classes to this public repository.

## Connected-class roadmap

This repository intentionally runs with mock data and device-local state. The proposed secure server boundary for real classes is described in [docs/SERVER-ARCHITECTURE.md](docs/SERVER-ARCHITECTURE.md). It keeps member identity, class links, chat moderation, and transcript access out of the public front end.

## License

The source code is licensed under the [Apache License 2.0](LICENSE). It allows use, modification, and distribution while requiring the license and notices to be kept and changes to be identified.

Undogmatic, Undogmatic Builders Lab, and their associated symbols are not licensed for use as names, logos, endorsements, or branding for derivative projects. Forks should use their own name and visual identity.
