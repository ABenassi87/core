import { Component, ViewChild } from '@angular/core';
import { User } from '@rucken/core';
import { takeUntil } from 'rxjs/operators';

import { AccountProfileFormComponent } from '../../../grids/users-grid/account-profile-form/account-profile-form.component';
import { BaseFrameComponent } from './../../../base/base-page/base-frame/base-frame.component';

@Component({
  selector: 'profile-frame',
  templateUrl: './profile-frame.component.html'
})
export class ProfileFrameComponent extends BaseFrameComponent {

  @ViewChild('accountProfileForm')
  accountProfileForm: AccountProfileFormComponent;

  modelMeta: any = User.meta();
  rePassword: string;

  init() {
    super.init();
    this.accountService.changeStatus$.pipe(takeUntil(this.destroyed$)).subscribe((status: any) =>
      this.accountProfileForm ? this.accountProfileForm.okInProcessFromStatus(status) : false
    );
  }
  get readonly() {
    return !this.accessToChange;
  }
  update(account: any | User) {
    this.accountService.update(account).subscribe(
      (user: any | User) => {
        this.accountService.account = user;
      },
      (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              this.info.emit({ username: '' });
            });
        } else {
          this.errors.emit(errors);
        }
      }
    );
  }
  cancel() {
    history.back();
  }
}
