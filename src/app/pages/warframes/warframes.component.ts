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
import { Observable, defer, finalize, tap } from 'rxjs';
import { StorageService } from 'src/app/core';
import type { Warframe } from 'warframe-items';
import { WarframeCardLoaderComponent } from './warframe-card-loader/warframe-card-loader.component';
import { WarframeCardComponent } from './warframe-card/warframe-card.component';
import { WarframeProgress } from './warframes.model';

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
  private readonly _storage = inject(StorageService);
  readonly LOADER_SECTIONS = new Array(20).fill(null);
  private readonly http = inject(HttpClient);

  readonly loading = signal(true);
  readonly warframes = toSignal(this.getWarframes());

  private getWarframes(): Observable<Warframe[]> {
    return defer(() => {
      this.loading.set(true);
      return this.http.get<Warframe[]>('/api/warframes');
    }).pipe(
      tap(console.log),
      finalize(() => this.loading.set(false)),
    );
  }

  onWarframeStateChange(warframe: Warframe, state?: WarframeProgress) {
    console.log(warframe, state);
    // const transaction = this._storage.getTransaction('warframe_state');
    // console.log(transaction);
    // if (!transaction) return;
    // const storage = this._storage.craeteStore('warframes');
    // const data = { name: warframe.uniqueName, state };
    // if (!storage) return;
    // this._storage.add(storage, data).subscribe(console.log);
    // storage.get('warframes');
  }
}
