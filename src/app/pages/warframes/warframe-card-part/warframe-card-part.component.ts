import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { WARFRAME_CDN } from 'src/app/configs/warframe.model';
import { type Item } from 'warframe-items';

@Component({
  selector: 'app-warframe-card-part',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warframe-card-part.component.html',
  styleUrl: './warframe-card-part.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarframeCardPartComponent {
  readonly item = input.required<Item>();
  readonly state = model<'pending' | 'inprogress' | 'done'>('pending');
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
