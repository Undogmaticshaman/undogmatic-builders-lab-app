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

## Recommended private-server shape

Create a separate private Cloudflare Worker named `undogmatic-builders-lab-api`. It is not a route or deployment change to the existing public Builders Lab website. Keep the current React/Electron/Capacitor app as the client, and expose only a small versioned API.

| Part | Job | Why it stays private |
| --- | --- | --- |
| Worker API | Session checks, role checks, class and announcement reads, protected join-link delivery | It holds the policy that decides who may see member material. |
| D1 database | Members, roles, classes, announcements, resource rules, attendance/consent decisions, member-build progress, audit events | This is the durable record for the class—not mock browser storage. |
| One Durable Object per chat channel | Real-time messages and WebSocket connections for one channel at a time | A room is the coordination unit; do not put every class conversation into one global room. |
| R2 storage | Private transcript/resource files after eligibility is confirmed | It avoids putting member-only files inside the public application bundle. |
| Auth provider | Signed member identity before any protected request | Never trust a member ID or staff role supplied by the browser. |

Cloudflare documents Durable Objects as a fit for coordinated real-time chat, with each object having a globally unique name and strongly consistent storage. New Durable Objects should use SQLite-backed storage. See the official [Durable Objects overview](https://developers.cloudflare.com/durable-objects/) and [API reference](https://developers.cloudflare.com/durable-objects/api/).

### First API contract

The first server release should be deliberately small:

```text
GET  /v1/me
GET  /v1/classes/next
POST /v1/classes/:id/join-link       (eligible member only)
GET  /v1/announcements
GET  /v1/resources
GET  /v1/resources/:id/download      (checks resource rule first)
GET  /v1/build
PUT  /v1/build
WS   /v1/chat/:channel               (signed-in member, one Durable Object per channel)
POST /v1/chat/:channel/report
```

`GET /v1/classes/next` can safely return the class title, time, and preparation note. `POST /v1/classes/:id/join-link` must make the eligibility decision on the server and only then return a short-lived room link. This keeps a meeting URL out of the public app bundle and browser storage.

### Data boundaries

- Keep direct-message content out of broad audit logs. Audit decisions such as an announcement publish, role change, resource access denial, or moderation action instead.
- Store transcript attendance and consent as distinct facts. A paid membership or meeting attendance alone does not prove transcript permission.
- Rate-limit message creation, preserve reports for moderators, and set a documented retention/deletion period before inviting members.
- Keep API keys, signing secrets, database IDs, meeting links, and R2 credentials only in the private Worker environment. They do not belong in the Electron package, mobile app, public repository, or `wrangler` configuration.

### Deployment boundary

When the founder decisions below are approved, create the Worker in its own private deployment project and run it first in a non-production environment with test accounts only. Generate Worker binding types from its actual configuration, keep a current compatibility date, enable observability, and use secrets through the deployment environment. Do not attach it to the existing public site or import real members during the first test.

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
