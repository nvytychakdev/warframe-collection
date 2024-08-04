import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import {
  lucideBadgeAlert,
  lucideBadgeCheck,
  lucideBadgeX,
} from '@ng-icons/lucide';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { WARFRAME_CDN } from 'src/app/configs/warframe.model';
import { Item } from 'warframe-items';
import { WarframeStateComponent } from '../warframe-state/warframe-state.component';

@Component({
  selector: 'app-warframe-card',
  standalone: true,
  imports: [HlmSpinnerComponent, NgClass, WarframeStateComponent],
  providers: [
    provideIcons({ lucideBadgeX, lucideBadgeAlert, lucideBadgeCheck }),
  ],
  templateUrl: './warframe-card.component.html',
  styleUrl: './warframe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarframeCardComponent {
  readonly item = input.required<Item>();
  readonly state = model<'pending' | 'inprogress' | 'done'>('pending');
  readonly previewLoaded = signal(false);
  readonly previewLink = computed(() => {
    const item = this.item();
    if ('wikiaThumbnail' in item) {
      const [image] = `${item.wikiaThumbnail}`.split('.png');
      return `${image}.png`;
    }

    return `${WARFRAME_CDN}/${item.imageName}`;
  });

  // toggleState() {
  //   const state = this.state();
  //   switch (state) {
  //     case 'pending':
  //       this.state.set('inprogress');
  //       break;
  //     case 'inprogress':
  //       this.state.set('done');
  //       break;

  //     default:
  //       this.state.set('pending');
  //   }
  // }
}
