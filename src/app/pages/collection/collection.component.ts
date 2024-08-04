import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { defer, finalize, tap } from 'rxjs';
import { Item } from 'warframe-items';
import { CollectionCardComponent } from './collection-card/collection-card.component';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CollectionCardComponent, HlmSpinnerComponent, HlmSkeletonComponent],
  templateUrl: `./collection.component.html`,
  styleUrl: './collection.component.scss',
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  readonly LOADER_SECTIONS = new Array(20).fill(null);
  private readonly http = inject(HttpClient);

  readonly loading = signal(true);
  readonly warframes = toSignal(this.getWarframes());

  private getWarframes() {
    return defer(() => {
      this.loading.set(true);
      return this.http.get<Item[]>('/api/warframes');
    }).pipe(
      tap(console.log),
      finalize(() => this.loading.set(false)),
    );
  }
}
