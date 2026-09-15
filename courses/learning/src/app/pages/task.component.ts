import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getPracticeTask } from '../practice/practice.catalog';

@Component({
  selector: 'app-practice-task',
  imports: [NgComponentOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      @if (task(); as currentTask) {
        <header>
          <p class="eyebrow">
            Day {{ currentTask.day }} · {{ currentTask.id }} · {{ currentTask.duration }}
          </p>
          <h1>{{ currentTask.title }}</h1>
          <p>{{ currentTask.prompt }}</p>
          <nav aria-label="Task navigation">
            <a [routerLink]="['/practice/day', currentTask.day]"
              >Back to day {{ currentTask.day }}</a
            >
            <a routerLink="/course">Course files</a>
          </nav>
        </header>

        <section>
          <h2>Requirements</h2>
          <ul class="checklist">
            @for (requirement of currentTask.requirements; track requirement) {
              <li>
                <label>
                  <input type="checkbox" />
                  <span>{{ requirement }}</span>
                </label>
              </li>
            }
          </ul>
        </section>

        <section class="callout">
          <h2>Edit these files</h2>
          <p>
            Open these repository files in the editor. This page has no hidden browser solution.
          </p>
          <ul>
            @for (file of currentTask.files; track file) {
              <li>
                <code>{{ file }}</code>
              </li>
            }
          </ul>
          @if (currentTask.testCommand; as testCommand) {
            <p>
              Run <code>{{ testCommand }}</code> after editing.
            </p>
          }
        </section>

        @if (currentTask.demoComponent; as demoComponent) {
          <section>
            <h2>Live component output</h2>
            <ng-container *ngComponentOutlet="demoComponent; inputs: currentTask.demoInputs" />
            <p class="meta">
              Save the source file and reload if the development server does not refresh.
            </p>
          </section>
        }

        @if (currentTask.runDemo) {
          <section>
            <h2>Typed demo harness</h2>
            <button type="button" (click)="runDemo()">Run current solution</button>
            <div class="demo-output" aria-live="polite">
              @for (line of demoOutput(); track $index) {
                <pre><code>{{ line }}</code></pre>
              } @empty {
                <p class="meta">Run the harness after predicting each line.</p>
              }
            </div>
          </section>
        }

        <section class="review-panel" aria-labelledby="review-heading">
          <h2 id="review-heading">Agent review</h2>
          <p class="meta">
            Source: <code>{{ currentTask.reviewFile }}</code>
          </p>
          <p>
            <strong>Score:</strong>
            @if (currentTask.review.status === 'reviewed') {
              {{ currentTask.review.score }}/3
            } @else {
              Awaiting review
            }
          </p>
          <h3>Criticism</h3>
          <p>{{ currentTask.review.criticism }}</p>
          <h3>What to improve</h3>
          <ul>
            @for (improvement of currentTask.review.improvements; track improvement) {
              <li>{{ improvement }}</li>
            } @empty {
              <li>No improvements recorded yet.</li>
            }
          </ul>
          @if (currentTask.review.status === 'pending') {
            <p>
              Ask the agent to review day {{ currentTask.day }}. It can read the listed solution
              files and update this typed review file. Reload afterward.
            </p>
          } @else {
            @if (currentTask.review.optimalSolution; as optimalSolution) {
              <details>
                <summary>Reveal reference solution after attempting the task</summary>
                <pre><code>{{ optimalSolution }}</code></pre>
              </details>
            }
          }
        </section>
      } @else {
        <section>
          <h1>Practice task not found</h1>
          <a routerLink="/">Return home</a>
        </section>
      }
    </main>
  `,
})
export class TaskComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly parameterMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly task = computed(() => {
    const parameters = this.parameterMap();
    return getPracticeTask(Number(parameters.get('day')), parameters.get('taskId') ?? '');
  });
  readonly demoOutput = signal<readonly string[]>([]);

  runDemo(): void {
    const runDemo = this.task()?.runDemo;
    if (runDemo === undefined) {
      this.demoOutput.set(getDemoOutput(runDemo));
      return;
    }

    this.demoOutput.set(getDemoOutput(runDemo));
  }
}

export function getDemoOutput(runDemo: (() => readonly string[]) | undefined): readonly string[] {
  if (runDemo === undefined) {
    return ['No demo harness is configured for this task.'];
  }

  try {
    return runDemo();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return [`Demo failed while running the task harness: ${message}`];
  }
}
