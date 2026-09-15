import { TaskReview } from '../../task.model';

const OPTIMAL_SOLUTION = `export interface OrderDraft {
  readonly symbol: string;
  readonly quantity: number;
  readonly side: 'buy' | 'sell';
}

const SYMBOL_PATTERN = /^[A-Z]{1,5}$/;

export function isOrderDraftValid(order: OrderDraft): boolean {
  return (
    SYMBOL_PATTERN.test(order.symbol) &&
    Number.isFinite(order.quantity) &&
    order.quantity >= 1 &&
    (order.side === 'buy' || order.side === 'sell')
  );
}

describe('isOrderDraftValid', () => {
  it('accepts a form-valid draft and rejects invalid symbol, quantity, and side', () => {
    expect(isOrderDraftValid({ symbol: 'ACME', quantity: 2, side: 'buy' })).toBe(true);
    expect(isOrderDraftValid({ symbol: 'toolong', quantity: 2, side: 'buy' })).toBe(false);
    expect(isOrderDraftValid({ symbol: 'ACME', quantity: 0, side: 'buy' })).toBe(false);
    expect(
      isOrderDraftValid({ symbol: 'ACME', quantity: 2, side: 'hold' } as OrderDraft),
    ).toBe(false);
  });
});

describe('OrderTicketExercise', () => {
  it('submits a typed order with the account ID from the route', async () => {
    component.orderForm.setValue({ symbol: 'ACME', quantity: 10, side: 'buy' });
    component.submitOrder();
    await fixture.whenStable();
    expect(submitOrder).toHaveBeenCalledWith('account-42', {
      symbol: 'ACME',
      quantity: 10,
      side: 'buy',
    });
    expect(compiled.textContent).toContain('Order submitted');
  });

  it('renders an actionable message when the order service rejects', async () => {
    submitOrder.mockRejectedValueOnce(new Error('Market closed'));
    component.orderForm.setValue({ symbol: 'FAIL', quantity: 12, side: 'sell' });
    component.submitOrder();
    await fixture.whenStable();
    expect(compiled.textContent).toContain('Market closed');
  });
});`;

export const testSuiteReview: TaskReview = {
  status: 'reviewed',
  score: 3,
  criticism:
    'All task requirements are met. isOrderDraftValid is tested on its own, and the component tests cover valid submit, blocked invalid input, and a rejected service call through visible text. The validator test name claims it rejects a bad side, but that case is missing. The failed-service test still matches only the generic prefix, not Market closed. Quantity uses > 0, which is looser than the form min of 1.',
  improvements: [
    'Add a bad-side case to the isOrderDraftValid test, or drop side from the test name.',
    'Use Number.isFinite(order.quantity) && order.quantity >= 1 so 0.5 and Infinity fail like Validators.min(1).',
    'Assert Market closed in the reject test, not only Something went wrong!',
  ],
  optimalSolution: OPTIMAL_SOLUTION,
};
