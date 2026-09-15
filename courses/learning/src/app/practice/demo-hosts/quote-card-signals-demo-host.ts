import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { QuoteCardSignalsExercise } from '../day-01/d1-quote-card-signals/solution';

@Component({
  selector: 'app-quote-card-signals-demo-host',
  imports: [QuoteCardSignalsExercise],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="exercise-demo">
      <app-quote-card-signals-exercise [quote]="quote" (selected)="selectedSymbol.set($event)" />
      <p aria-live="polite">Selected symbol: {{ selectedSymbol() || 'None' }}</p>
    </section>
  `,
})
export class QuoteCardSignalsDemoHost {
  readonly quote = {
    symbol: 'ACME',
    bid: 101.25,
    ask: 101.5,
  };
  readonly selectedSymbol = signal('');
}
