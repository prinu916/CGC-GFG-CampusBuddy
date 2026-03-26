# Campus Connect Hub

Modern React dashboard for campus events, announcements, teams.

## Setup
`npm install` or `bun install`

## Run
`npm run dev`

## Team Auth Setup
Real team credentials integrated into team display.

To enable login:
1. Install firebase-admin: `npm i firebase-admin`
2. Firebase Console > Project Settings > Service Accounts > Generate new private key → save as `src/scripts/firebase-service-account.json`
3. `cd src/scripts && node seedAuthUsers.js`
4. Users created with roles ('team'/'admin'); login via /login.

See TODO.md for progress.
