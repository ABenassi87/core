import { EventEmitter, Input, Output, isDevMode } from '@angular/core';
import { translate } from '@rucken/core';
import { ValidatorOptions } from 'class-validator';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { IFactoryModel, IModel } from 'ngx-repository';

export class BasePromptFormModalComponent<TModel extends IModel> {

  @Input()
  processing: boolean;
  @Input()
  title: string;
  @Input()
  message: string;
  @Input()
  noTitle = translate('Cancel');
  @Input()
  yesTitle = translate('OK');
  @Output()
  no = new EventEmitter<any>();
  @Output()
  yes = new EventEmitter<any>();
  @Input()
  yesClass = 'btn btn-primary';
  @Input()
  hideNo = false;
  @Input()
  hideYes = false;
  @Input()
  readonly = false;

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

  constructor(
    protected bsModalRef?: BsModalRef,
    private _factoryModel?: IFactoryModel<TModel>,
    private _controlsConfig?: {
      [key: string]: any;
    },
    private _extra?: {
      [key: string]: any;
      customValidatorOptions?: ValidatorOptions;
    }
  ) {
    this.group(
      _factoryModel,
      _controlsConfig,
      _extra
    );
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
        keys.map(key => controlsConfig[key] = '');
      }
      this.form = this.formBuilder.group(this._factoryModel, controlsConfig, extra);
    }
  }
  onYesClick(): void {
    if (!this.message) {
      this.form.externalErrors = undefined;
      if (this.form.valid) {
        this.yes.emit(this);
      } else {
        this.form.validateAllFormFields();
      }
    } else {
      this.yes.emit(this);
    }
    if (this.hideOnYes && this.bsModalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.yes.observers.length === 0) {
        console.warn('No subscribers found for "yes"', this);
      }
    }
  }
  onNoClick(): void {
    this.no.emit(this);
    if (this.hideOnNo && this.bsModalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.no.observers.length === 0) {
        console.warn('No subscribers found for "no"', this);
      }
    }
  }
  hide() {
    this.bsModalRef.hide();
  }
}
