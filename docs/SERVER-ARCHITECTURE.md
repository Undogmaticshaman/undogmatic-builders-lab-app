# Connected-Class Server Architecture

## Purpose

The public repository can teach and improve the interface. A separate private server must handle real member connection, because class links, identity, chat, and transcript access are not public content.

## Public client versus private server

| Public app repository | Private server and data |
| --- | --- |
| Interface code, mock data, beginner curriculum, accessibility fixes | Member accounts, roles, class schedules, join links, attendance, moderated chat, transcript permissions |
| Local prototype and offline resources | Credentials, rate limits, audit events, moderation reports, retention and deletion controls |
| No real people or class artifacts | Consent records and access decisions |

## First private-server release

1. **Authentication and roles** — members sign in; staff, instructor, and student roles are checked server-side.
2. **Classes** — staff publish a class title, time, and permitted join link. The app receives a link only after the server confirms the member is eligible.
3. **Announcements** — staff write announcements through a protected admin area; the app reads them through a public-safe API.
4. **Chat** — messages are tied to signed-in accounts, rate-limited, reportable, and visible to moderators. Do not use an anonymous public chat for members.
5. **Resources and transcripts** — normal resources can be public or member-only. Transcripts require a per-class attendance and consent decision, consistent with Builders Lab policy. No video or audio replay delivery is implied.
6. **Audit and safety** — log administrative changes and access decisions; do not log private message content unnecessarily. Add backups, deletion handling, abuse reporting, and a documented incident process.

## Recommended shape

Use a managed web/API service with a relational database and server-side access rules. Keep the client as the current React app. The server exposes a small versioned API for classes, announcements, chat, resources, and member builds. Store secrets only in the server environment—never in the client repository or desktop package.

## Decisions required before implementation

- Membership and invitation rules.
- Account recovery and support process.
- Moderation roles, response time, and bans/appeals process.
- Transcript consent, eligibility, retention, and deletion rules.
- Privacy notice, data-processing location, and legal review.
- Whether notifications are email, app-only, SMS, or push notifications.
- Budget, vendor, and ownership decision for hosting and database operations.

## Non-goals for this stage

No payment processing, production authentication, live meeting integration, real chat, or real student data should be added until the decisions above are approved and a private server environment exists.
