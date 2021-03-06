import { EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { BindObservable } from 'bind-observable';
import { ValidatorOptions } from 'class-validator';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { IFactoryModel, IModel } from 'ngx-repository';
import { Observable } from 'rxjs';
import { IModalRef } from '../modules/modals/modal-ref.interface';
import { translate } from '../utils/translate';
import { IBaseForm } from './base-form.interface';

export class BasePromptFormModalComponent<TModel extends IModel> implements IBaseForm {
  @BindObservable()
  @Input()
  processing = false;
  processing$: Observable<boolean>;
  @Input()
  checkIsDirty?: boolean;
  @Input()
  title: string;
  @Input()
  message: string;
  @Input()
  infoMessage: string;
  @Input()
  errorMessage: string;
  @Input()
  noTitle = translate('Cancel');
  @Input()
  yesTitle = translate('OK');
  @Output()
  no = new EventEmitter<any>();
  @Output()
  yes = new EventEmitter<any>();

  @BindObservable()
  @Input()
  yesClass: string;
  yesClass$: Observable<string>;
  @BindObservable()
  @Input()
  noClass: string;
  noClass$: Observable<string>;

  @Input()
  hideNo = false;
  @Input()
  hideYes = false;
  @Input()
  readonly = false;
  @Input()
  disabled: boolean;
  @Input()
  validateForm = true;

  @Input()
  hideOnNo = true;
  @Input()
  hideOnYes = false;

  get data() {
    return this.form && this.form.object;
  }
  set data(data: any) {
    if (this.form) {
      this.form.object = data;
    }
  }

  form: DynamicFormGroup<TModel>;
  strings: any;
  formBuilder = new DynamicFormBuilder();
  yesData: any;
  noData: any;

  modalRef: IModalRef<BasePromptFormModalComponent<TModel>>;

  constructor(
    private _factoryModel?: IFactoryModel<TModel>,
    private _controlsConfig?: {
      [key: string]: any;
    },
    private _extra?: {
      [key: string]: any;
      customValidatorOptions?: ValidatorOptions;
    }
  ) {
    this.group(_factoryModel, _controlsConfig, _extra);
  }
  group(
    factoryModel?: IFactoryModel<TModel>,
    controlsConfig?: {
      [key: string]: any;
    },
    extra?: {
      [key: string]: any;
      customValidatorOptions?: ValidatorOptions;
    }
  ) {
    if (controlsConfig) {
      this._controlsConfig = controlsConfig;
    }
    if (extra) {
      this._extra = extra;
    }
    if (factoryModel) {
      this._factoryModel = factoryModel;
    }
    if (this._factoryModel) {
      const newObject = new this._factoryModel();
      if (this._factoryModel.strings) {
        this.strings = this._factoryModel.strings;
      } else {
        this.strings = Object.keys(newObject).reduce((acc, cur, i) => {
          acc[cur] = cur;
          return acc;
        }, {});
      }
      if (!controlsConfig) {
        controlsConfig = {};
        const keys = Object.keys(newObject);
        keys.map(key => (controlsConfig[key] = ''));
      }
      this.form = this.formBuilder.group(this._factoryModel, controlsConfig, extra);
    }
  }
  onYesClick(data?: any) {
    this.onYesClickAsync(data).then();
  }
  async onYesClickAsync(data?: any) {
    this.yesData = data;
    if (!this.message && this.validateForm) {
      try {
        await this.form.clearExternalErrorsAsync();
      } catch (error) {
        throw error;
      }
      if (this.form.valid) {
        this.yes.emit(this);
      } else {
        this.form.validateAllFormFields();
      }
    } else {
      this.yes.emit(this);
    }
    if (this.hideOnYes && this.modalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.yes.observers.length === 0) {
        console.warn('No subscribers found for "yes"', this);
      }
    }
  }
  onNoClick(data?: any): void {
    this.noData = data;
    this.no.emit(this);
    if (this.hideOnNo && this.modalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.no.observers.length === 0) {
        console.warn('No subscribers found for "no"', this);
      }
    }
  }
  hide() {
    this.modalRef.hide();
  }
}
