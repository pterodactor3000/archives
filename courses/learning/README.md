# Angular interview practice

Small Angular 22 practice app for the four-day interview plan in this teaching workspace. Learner code and agent reviews live in repository files. Nothing is stored in browser storage.

## Run it

```bash
npm install
npm start
```

Open `http://localhost:4200`. Production build:

```bash
npm run build
```

Run checks:

```bash
npm run typecheck
npm test
npm run format:check
```

## Practice and review

1. Open a day and task in the app.
2. Edit every physical path listed on the task page. Task files live under `src/app/practice/day-01/` through `day-04/`.
3. Use the live component or typed demo harness. Run `npm test` for test tasks.
4. Ask the main agent to "review day 2" or name another day.
5. The agent reads learner files directly and updates each task's typed `review.ts`.
6. Reload the task page. It shows score, criticism, improvements, and an optimal solution when one is useful.

Starter files use compile-safe TODO behavior so the app runs before exercises are complete. Diagnostic reference solutions stay collapsed until the learner chooses to reveal them.

## Course material

Original material remains in:

- `COURSE.md` (one markdown copy of every lesson, reference, and workspace note)
- `lessons/*.html`
- `reference/*.html`
- `MISSION.md`
- `NOTES.md`
- `RESOURCES.md`
- `assets/course.css`

Angular copies these files into the development server and production build. Browse the HTML set from `/course`, or open `/COURSE.md` from any device that can reach the T3 Code project or the running app.
