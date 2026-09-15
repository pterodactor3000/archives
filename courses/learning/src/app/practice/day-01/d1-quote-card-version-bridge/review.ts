import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `interface Quote {
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
}

@Component({
  selector: 'app-current-quote-card',
  template: \`
    <button type="button" (click)="selectQuote()">
      {{ quote().symbol }}
      Spread: {{ spread() }}
    </button>
  \`,
})
export class CurrentQuoteCard {
  readonly quote = input.required<Quote>();
  readonly selected = output<string>();
  readonly spread = computed(() => this.quote().ask - this.quote().bid);

  selectQuote(): void {
    this.selected.emit(this.quote().symbol);
  }
}

@Component({
  selector: 'app-angular-16-quote-card',
  standalone: true,
  template: \`
    <button type="button" (click)="selectQuote()">
      {{ quote.symbol }}
      Spread: {{ spread }}
    </button>
  \`,
})
export class Angular16QuoteCard {
  @Input({ required: true }) quote!: Quote;
  @Output() readonly selected = new EventEmitter<string>();

  get spread(): number {
    return this.quote.ask - this.quote.bid;
  }

  selectQuote(): void {
    this.selected.emit(this.quote.symbol);
  }
}

@Component({
  imports: [CurrentQuoteCard, Angular16QuoteCard],
  template: \`
    <app-current-quote-card
      [quote]="quote"
      (selected)="setCurrentSelection($event)"
    />
    <app-angular-16-quote-card
      [quote]="quote"
      (selected)="setAngular16Selection($event)"
    />
    <p>Current selected: {{ currentSelection() }}</p>
    <p>Angular 16 selected: {{ angular16Selection() }}</p>
  \`,
})
export class QuoteVersionBridge {
  readonly quote: Quote = { symbol: 'ACME', bid: 101.25, ask: 101.5 };
  readonly currentSelection = signal('');
  readonly angular16Selection = signal('');

  setCurrentSelection(symbol: string): void {
    this.currentSelection.set(symbol);
  }

  setAngular16Selection(symbol: string): void {
    this.angular16Selection.set(symbol);
  }
}

// TypeScript interfaces and type arguments are compile-time only and are erased.
// input, output, computed, EventEmitter, and component instances exist at runtime.
// Angular compiles @Input and @Output metadata into definitions used at runtime.`;

export const quoteVersionBridgeReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'All task requirements now pass. Both versions derive the same spread without duplicate state, expose equivalent required inputs and typed outputs, share a fixture, and include an accurate compile-time versus runtime explanation.',
  improvements: [
    'Name stored values currentSelection and angular16Selection.',
    'Name handlers setCurrentSelection and setAngular16Selection, and give them explicit void return types.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
