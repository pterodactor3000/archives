import { Routes } from '@angular/router';
import { DemoOrderService } from '../../demo-hosts/demo-order.service';
import { ORDER_SERVICE } from './order.service';

export const orderTicketRoutes: Routes = [
  {
    path: ':accountId',
    providers: [DemoOrderService, { provide: ORDER_SERVICE, useExisting: DemoOrderService }],
    loadComponent: () => import('./solution').then((module) => module.OrderTicketExercise),
  },
];
