import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `export type LazyViewState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'error'; readonly message: string }
  | { readonly kind: 'empty' }
  | { readonly kind: 'ready'; readonly symbols: readonly string[] };

@Component({
  selector: 'app-lazy-feature',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
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
  \`,
})
export class LazyFeatureStarter {
  readonly viewState = signal<LazyViewState>({ kind: 'loading' });
}

export const lazyFeatureRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./solution').then((module) => module.LazyFeatureStarter),
  },
];`;

export const lazyRoutingStatesReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'loadComponent lazy-loads LazyFeatureStarter at the feature route. LazyViewState is a four-kind union, and the template aliases the signal then switches on kind so error.message and ready.symbols are only read on those variants. No canActivate guard pretends to be authorization. Both focused tests passed: lazy navigation shows loading text, and setting error, empty, and ready updates the DOM. The live page stays on loading because nothing ever sets another kind.',
  improvements: [
    '/practice/lazy-states never leaves loading in the browser. Tests set the other kinds. That is enough for this drill. A one-shot fake load would let you see empty and error without opening the spec.',
    'Say out loud once: a route guard only stops the client router. The server still has to deny unauthorized reads.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
