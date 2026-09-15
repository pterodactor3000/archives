import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `import { computed, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, Subscription } from 'rxjs';

const bid = signal(100);
const ask = signal(101);

export const expectedSpread = computed(() => ask() - bid());

export function startPriceSubscription(destroyRef: DestroyRef): Subscription {
  return interval(1000).pipe(takeUntilDestroyed(destroyRef)).subscribe();
}

export const unsafeTemplateSnippet =
  '<section [innerHTML]="trustedHtmlFromUnknownServerValue"></section>';
export const safeTemplateTarget = '<section>{{ externalServerText }}</section>';

export function runDebugRoundDemo(): readonly string[] {
  bid.set(102);
  ask.set(103.5);
  return [
    \`Expected derived spread after fix: \${expectedSpread()}\`,
    \`Unsafe binding to replace: \${unsafeTemplateSnippet}\`,
    \`Safe text-binding target: \${safeTemplateTarget}\`,
  ];
}`;

export const debugRoundReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'Spread uses computed, so bid/ask updates recalculate it. The interval takes DestroyRef and takeUntilDestroyed, so the timer dies with the owner. The demo keeps {{ externalServerText }} as the safe binding and leaves [innerHTML] labeled as the thing to replace. notes.md covers why the snapshot, the leaked subscribe, and innerHTML were risky. BUG and TODO comments still describe the starter, not the current code.',
  improvements: [
    'Delete the BUG and TODO comments. They now describe code that is already fixed.',
    'staleSpread and expectedSpread are the same computed. Keep one derived value.',
    'Rename startLeakingPriceSubscription. The leak is gone.',
    'Empty subscribe() is enough for this teardown drill. A real price feed would pass a next handler.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
