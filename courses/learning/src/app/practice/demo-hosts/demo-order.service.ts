import { Injectable } from '@angular/core';
import { OrderDraft, OrderService } from '../day-02/d2-order-ticket/order.service';

@Injectable()
export class DemoOrderService implements OrderService {
  submitOrder(accountId: string, order: OrderDraft): Promise<unknown> {
    if (order.symbol === 'FAIL') {
      return Promise.reject(
        new Error(
          `Demo order submission failed for account ${accountId} and symbol ${order.symbol}.`,
        ),
      );
    }

    return Promise.resolve({
      orderId: `${accountId}-${order.symbol}-${order.quantity}`,
      status: 'accepted',
    });
  }
}
