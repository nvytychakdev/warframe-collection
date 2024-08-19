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
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { type Item, type Warframe } from 'warframe-items';
import { WarframeCardPartComponent } from '../warframe-card-part/warframe-card-part.component';
import { WarframeStateComponent } from '../warframe-state/warframe-state.component';
import {
  ProgressState,
  WarframeProgress,
  getItemPreview,
  getWarframeProgress,
} from '../warframes.model';

@Component({
  selector: 'app-warframe-card',
  standalone: true,
  imports: [
    HlmSpinnerComponent,
    NgClass,
    WarframeStateComponent,
    WarframeCardPartComponent,
    HlmBadgeDirective,
  ],
  providers: [
    provideIcons({ lucideBadgeX, lucideBadgeAlert, lucideBadgeCheck }),
  ],
  templateUrl: './warframe-card.component.html',
  styleUrl: './warframe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarframeCardComponent {
  readonly warframe = input.required<Warframe>();
  readonly warframeProgress = model<WarframeProgress>();
  readonly warframeComponents = computed(() =>
    this.warframe().components?.filter((part) =>
      part.uniqueName.includes('Recipes'),
    ),
  );
  readonly previewLoaded = signal(false);
  readonly previewLink = computed(() => getItemPreview(this.warframe()));

  /**
   *
   * @param component
   * @param progress
   */
  onComponentProgress(component: Item, state: ProgressState) {
    const currentProgress = this.warframeProgress();
    const { components, progress } = getWarframeProgress(
      component,
      state,
      this.warframeComponents(),
      currentProgress,
    );

    this.warframeProgress.set({
      components,
      progress,
    });
  }

  openBase64InNewTab(data: string) {
    window.open(data);
  }
}
