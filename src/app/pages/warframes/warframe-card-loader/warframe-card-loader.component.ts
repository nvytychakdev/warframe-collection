import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';

@Component({
  selector: 'app-warframe-card-loader',
  standalone: true,
  imports: [HlmSkeletonComponent],
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './warframe-card-loader.component.html',
  styleUrl: './warframe-card-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarframeCardLoaderComponent {}
