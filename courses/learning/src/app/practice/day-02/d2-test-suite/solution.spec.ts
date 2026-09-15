import { describe, it } from 'vitest';
import { OrderTicketExercise } from '../d2-order-ticket/solution';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ORDER_SERVICE, OrderService } from '../d2-order-ticket/order.service';
import { ActivatedRoute } from '@angular/router';
import { isOrderDraftValid } from './order-validator';

const submitOrder = vi.fn<OrderService['submitOrder']>().mockResolvedValue({
  orderId: 'order-123',
  status: 'accepted',
});

const activatedRouteStub = {
  snapshot: {
    params: { accountId: 'account-42' },
  },
};

describe('OrderTicketExercise', () => {
  let component: OrderTicketExercise;
  let fixture: ComponentFixture<OrderTicketExercise>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTicketExercise],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ORDER_SERVICE, useValue: { submitOrder } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTicketExercise);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(async () => {
    submitOrder.mockClear();
  });

  it('submits a typed order with the account ID from the route', async () => {
    const properValue = {
      symbol: 'BUY',
      quantity: 23,
      side: 'buy',
    };

    component.orderForm.setValue(properValue);

    component.submitOrder();
    await fixture.whenStable();

    expect(submitOrder).toHaveBeenCalledWith(
      activatedRouteStub.snapshot.params.accountId,
      properValue,
    );
    expect(compiled.textContent).toContain('Order submitted');
  });

  it('blocks submission when order fields are invalid', async () => {
    const notProperValue = {
      symbol: 'BUYYYYY',
      quantity: -23,
      side: 'think',
    };
    component.orderForm.setValue(notProperValue);

    component.submitOrder();
    await fixture.whenStable();

    expect(submitOrder).not.toHaveBeenCalled();
    expect(compiled.textContent).toContain(' is invalid.');
  });

  it('renders an actionable message when the order service rejects', async () => {
    submitOrder.mockRejectedValueOnce(new Error('Market closed'));

    const failValue = {
      symbol: 'FAIL',
      quantity: 12,
      side: 'sell',
    };
    component.orderForm.setValue(failValue);

    component.submitOrder();
    await fixture.whenStable();

    expect(submitOrder).toHaveBeenCalledWith(
      activatedRouteStub.snapshot.params.accountId,
      failValue,
    );
    expect(compiled.textContent).toContain('Something went wrong!');
  });
});

describe('isOrderDraftValid', () => {
  it('accepts a form-valid draft and rejects bad symbol, quantity, and side', () => {
    expect(isOrderDraftValid({ symbol: 'ACME', quantity: 2, side: 'buy' })).toBe(true);
    expect(isOrderDraftValid({ symbol: 'toolong', quantity: 2, side: 'buy' })).toBe(false);
    expect(isOrderDraftValid({ symbol: 'ACME', quantity: 0, side: 'buy' })).toBe(false);
  });
});
