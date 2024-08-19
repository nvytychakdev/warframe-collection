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
import { WARFRAME_CDN } from 'src/app/configs/warframe.model';
import { type Item, type Warframe } from 'warframe-items';
import { WarframeCardPartComponent } from '../warframe-card-part/warframe-card-part.component';
import { WarframeStateComponent } from '../warframe-state/warframe-state.component';
import { ProgressState, WarframeProgress } from '../warframes.model';

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
  readonly previewLink = computed(() => {
    const item = this.warframe();
    if ('wikiaThumbnail' in item) {
      const [image] = `${item.wikiaThumbnail}`.split('.png');
      return `${image}.png`;
    }

    return `${WARFRAME_CDN}/${item.imageName}`;
  });

  /**
   *
   * @param component
   * @param progress
   */
  onComponentProgress(component: Item, state: ProgressState) {
    const currentProgress = this.warframeProgress();

    const components = {
      ...currentProgress?.components,
      [component.uniqueName || '']: state,
    };

    const isAllDone =
      Object.entries(components).length === this.warframeComponents()?.length &&
      Object.values(components).every((s) => s === 'done');

    const isInProgress = Object.values(components).some(
      (s) => s === 'inprogress' || s === 'done',
    );

    const progress = isAllDone
      ? 'done'
      : isInProgress
        ? 'inprogress'
        : 'pending';

    this.warframeProgress.set({
      components,
      progress,
    });
  }
}
