import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FIRST_PRACTICE_DAY, LAST_PRACTICE_DAY } from '../course.constants';
import { getPracticeDay } from '../practice/practice.catalog';

@Component({
  selector: 'app-practice-day',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      @if (practiceDay(); as currentDay) {
        <header>
          <p class="eyebrow">Practice day {{ currentDay.day }}</p>
          <h1>{{ currentDay.title }}</h1>
          <p>{{ currentDay.focus }}</p>
          @if (reviewProgress(); as progress) {
            <section class="review-tracker" aria-labelledby="review-progress-heading">
              <p class="eyebrow" id="review-progress-heading">Review progress</p>
              <div class="review-totals">
                <span
                  >{{ progress.reviewedCount }} reviewed ({{ progress.reviewedPercentage }}%)</span
                >
                <span
                  >{{ progress.unreviewedCount }} unreviewed ({{
                    progress.unreviewedPercentage
                  }}%)</span
                >
              </div>
              <div
                class="review-bar"
                role="progressbar"
                aria-label="Tasks reviewed"
                aria-valuemin="0"
                [attr.aria-valuemax]="progress.totalCount"
                [attr.aria-valuenow]="progress.reviewedCount"
                [attr.aria-valuetext]="
                  progress.reviewedCount + ' of ' + progress.totalCount + ' tasks reviewed'
                "
              >
                <span
                  class="review-bar-complete"
                  [style.width.%]="progress.reviewedPercentage"
                ></span>
              </div>
            </section>
          }
          <nav aria-label="Day navigation">
            <a routerLink="/">Dashboard</a>
            <a routerLink="/course">Course files</a>
            @if (currentDay.day > firstPracticeDay) {
              <a [routerLink]="['/practice/day', currentDay.day - 1]">Previous day</a>
            }
            @if (currentDay.day < lastPracticeDay) {
              <a [routerLink]="['/practice/day', currentDay.day + 1]">Next day</a>
            }
          </nav>
        </header>

        <section>
          <h2>Tasks</h2>
          <div class="task-list">
            @for (task of currentDay.tasks; track task.id) {
              <article class="task" [class.optional]="task.isOptional">
                <p class="eyebrow">
                  {{ task.id }} · {{ task.kind }} · {{ task.duration }}
                  @if (task.isOptional) {
                    · Optional
                  }
                </p>
                <h3>{{ task.title }}</h3>
                <p>{{ task.prompt }}</p>
                <p class="meta">Review: {{ task.review.status }}</p>
                <a [routerLink]="['/practice/day', currentDay.day, 'task', task.id]"> Open task </a>
              </article>
            }
          </div>
        </section>
      } @else {
        <section>
          <h1>Practice day not found</h1>
          <a routerLink="/">Return home</a>
        </section>
      }
    </main>
  `,
})
export class DayComponent {
  readonly firstPracticeDay = FIRST_PRACTICE_DAY;
  readonly lastPracticeDay = LAST_PRACTICE_DAY;
  private readonly route = inject(ActivatedRoute);
  private readonly parameterMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly practiceDay = computed(() => {
    return getPracticeDay(Number(this.parameterMap().get('day')));
  });

  readonly reviewProgress = computed(() => {
    const practiceDay = this.practiceDay();
    if (practiceDay === undefined) {
      return undefined;
    }

    const totalCount = practiceDay.tasks.length;
    const reviewedCount = practiceDay.tasks.filter(
      (task) => task.review.status === 'reviewed',
    ).length;
    const unreviewedCount = totalCount - reviewedCount;
    const reviewedPercentage =
      totalCount === 0 ? 0 : Math.round((reviewedCount / totalCount) * 100);

    return {
      reviewedCount,
      reviewedPercentage,
      totalCount,
      unreviewedCount,
      unreviewedPercentage: 100 - reviewedPercentage,
    };
  });
}
