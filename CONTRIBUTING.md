# Contributing to Undogmatic Builders Lab

Thank you for helping improve the Builders Lab app. This is a public learning project with a private member-service future, so the contribution boundary matters.

## Before you start

1. Read the README and this guide.
2. Check existing issues before starting work.
3. Open an issue or comment before beginning a larger feature.
4. Keep each pull request focused on one user-visible improvement or one clearly scoped repair.

## Good first contributions

- Improve a beginner guide or definition in Start Here.
- Improve keyboard access, labels, contrast, or responsive layout.
- Add tests for existing behavior.
- Improve mock states, empty states, or resource organization.
- Document a safe, privacy-preserving integration idea.

## Contributions that need discussion first

- Authentication, payments, member records, or personal data.
- Real class schedules, meeting links, transcripts, or recordings.
- Any third-party service integration, analytics, notifications, or AI API.
- Changes to brand assets, pricing, legal copy, or release packaging.

## Privacy and security

Never commit credentials, API keys, meeting links, access tokens, student details, payment data, screenshots containing private information, or real class transcripts. Use mock data in examples and tests. Report a suspected security issue privately as described in [SECURITY.md](SECURITY.md).

## Local checks

Run these before opening a pull request:

```bash
npm install
npm run check
npm test
npm run build
```

## Pull request expectations

- Explain the problem and the user impact.
- Include test or verification evidence.
- Keep generated files, `node_modules`, releases, and local environment files out of commits.
- Be respectful and constructive in reviews.
