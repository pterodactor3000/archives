import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { LazyFeatureStarter } from './solution';

describe('lazy routing states scaffold', () => {
  it('loads the feature through a lazy route', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'orders',
            loadChildren: () =>
              import('./lazy-feature.routes').then((module) => module.lazyFeatureRoutes),
          },
        ]),
      ],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/orders', LazyFeatureStarter);

    expect(harness.routeNativeElement?.textContent).toContain('Loading orders');
  });

  it('renders error, empty, and ready states explicitly', async () => {
    const fixture = TestBed.createComponent(LazyFeatureStarter);
    await fixture.whenStable();
    const hostElement: HTMLElement = fixture.nativeElement;

    fixture.componentInstance.viewState.set({ kind: 'error', message: 'Timed out' });
    fixture.detectChanges();
    expect(hostElement.textContent).toContain('Could not load orders: Timed out');

    fixture.componentInstance.viewState.set({ kind: 'empty' });
    fixture.detectChanges();
    expect(hostElement.textContent).toContain('No orders found');

    fixture.componentInstance.viewState.set({ kind: 'ready', symbols: ['ACME'] });
    fixture.detectChanges();
    expect(hostElement.textContent).toContain('ACME');
  });
});
