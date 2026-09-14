# Cross-Platform Packaging Path

The product interface and behavior stay in this one React codebase. Platform shells wrap the production `dist/` build; they do not fork the member screens.

## Available now: installable web app

`npm run build` creates a production web application with a manifest and offline app shell. It can be tested as an installed PWA while member accounts and native-store distribution are still out of scope.

## iPhone and Android: Capacitor

When mobile packaging is approved:

1. Add `@capacitor/core` and `@capacitor/cli`.
2. Initialize Capacitor with app id `com.undogmatic.builderslab`, app name `Builders Lab`, and web directory `dist`.
3. Add `@capacitor/ios` and `@capacitor/android`, then create both platforms.
4. Run the web build and Capacitor sync from the shared project.
5. Add only the native capabilities actually needed, with calendar reminders and notifications considered separately.
6. Test safe areas, keyboard behavior, downloads, offline states, and screen-reader labels on real devices.
7. Use Xcode on macOS for iPhone signing and Android Studio for Android signing.

No payment SDK should be added until the enrollment and account model is explicitly approved.

## Windows: Electron portable package

The first Windows package uses the checked-in Electron shell:

1. `npm run desktop:run` builds and opens the local desktop app.
2. `npm run desktop:dist` creates the x64 portable Windows executable under `release/`.
3. The desktop window keeps Node integration off, context isolation on, and sandboxing on.
4. The portable preview is unsigned; Windows may show an unknown-publisher warning.
5. A public release still needs a trusted Windows code-signing certificate and a repeatable signed release pipeline.

## Mac: same Electron shell

The same `dist/` interface and `electron/main.cjs` shell can create a macOS package on a Mac build machine. Public distribution requires macOS icon export, Apple Developer signing, hardened runtime configuration, and notarization. No member-screen fork is required.

## Data evolution

The screens currently read mock content and save member changes on-device. The production sequence should be:

1. Confirm member identity, privacy, moderation, and transcript-access policies.
2. Define a small service interface for classes, announcements, chat, resources, and builds.
3. Replace the local persistence adapter with authenticated storage.
4. Add read-only integrations first and verify every connection with an observable check.
5. Add push notifications and deep links only after the member and native-app foundations are stable.

## Release gates

- Platform-specific icon review from the approved Undogmatic Symbol PNG
- Real next-class data source and join-link access rules
- Member authentication and account recovery
- Chat moderation, reporting, retention, and privacy decisions
- Transcript permission and redaction workflow
- Accessibility pass on every target platform
- Store descriptions, screenshots, privacy labels, signing, and legal review
