import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
  BrnRadioComponent,
  BrnRadioGroupComponent,
} from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
} from '@spartan-ng/ui-radiogroup-helm';

@Component({
  selector: 'app-warframe-state',
  standalone: true,
  imports: [
    HlmRadioDirective,
    HlmRadioGroupDirective,
    BrnRadioComponent,
    BrnRadioGroupComponent,
    FormsModule,
    HlmIconComponent,
  ],
  templateUrl: './warframe-state.component.html',
  styleUrl: './warframe-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarframeStateComponent {
  readonly state = model<'pending' | 'inprogress' | 'done'>('pending');
}
