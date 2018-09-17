import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptModalComponent } from '../../base/base-prompt-modal.component';

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

  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
  }
}