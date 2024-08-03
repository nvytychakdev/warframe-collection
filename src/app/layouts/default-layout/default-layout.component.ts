import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayoutComponent {}
