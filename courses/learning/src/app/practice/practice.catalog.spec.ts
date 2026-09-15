import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PRACTICE_DAYS } from './practice.catalog';

const AVAILABLE_EDITABLE_FILES = new Set([
  'src/app/practice/day-01/d1-trade-boundary/solution.ts',
  'src/app/practice/day-01/d1-quote-card-signals/solution.ts',
  'src/app/practice/day-01/d1-two-sum/solution.ts',
  'src/app/practice/day-01/d1-two-sum/notes.md',
  'src/app/practice/day-01/d1-quote-card-version-bridge/solution.ts',
  'src/app/practice/day-01/d1-valid-parentheses/solution.ts',
  'src/app/practice/day-01/d1-valid-parentheses/notes.md',
  'src/app/practice/day-02/d2-order-ticket/solution.ts',
  'src/app/practice/day-02/d2-order-ticket/order.service.ts',
  'src/app/practice/day-02/d2-order-ticket/order-ticket.routes.ts',
  'src/app/practice/day-02/d2-order-ticket/solution.spec.ts',
  'src/app/practice/day-02/d2-test-suite/order-validator.ts',
  'src/app/practice/day-02/d2-test-suite/solution.spec.ts',
  'src/app/practice/day-02/d2-debug-round/solution.ts',
  'src/app/practice/day-02/d2-algorithm-pair/solution.ts',
  'src/app/practice/day-02/d2-lazy-routing-states/solution.ts',
  'src/app/practice/day-02/d2-lazy-routing-states/lazy-feature.routes.ts',
  'src/app/practice/day-02/d2-lazy-routing-states/solution.spec.ts',
  'src/app/practice/day-03/d3-timed-patterns/solution.ts',
  'src/app/practice/day-03/d3-typescript-quality/solution.ts',
  'src/app/practice/day-03/d3-angular-recall/solution.ts',
  'src/app/practice/day-03/d3-angular-recall/solution.spec.ts',
  'src/app/practice/day-03/d3-correction-round/solution.ts',
  'src/app/practice/day-04/d4-mock-live-coding/solution.ts',
  'src/app/practice/day-04/d4-mock-live-coding/solution.spec.ts',
  'src/app/practice/day-04/d4-gap-repairs/solution.ts',
]);

describe('practice catalog', () => {
  it('keeps all 16 task contracts unique and file-backed', () => {
    const tasks = PRACTICE_DAYS.flatMap((day) => day.tasks);
    const taskIds = tasks.map((task) => task.id);

    expect(tasks).toHaveLength(16);
    expect(new Set(taskIds).size).toBe(taskIds.length);
    for (const task of tasks) {
      expect(task.files.length).toBeGreaterThan(0);
      expect(task.reviewFile).toBe(`src/app/practice/day-0${task.day}/${task.id}/review.ts`);
      expect(existsSync(resolve(task.reviewFile)), `Missing review file ${task.reviewFile}`).toBe(
        true,
      );
      expect(task.requirements.length).toBeGreaterThan(0);
      expect(task.prompt.trim().length).toBeGreaterThan(0);
      for (const file of task.files) {
        expect(AVAILABLE_EDITABLE_FILES.has(file), `Missing editable file ${file}`).toBe(true);
        expect(existsSync(resolve(file)), `Missing editable file ${file}`).toBe(true);
        expect(file).toContain(`/day-0${task.day}/${task.id}/`);
      }
    }
  });

  it('keeps review state and scores internally valid', () => {
    const tasks = PRACTICE_DAYS.flatMap((day) => day.tasks);

    for (const task of tasks) {
      if (task.review.status === 'pending') {
        expect(task.review.score).toBeNull();
        expect('optimalSolution' in task.review).toBe(false);
        continue;
      }

      expect([0, 1, 2, 3]).toContain(task.review.score);
      if (task.review.optimalSolution !== undefined) {
        expect(task.review.optimalSolution.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('keeps demo and focused-test metadata valid', () => {
    const tasks = PRACTICE_DAYS.flatMap((day) => day.tasks);

    for (const task of tasks) {
      const hasComponentDemo = task.demoComponent !== undefined;
      const hasHarnessDemo = task.runDemo !== undefined;
      expect(hasComponentDemo && hasHarnessDemo).toBe(false);

      if (task.demoInputs !== undefined) {
        expect(task.demoComponent).toBeDefined();
        expect(Object.keys(task.demoInputs).length).toBeGreaterThan(0);
      }

      const claimsTestPath = task.requirements.some((requirement) =>
        /\b(test|tests|tested|testing)\b/i.test(requirement),
      );
      if (claimsTestPath) {
        expect(task.testCommand, `${task.id} needs a focused test command`).toContain('--include');
        expect(task.files.some((file) => file.endsWith('.spec.ts'))).toBe(true);
      }
    }
  });
});
