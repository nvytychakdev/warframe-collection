import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { WARFRAME_CDN } from 'src/app/configs/warframe.model';
import { Item } from 'warframe-items';

@Component({
  selector: 'app-collection-card',
  imports: [HlmSpinnerComponent, NgClass],
  standalone: true,
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardComponent {
  readonly item = input.required<Item>();
  readonly state = signal<'pending' | 'inprogress' | 'done'>('pending');
  readonly previewLoaded = signal(false);
  readonly previewLink = computed(() => {
    const item = this.item();
    if ('wikiaThumbnail' in item) {
      const [image] = `${item.wikiaThumbnail}`.split('.png');
      return `${image}.png`;
    }

    return `${WARFRAME_CDN}/${item.imageName}`;
  });

  toggleState() {
    const state = this.state();
    switch (state) {
      case 'pending':
        this.state.set('inprogress');
        break;
      case 'inprogress':
        this.state.set('done');
        break;

      default:
        this.state.set('pending');
    }
  }
}
