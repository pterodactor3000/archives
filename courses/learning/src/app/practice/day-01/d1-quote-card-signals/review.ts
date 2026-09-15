import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `@Component({
  selector: 'app-quote-card',
  template: \`
    <button type="button" (click)="selectQuote()">
      {{ quote().symbol }}
      Bid {{ quote().bid }}
      Ask {{ quote().ask }}
      Spread {{ spread() }}
    </button>
  \`,
})
export class QuoteCard {
  readonly quote = input.required<Quote>();
  readonly selected = output<string>();
  readonly spread = computed(() => this.quote().ask - this.quote().bid);

  selectQuote(): void {
    this.selected.emit(this.quote().symbol);
  }
}`;

export const quoteCardSignalsReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'All task requirements are satisfied. The component uses current typed APIs, derives spread without duplicated state, renders every required value, and emits the symbol from a user event.',
  improvements: [
    'For production finance UI, decide and document rounding or decimal precision for spread values.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
