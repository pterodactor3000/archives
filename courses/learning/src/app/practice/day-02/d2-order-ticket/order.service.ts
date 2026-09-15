import { InjectionToken } from '@angular/core';

export type OrderSide = 'buy' | 'sell';

export interface OrderDraft {
  readonly symbol: string;
  readonly quantity: number;
  readonly side: OrderSide;
}

export interface OrderResponse {
  orderId: string;
  status: 'accepted';
}

export interface OrderService {
  submitOrder(accountId: string, order: OrderDraft): Promise<unknown>;
}

export const ORDER_SERVICE = new InjectionToken<OrderService>('ORDER_SERVICE');
