import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface Order {
  readonly id: string;
  readonly symbol: string;
  readonly quantity: number;
}

@Component({
  selector: 'app-mock-live-coding-exercise',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="exercise-demo">
      <h3>Order blotter mock</h3>
      <p>Visible quantity: {{ visibleQuantity() }}</p>
      <ul>
        @for (order of orders(); track order.id) {
          <li>{{ order.symbol }}: {{ order.quantity }}</li>
        }
      </ul>
      <button type="button" (click)="addOrder()">Add sample order</button>
    </section>
  `,
})
export class MockLiveCodingExercise {
  readonly orders = signal<readonly Order[]>([]);
  readonly visibleQuantity = computed(() => 0);

  addOrder(): void {
    // TODO: Add immutable state, validation, filtering, and tests during the mock hour.
  }
}
