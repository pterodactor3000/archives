import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDraft, ORDER_SERVICE, OrderResponse } from './order.service';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const parseResponse = (response: unknown): OrderResponse | null => {
  if (!isRecord(response)) {
    return null;
  }
  if (typeof response['orderId'] !== 'string' || response['orderId'] === '') {
    return null;
  }
  if (response['status'] !== 'accepted') return null;
  return {
    orderId: response['orderId'],
    status: response['status'],
  };
};

type Idle = {
  kind: 'idle';
};
type Invalid = {
  kind: 'invalid';
  readonly message: string;
};
type Submitted = {
  kind: 'submitted';
  readonly orderId: string;
};
type Failed = {
  kind: 'failed';
  readonly message: string;
};

type OrderState = Idle | Invalid | Submitted | Failed;

@Component({
  selector: 'app-order-ticket-exercise',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="exercise-demo" [formGroup]="orderForm" (ngSubmit)="submitOrder()">
      <h3>Order ticket starter</h3>
      <label>
        Symbol
        <input type="text" formControlName="symbol" data-testid="symbol" />
      </label>
      <label>
        Quantity
        <input type="number" formControlName="quantity" min="1" data-testid="quantity" />
      </label>
      <label>
        Buy
        <input type="radio" formControlName="side" value="buy" data-testid="buy" />
      </label>
      <label>
        Sell
        <input type="radio" formControlName="side" value="sell" data-testid="sell" />
      </label>
      <button type="submit">Submit order</button>
      <p aria-live="polite">{{ statusMessage() }}</p>
    </form>
  `,
})
export class OrderTicketExercise {
  private activatedRoute = inject(ActivatedRoute);
  private orderStore = inject(ORDER_SERVICE);

  private readonly orderState = signal<OrderState>({ kind: 'idle' });

  readonly statusMessage = computed(() => {
    const state = this.orderState();
    switch (state.kind) {
      case 'idle':
        return 'Not submitted';
      case 'invalid':
        return state.message;
      case 'failed':
        return state.message;
      case 'submitted':
        return `${state.orderId} Order submitted.`;
      default:
        const unhandled: never = state;
        throw new Error(`Unhandled order state: ${JSON.stringify(unhandled)}`);
    }
  });

  readonly orderForm = new FormGroup({
    symbol: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Z]{1,5}$/)],
    }),
    quantity: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    side: new FormControl('buy', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/(sell)\b|(buy)\b/)],
    }),
  });

  submitOrder(): void {
    const accountId = this.activatedRoute.snapshot.params['accountId'];

    if (accountId === undefined) {
      this.orderState.set({ kind: 'invalid', message: 'Account ID in invalid or missing.' });
      return;
    }

    if (!this.orderForm.controls.quantity.valid) {
      this.orderState.set({
        kind: 'invalid',
        message: `Order quantity (${this.orderForm.controls.quantity.value}) is invalid.`,
      });
      return;
    }

    if (!this.orderForm.controls.symbol.valid) {
      this.orderState.set({
        kind: 'invalid',
        message: `Order symbol (${this.orderForm.controls.symbol.value}) is invalid.`,
      });
      return;
    }

    if (!this.orderForm.controls.side.valid) {
      this.orderState.set({
        kind: 'invalid',
        message: `Order side (${this.orderForm.controls.side.value}) is invalid.`,
      });
      return;
    }

    const orderData: OrderDraft = {
      quantity: this.orderForm.controls.quantity.value,
      symbol: this.orderForm.controls.symbol.value,
      side: this.orderForm.controls.side.value as 'buy' | 'sell',
    };

    this.orderStore
      .submitOrder(accountId, orderData)
      .then((response) => {
        const res = parseResponse(response);
        if (res === null) {
          throw new Error('Something went wrong! Response from the service is bad!');
        }
        this.orderState.set({ kind: 'submitted', orderId: res.orderId });
      })
      .catch((error) =>
        this.orderState.set({ kind: 'failed', message: `Something went wrong! ${error.message}` }),
      );
  }
}
