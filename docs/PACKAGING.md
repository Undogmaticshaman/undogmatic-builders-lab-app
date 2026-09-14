# Cross-Platform Packaging Path

The React interface remains the single product codebase. Vite creates `dist/`; Capacitor wraps that bundle for Android and iPhone, while Electron wraps it for Windows and Mac. The existing public Builders Lab website is not part of any command in this document.

## What is source-controlled

- `src/`, `public/`, and the Vite configuration: shared product behavior and visual identity.
- `capacitor.config.ts`: the shared mobile application ID, name, web directory, colors, and safe WebView defaults.
- `electron/main.cjs` and the `build/` icons: the desktop shell and brand assets.
- `package.json` and `package-lock.json`: pinned tools and repeatable commands.

Generated `android/`, `ios/`, `dist/`, and `release/` directories stay ignored. This is appropriate while the mobile shells contain no custom native code. If native plugins or platform-specific code are added later, the team should review this choice and start source-controlling the native projects.

## Requirements

Use Node.js 22.12 or newer and npm 10 or newer.

| Target | Build host and tools | Artifact status in this checkout |
| --- | --- | --- |
| PWA | Windows, macOS, or Linux; Node.js | Production web bundle supported |
| Windows | Windows; Electron builder | Portable x64 preview supported |
| Android | Windows or macOS; Android Studio and Android SDK | Source path configured; no signed package produced |
| iPhone/iPad | macOS; Xcode and Apple signing | Source path configured; no binary produced |
| Mac | macOS; Apple signing and notarization for public distribution | Electron target configured; no binary produced |

## Shared verification

From the project root:

```bash
npm ci
npm run check
npm test
npm run build
```

`npm run mobile:doctor` checks the Capacitor environment. It does not replace building and testing on real target devices.

## Android

On a machine with Android Studio and an Android SDK:

```bash
npm ci
npm run mobile:add:android
npm run mobile:open:android
```

The first command creates the ignored `android/` project. Later shared-code changes need only:

```bash
npm run mobile:sync:android
```

Use Android Studio to select an emulator or device, run the app, and create a debug build. A public Google Play release additionally requires a founder-controlled Play Console account, a private upload key, store listing/privacy declarations, and device testing. Never commit the keystore, passwords, service-account files, or `local.properties`.

Before distribution, verify navigation, safe-area spacing, the on-screen keyboard, local persistence, external links, resource downloads, offline behavior, and accessibility on a physical Android device.

## iPhone and iPad

On a Mac with Xcode and its command-line tools:

```bash
npm ci
npm run mobile:add:ios
npm run mobile:open:ios
```

Capacitor uses Swift Package Manager by default. Later shared-code changes need only:

```bash
npm run mobile:sync:ios
```

In Xcode, select the founder-owned Apple team and a unique bundle identifier, then run on a simulator and a physical device. App Store or TestFlight delivery requires an Apple Developer membership, signing certificates/profiles, App Store Connect access, privacy declarations, screenshots, and review. Those credentials and profiles do not belong in this repository.

Before distribution, verify the same interaction list as Android plus iPhone/iPad safe areas, rotation policy, Dynamic Type, VoiceOver, and resource handling.

## Windows

The existing portable Windows workflow is unchanged:

```bash
npm run desktop:run
npm run desktop:dist:windows
```

The artifact is written under `release/`. The current preview is unsigned, so Windows may show an unknown-publisher warning. Public distribution needs a founder-controlled Windows code-signing certificate and a signed release process.

`npm run desktop:dist` remains an alias for the Windows command for backward compatibility.

## Mac direct download

Run this only on macOS:

```bash
npm ci
npm run desktop:run
npm run desktop:dist:mac
```

The command builds x64 and arm64 DMG and ZIP targets under `release/`, using the same Electron shell and 1024-pixel PNG icon source. A public direct-download release requires a Developer ID Application certificate, hardened-runtime signing, notarization, and testing on both Intel and Apple Silicon where supported.

Keep signing material outside Git. Electron builder can read signing and notarization credentials from the build machine or CI secret store; do not add them to scripts or configuration files. Mac App Store distribution is a separate founder decision because it requires an MAS target, App Sandbox entitlements, provisioning, and store-specific review.

## Native and account boundaries

No mobile or desktop command connects authentication, payments, meetings, analytics, notifications, or real member data. The app continues to use mock content and device-local state. Review [SERVER-ARCHITECTURE.md](SERVER-ARCHITECTURE.md) before adding any connected service.

## Founder decisions before public native releases

- Legal owner and final display name for each store listing.
- Apple Developer and Google Play organization/account ownership.
- Windows and Apple signing-certificate ownership and renewal.
- Direct-download Mac versus Mac App Store distribution.
- Privacy policy, retention, transcript consent, age rating, and store privacy declarations.
- Whether native platform projects should become source-controlled when custom native work begins.
