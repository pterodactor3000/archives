import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-lazy-feature-starter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="exercise-demo" aria-live="polite">
      @if (viewState(); as state) {
        @switch (state.kind) {
          @case ('loading') {
            <p>Loading orders...</p>
          }
          @case ('error') {
            <p role="alert">Could not load orders: {{ state.message }}</p>
          }
          @case ('empty') {
            <p>No orders found.</p>
          }
          @case ('ready') {
            <ul>
              @for (symbol of state.symbols; track symbol) {
                <li>{{ symbol }}</li>
              }
            </ul>
          }
        }
      }
    </section>
  `,
})
export class LazyFeatureStarter {
  readonly viewState = signal<LazyViewState>({ kind: 'loading' });
}

export type LazyViewState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'error'; readonly message: string }
  | { readonly kind: 'empty' }
  | { readonly kind: 'ready'; readonly symbols: readonly string[] };
