import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `type TicketStatus =
  | { readonly kind: 'idle' }
  | { readonly kind: 'invalid'; readonly message: string }
  | { readonly kind: 'submitted'; readonly orderId: string }
  | { readonly kind: 'failed'; readonly message: string };

function isOrderSide(value: string): value is OrderSide {
  return value === 'buy' || value === 'sell';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseOrderResponse(payload: unknown): OrderResponse | null {
  if (!isRecord(payload)) return null;
  if (typeof payload.orderId !== 'string' || payload.orderId === '') return null;
  if (payload.status !== 'accepted') return null;
  return { orderId: payload.orderId, status: payload.status };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Order submission failed.';
}

@Component({
  selector: 'app-order-ticket-exercise',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <form class="exercise-demo" [formGroup]="orderForm" (ngSubmit)="submitOrder()">
      <h3>Order ticket</h3>
      <label>
        Symbol
        <input type="text" formControlName="symbol" />
      </label>
      <label>
        Quantity
        <input type="number" formControlName="quantity" min="1" />
      </label>
      <label>
        Buy
        <input type="radio" formControlName="side" value="buy" />
      </label>
      <label>
        Sell
        <input type="radio" formControlName="side" value="sell" />
      </label>
      <button type="submit">Submit order</button>
      <p aria-live="polite">{{ statusMessage() }}</p>
    </form>
  \`,
})
export class OrderTicketExercise {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(ORDER_SERVICE);
  private readonly ticketStatus = signal<TicketStatus>({ kind: 'idle' });

  readonly orderForm = new FormGroup({
    symbol: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Z]{1,5}$/)],
    }),
    quantity: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    side: new FormControl<OrderSide>('buy', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly statusMessage = computed(() => {
    const status = this.ticketStatus();
    switch (status.kind) {
      case 'idle':
        return 'Not submitted.';
      case 'invalid':
        return status.message;
      case 'submitted':
        return \`Order submitted. \${status.orderId}\`;
      case 'failed':
        return status.message;
      default: {
        const unhandledStatus: never = status;
        throw new Error(\`Unhandled ticket status: \${JSON.stringify(unhandledStatus)}\`);
      }
    }
  });

  submitOrder(): void {
    const accountId = this.activatedRoute.snapshot.paramMap.get('accountId');
    if (accountId === null || accountId === '') {
      this.ticketStatus.set({
        kind: 'invalid',
        message: 'Account ID is invalid or missing.',
      });
      return;
    }

    if (!this.orderForm.controls.quantity.valid) {
      this.ticketStatus.set({
        kind: 'invalid',
        message: \`Order quantity (\${this.orderForm.controls.quantity.value}) is invalid.\`,
      });
      return;
    }

    if (!this.orderForm.controls.symbol.valid) {
      this.ticketStatus.set({
        kind: 'invalid',
        message: \`Order symbol (\${this.orderForm.controls.symbol.value}) is invalid.\`,
      });
      return;
    }

    const side = this.orderForm.controls.side.value;
    if (!isOrderSide(side)) {
      this.ticketStatus.set({
        kind: 'invalid',
        message: \`Order side (\${side}) is invalid.\`,
      });
      return;
    }

    const orderDraft: OrderDraft = {
      symbol: this.orderForm.controls.symbol.value,
      quantity: this.orderForm.controls.quantity.value,
      side,
    };

    this.orderService
      .submitOrder(accountId, orderDraft)
      .then((payload: unknown) => {
        const acceptedOrder = parseOrderResponse(payload);
        if (acceptedOrder === null) {
          this.ticketStatus.set({
            kind: 'failed',
            message: 'Service returned an unrecognized order payload.',
          });
          return;
        }
        this.ticketStatus.set({ kind: 'submitted', orderId: acceptedOrder.orderId });
      })
      .catch((error: unknown) => {
        this.ticketStatus.set({ kind: 'failed', message: getErrorMessage(error) });
      });
  }
}`;

export const orderTicketReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'All task requirements are met. Non-nullable controls, a parsed unknown payload, idle/invalid/submitted/failed as a discriminated union, a route account ID, and the service boundary are in place. The three focused tests pass. Side is still asserted, a parse miss still throws into catch, and the live demo host will throw because submit reads snapshot.params while the host only stubs paramMap.',
  improvements: [
    'Narrow side with a type guard and type the control as FormControl<OrderSide>. Remove as \'buy\' | \'sell\'.',
    'When parseResponse returns null, set { kind: \'failed\' } directly. Do not throw into catch.',
    'Read accountId from snapshot.paramMap.get so the live demo host works.',
    'Type the catch value as unknown and use instanceof Error. Assert Market closed in the reject test.',
    'Mark kind readonly on every OrderState variant, matching message and orderId.',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
