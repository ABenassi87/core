import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptModalComponent } from '@rucken/core';

@Component({
  selector: 'message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageModalComponent extends BasePromptModalComponent {
  @Input()
  isInfo?: boolean;
  @Input()
  isError?: boolean;

  constructor() {
    super();
  }
}
