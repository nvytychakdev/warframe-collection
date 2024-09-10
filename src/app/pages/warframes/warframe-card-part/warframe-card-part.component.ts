import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Warframe, type Item } from 'warframe-items';
import {
  ProgressState,
  getItemPreview,
  getItemProgressState,
} from '../warframes.model';

@Component({
  selector: 'app-warframe-card-part',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warframe-card-part.component.html',
  styleUrl: './warframe-card-part.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarframeCardPartComponent {
  readonly warframe = input.required<Warframe>();
  readonly item = input.required<Item>();
  readonly state = model<ProgressState>('pending');
  readonly previewLink = computed(() => getItemPreview(this.item()));
  readonly blueprintPreviewLink = computed(() => {
    if (this.item().name === 'Blueprint') {
      return getItemPreview(this.warframe());
    }
    return undefined;
  });

  toggleState() {
    const newState = getItemProgressState(this.state());
    this.state.set(newState);
  }
}
