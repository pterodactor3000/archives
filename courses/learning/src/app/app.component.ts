import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PRACTICE_DAY_NUMBERS } from './course.constants';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="app-shell">
      <nav class="site-nav" aria-label="Primary navigation">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          Practice home
        </a>
        <a routerLink="/course" routerLinkActive="active">Course files</a>
        <a href="/COURSE.md">Course markdown</a>
        @for (day of practiceDayNumbers; track day) {
          <a [routerLink]="['/practice/day', day]" routerLinkActive="active">Day {{ day }}</a>
        }
      </nav>
      <div id="main-content" tabindex="-1">
        <router-outlet />
      </div>
    </div>
  `,
})
export class AppComponent {
  readonly practiceDayNumbers = PRACTICE_DAY_NUMBERS;
}
