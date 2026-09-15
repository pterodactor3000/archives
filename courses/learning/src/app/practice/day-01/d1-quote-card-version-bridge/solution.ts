import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  Output,
  output,
} from '@angular/core';

interface Quote {
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
}

@Component({
  selector: 'app-quote-card-current-structure',
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
export class QuoteCardCurrent {
  readonly quote = input.required<Quote>();
  readonly spread = computed(() => this.quote().ask - this.quote().bid);
  readonly selected = output<string>();

  selectQuote(): void {
    this.selected.emit(this.quote().symbol);
  }
}

@Component({
  selector: 'app-quote-card-old-structure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="exercise-demo">
      <h3>Quote card starter Old boy</h3>
      <p>{{ quote.symbol }} | Bid {{ quote.bid }} | Ask {{ quote.ask }}</p>
      <p>Spread: {{ spread }}</p>
      <button type="button" (click)="selectQuote()">Select quote</button>
    </section>
  `,
})
export class QuoteCardOld {
  @Output() readonly selected = new EventEmitter<string>();
  @Input({ required: true }) quote!: Quote;

  get spread(): number {
    return this.quote.ask - this.quote.bid;
  }

  selectQuote(): void {
    this.selected.emit(this.quote.symbol);
  }
}

@Component({
  selector: 'app-quote-version-bridge-exercise',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuoteCardCurrent, QuoteCardOld],
  template: `
    <section class="exercise-demo">
      <h3>Version bridge starter</h3>
      <section>
        <app-quote-card-current-structure
          [quote]="{ symbol: 'Somebol', bid: 123, ask: 102 }"
          (selected)="selectedCurrent($event)"
        />
        <p>
          <b>Selected: {{ setCurrentSelection }}</b>
        </p>
      </section>
      <section>
        <app-quote-card-old-structure
          [quote]="{ symbol: 'Somebol', bid: 123, ask: 102 }"
          (selected)="selectedOld($event)"
        />
        <p>
          <b>Selected: {{ setAngular16Selection }}</b>
        </p>
      </section>
    </section>
  `,
})
export class QuoteVersionBridgeExercise {
  setCurrentSelection = '';
  setAngular16Selection = '';

  selectedCurrent(value: string) {
    this.setCurrentSelection = value;
  }

  selectedOld(value: string) {
    this.setAngular16Selection = value;
  }
}
// TypeScript interfaces and type arguments are compile-time only and are erased.
// input, output, computed, EventEmitter, and component instances exist at runtime.
// Angular compiles @Input and @Output metadata into definitions used at runtime.
