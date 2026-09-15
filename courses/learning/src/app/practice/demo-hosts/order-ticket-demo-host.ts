import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { OrderTicketExercise } from '../day-02/d2-order-ticket/solution';
import { ORDER_SERVICE } from '../day-02/d2-order-ticket/order.service';
import { DemoOrderService } from './demo-order.service';

@Component({
  selector: 'app-order-ticket-demo-host',
  imports: [OrderTicketExercise],
  providers: [
    DemoOrderService,
    { provide: ORDER_SERVICE, useExisting: DemoOrderService },
    {
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: convertToParamMap({ accountId: 'practice-account' }),
        },
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="exercise-demo">
      <p>Route account: practice-account</p>
      <p>Use symbol FAIL to exercise service failure.</p>
      <app-order-ticket-exercise />
    </section>
  `,
})
export class OrderTicketDemoHost {}
