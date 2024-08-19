import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { type Item } from 'warframe-items';
import { getItemPreview, getItemProgressState } from '../warframes.model';

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
  readonly previewLink = computed(() => getItemPreview(this.item()));

  toggleState() {
    const newState = getItemProgressState(this.state());
    this.state.set(newState);
  }
}
