import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LESSON_LINKS, REFERENCE_LINKS } from '../course.constants';
import { PRACTICE_DAYS } from '../practice/practice.catalog';
import { PracticeDay } from '../practice/task.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <header>
        <p class="eyebrow">Four-day interview practice</p>
        <h1>Recover fluency by editing real code</h1>
        <p>
          Open a task, edit its listed files, run the app or tests, then ask the agent to review one
          day. Reviews appear from source files after reload.
        </p>
        <nav aria-label="Start links">
          <a routerLink="/practice/day/1">Start day 1</a>
          <a routerLink="/course">Browse course material</a>
          <a href="/COURSE.md">Open course markdown</a>
          <a href="/reference/0001-four-day-interview-roadmap.html">Open full roadmap</a>
        </nav>
      </header>

      <section aria-labelledby="days-heading">
        <h2 id="days-heading">Practice days</h2>
        <div class="grid">
          @for (practiceDay of practiceDays; track practiceDay.day) {
            <article class="card must">
              <p class="eyebrow">Day {{ practiceDay.day }}</p>
              <h3>{{ practiceDay.title }}</h3>
              <p>{{ practiceDay.focus }}</p>
              <p class="meta">
                {{ practiceDay.tasks.length }} tasks · {{ reviewedCount(practiceDay) }} reviewed
              </p>
              <a [routerLink]="['/practice/day', practiceDay.day]"
                >Open day {{ practiceDay.day }}</a
              >
            </article>
          }
        </div>
      </section>

      <section class="callout">
        <h2>File-backed review loop</h2>
        <ol>
          <li>Edit the exact files named on each task page.</li>
          <li>Run <code>npm start</code>, <code>npm test</code>, or both.</li>
          <li>Ask the agent to review a day. The agent reads repository files directly.</li>
          <li>Reload the task page after the agent updates its <code>review.ts</code> file.</li>
        </ol>
      </section>

      <section>
        <h2>Lessons and references</h2>
        <div class="grid">
          <article class="card">
            <h3>Lessons</h3>
            <ol>
              @for (link of lessonLinks; track link.href) {
                <li>
                  <a [href]="link.href">{{ link.label }}</a>
                </li>
              }
            </ol>
          </article>
          <article class="card">
            <h3>References</h3>
            <ul>
              @for (link of referenceLinks; track link.href) {
                <li>
                  <a [href]="link.href">{{ link.label }}</a>
                </li>
              }
            </ul>
          </article>
        </div>
      </section>
    </main>
  `,
})
export class DashboardComponent {
  readonly practiceDays = PRACTICE_DAYS;
  readonly lessonLinks = LESSON_LINKS;
  readonly referenceLinks = REFERENCE_LINKS;

  reviewedCount(practiceDay: PracticeDay): number {
    return practiceDay.tasks.filter((task) => task.review.status === 'reviewed').length;
  }
}
