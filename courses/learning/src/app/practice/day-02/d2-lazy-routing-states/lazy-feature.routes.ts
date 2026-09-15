import { Routes } from '@angular/router';

export const lazyFeatureRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./solution').then((module) => module.LazyFeatureStarter),
  },
];
