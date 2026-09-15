import { computed, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, Subscription } from 'rxjs';

const bid = signal(100);
const ask = signal(101);

// BUG: This value goes stale after bid or ask changes.
export const staleSpread = computed(() => ask() - bid());

// TODO: Replace staleSpread with derived state.
export const expectedSpread = computed(() => ask() - bid());

export function startLeakingPriceSubscription(destroyRef: DestroyRef): Subscription {
  // BUG: A component calling this without teardown leaks work.
  return interval(1000).pipe(takeUntilDestroyed(destroyRef)).subscribe();
}

export const unsafeTemplateSnippet =
  '<section [innerHTML]="trustedHtmlFromUnknownServerValue"></section>';
export const safeTemplateTarget = '<section>{{ externalServerText }}</section>';

export function runDebugRoundDemo(): readonly string[] {
  bid.set(102);
  ask.set(103.5);
  return [
    `Stale spread: ${staleSpread()}`,
    `Expected derived spread after fix: ${expectedSpread()}`,
    `Unsafe binding to replace: ${unsafeTemplateSnippet}`,
    `Safe text-binding target: ${safeTemplateTarget}`,
  ];
}
