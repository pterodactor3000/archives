import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { getDemoOutput } from './pages/task.component';
import { PRACTICE_DAYS } from './practice/practice.catalog';

describe('practice application', () => {
  it('shows reviewed and unreviewed proportions on a practice day', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    const practiceDay = PRACTICE_DAYS.find((day) => day.day === 1);
    if (practiceDay === undefined) {
      throw new Error('Expected practice day 1 in the catalog.');
    }
    const reviewedCount = practiceDay.tasks.filter(
      (task) => task.review.status === 'reviewed',
    ).length;
    const unreviewedCount = practiceDay.tasks.length - reviewedCount;
    const reviewedPercentage = Math.round((reviewedCount / practiceDay.tasks.length) * 100);

    await expect(router.navigateByUrl('/practice/day/1')).resolves.toBe(true);
    await fixture.whenStable();

    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.textContent).toContain(`${reviewedCount} reviewed (${reviewedPercentage}%)`);
    expect(hostElement.textContent).toContain(
      `${unreviewedCount} unreviewed (${100 - reviewedPercentage}%)`,
    );

    const progressBar = hostElement.querySelector('[role="progressbar"]');
    expect(progressBar?.getAttribute('aria-valuemax')).toBe(String(practiceDay.tasks.length));
    expect(progressBar?.getAttribute('aria-valuenow')).toBe(String(reviewedCount));
  });

  it('opens a task and runs its typed demo harness', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await expect(router.navigateByUrl('/practice/day/1/task/d1-two-sum')).resolves.toBe(true);
    await fixture.whenStable();

    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.textContent).toContain('Repair Two Sum');
    const runButton = hostElement.querySelector('button');
    if (!(runButton instanceof HTMLButtonElement)) {
      throw new Error('Expected the Two Sum task to render its demo button.');
    }

    runButton.click();
    await fixture.whenStable();
    expect(hostElement.textContent).toContain('[2,7,11,15], target 9');

    for (const checkbox of hostElement.querySelectorAll('input[type="checkbox"]')) {
      expect(checkbox).toBeInstanceOf(HTMLInputElement);
      expect((checkbox instanceof HTMLInputElement && checkbox.labels?.length) || 0).toBe(1);
    }
  });

  it('supplies required inputs to a dynamic component demo', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await expect(router.navigateByUrl('/practice/day/1/task/d1-quote-card-signals')).resolves.toBe(
      true,
    );
    await fixture.whenStable();

    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.textContent).toContain('ACME');
    expect(hostElement.textContent).toContain('Bid 101.25');
    expect(hostElement.textContent).toContain('Ask 101.5');
    expect(hostElement.textContent).toContain('3/3');

    const selectButton = hostElement.querySelector('button');
    if (!(selectButton instanceof HTMLButtonElement)) {
      throw new Error('Expected the quote-card host to render the learner component button.');
    }

    selectButton.click();
    await fixture.whenStable();
    expect(hostElement.textContent).toContain('Selected symbol: ACME');
  });

  it('renders task-not-found state for an unknown task', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await expect(router.navigateByUrl('/practice/day/2/task/not-a-task')).resolves.toBe(true);
    await fixture.whenStable();

    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.textContent).toContain('Practice task not found');
  });

  it('omits demo sections when a task has no demo', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await expect(router.navigateByUrl('/practice/day/2/task/d2-test-suite')).resolves.toBe(true);
    await fixture.whenStable();

    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.textContent).not.toContain('Live component output');
    expect(hostElement.textContent).not.toContain('Typed demo harness');
  });

  it('reports absent and thrown harnesses without crashing', () => {
    expect(getDemoOutput(undefined)).toEqual(['No demo harness is configured for this task.']);
    expect(
      getDemoOutput(() => {
        throw new Error('fixture exploded');
      }),
    ).toEqual(['Demo failed while running the task harness: fixture exploded']);
  });

  it('keeps the debug fixture and unsafe binding evidence observable', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await expect(router.navigateByUrl('/practice/day/2/task/d2-debug-round')).resolves.toBe(true);
    await fixture.whenStable();

    const hostElement: HTMLElement = fixture.nativeElement;
    const runButton = hostElement.querySelector('button');
    if (!(runButton instanceof HTMLButtonElement)) {
      throw new Error('Expected the debug-round task to render its demo button.');
    }

    runButton.click();
    await fixture.whenStable();
    expect(hostElement.textContent).toContain('Expected derived spread after fix: 1.5');
    expect(hostElement.textContent).toContain('[innerHTML]');
    expect(hostElement.textContent).toContain('{{ externalServerText }}');
  });

  it('opens every catalog task and runs each configured harness', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    const hostElement: HTMLElement = fixture.nativeElement;

    for (const day of PRACTICE_DAYS) {
      for (const task of day.tasks) {
        await expect(
          router.navigateByUrl(`/practice/day/${day.day}/task/${task.id}`),
        ).resolves.toBe(true);
        await fixture.whenStable();
        expect(hostElement.textContent, `Task route failed for ${task.id}`).toContain(task.title);

        if (task.demoComponent !== undefined) {
          expect(hostElement.textContent).toContain('Live component output');
        }

        if (task.runDemo !== undefined) {
          const runButton = hostElement.querySelector('button');
          if (!(runButton instanceof HTMLButtonElement)) {
            throw new Error(`Expected task ${task.id} to render its demo button.`);
          }
          runButton.click();
          await fixture.whenStable();
          expect(hostElement.textContent).not.toContain('Demo failed while running');
        }
      }
    }
  });

  it('opens the focused order-ticket and lazy-feature routes', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    const hostElement: HTMLElement = fixture.nativeElement;

    await expect(router.navigateByUrl('/practice/order-ticket/practice-account')).resolves.toBe(
      true,
    );
    await fixture.whenStable();
    expect(hostElement.textContent).toContain('Order ticket starter');

    await expect(router.navigateByUrl('/practice/lazy-states')).resolves.toBe(true);
    await fixture.whenStable();
    expect(hostElement.textContent).toContain('Loading orders');
  });
});
