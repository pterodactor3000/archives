import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LESSON_LINKS,
  PRACTICE_DAY_NUMBERS,
  REFERENCE_LINKS,
  WORKSPACE_LINKS,
} from '../course.constants';

@Component({
  selector: 'app-course',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <header>
        <p class="eyebrow">Course index</p>
        <h1>Lessons, references, and source notes</h1>
        <p>
          These original teaching files remain unchanged and are copied into every Angular build.
        </p>
        <a routerLink="/">Return home</a>
      </header>

      <section>
        <h2>Roadmap and references</h2>
        <ul>
          @for (link of referenceLinks; track link.href) {
            <li>
              <a [href]="link.href">{{ link.label }}</a>
            </li>
          }
        </ul>
      </section>

      <section>
        <h2>Lessons</h2>
        <ol>
          @for (link of lessonLinks; track link.href) {
            <li>
              <a [href]="link.href">{{ link.label }}</a>
            </li>
          }
        </ol>
      </section>

      <section>
        <h2>Workspace notes</h2>
        <nav aria-label="Workspace documents">
          @for (link of workspaceLinks; track link.href) {
            <a [href]="link.href">{{ link.label }}</a>
          }
        </nav>
      </section>

      <section>
        <h2>Practice days</h2>
        <nav aria-label="Practice days">
          @for (day of practiceDayNumbers; track day) {
            <a [routerLink]="['/practice/day', day]">Day {{ day }}</a>
          }
        </nav>
      </section>
    </main>
  `,
})
export class CourseComponent {
  readonly referenceLinks = REFERENCE_LINKS;
  readonly lessonLinks = LESSON_LINKS;
  readonly workspaceLinks = WORKSPACE_LINKS;
  readonly practiceDayNumbers = PRACTICE_DAY_NUMBERS;
}
