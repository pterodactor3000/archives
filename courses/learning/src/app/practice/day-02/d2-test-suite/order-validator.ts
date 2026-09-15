export interface OrderDraft {
  readonly symbol: string;
  readonly quantity: number;
  readonly side: 'buy' | 'sell';
}

export function isOrderDraftValid(order: OrderDraft): boolean {
  return (
    !!order.symbol.match(/^[A-Z]{1,5}$/) &&
    order.quantity > 0 &&
    (order.side === 'buy' || order.side === 'sell')
  );
}
