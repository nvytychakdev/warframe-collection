import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BrnRadioComponent,
  BrnRadioGroupComponent,
} from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
} from '@spartan-ng/ui-radiogroup-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { defer, finalize, tap } from 'rxjs';
import { Item } from 'warframe-items';
import { WarframeCardLoaderComponent } from './warframe-card-loader/warframe-card-loader.component';
import { WarframeCardComponent } from './warframe-card/warframe-card.component';

@Component({
  selector: 'app-warframes',
  standalone: true,
  imports: [
    HlmSpinnerComponent,
    HlmSkeletonComponent,
    HlmRadioGroupDirective,
    HlmRadioDirective,
    BrnRadioComponent,
    BrnRadioGroupComponent,
    WarframeCardComponent,
    WarframeCardLoaderComponent,
  ],
  templateUrl: './warframes.component.html',
  styleUrl: './warframes.component.scss',
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
export class WarframesComponent {
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
