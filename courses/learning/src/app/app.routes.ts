import { Routes } from '@angular/router';
import { CourseComponent } from './pages/course.component';
import { DashboardComponent } from './pages/dashboard.component';
import { DayComponent } from './pages/day.component';
import { TaskComponent } from './pages/task.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'course', component: CourseComponent },
  { path: 'practice/day/:day', component: DayComponent },
  { path: 'practice/day/:day/task/:taskId', component: TaskComponent },
  {
    path: 'practice/order-ticket',
    loadChildren: () =>
      import('./practice/day-02/d2-order-ticket/order-ticket.routes').then(
        (module) => module.orderTicketRoutes,
      ),
  },
  {
    path: 'practice/lazy-states',
    loadChildren: () =>
      import('./practice/day-02/d2-lazy-routing-states/lazy-feature.routes').then(
        (module) => module.lazyFeatureRoutes,
      ),
  },
  { path: '**', redirectTo: '' },
];
