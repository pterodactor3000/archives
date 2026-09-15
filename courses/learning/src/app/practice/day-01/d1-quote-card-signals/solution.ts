import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

interface Quote {
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
}

@Component({
  selector: 'app-quote-card-signals-exercise',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="exercise-demo">
      <h3>Quote card starter</h3>
      <p>{{ quote().symbol }} | Bid {{ quote().bid }} | Ask {{ quote().ask }}</p>
      <p>Spread: {{ spread() }}</p>
      <button type="button" (click)="selectQuote()">Select quote</button>
    </section>
  `,
})
export class QuoteCardSignalsExercise {
  readonly quote = input.required<Quote>();
  readonly spread = computed(() => this.quote().ask - this.quote().bid);
  readonly selected = output<string>();

  selectQuote(): void {
    this.selected.emit(this.quote().symbol);
  }
}
