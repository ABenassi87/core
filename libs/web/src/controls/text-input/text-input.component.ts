import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment/moment';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import emailMask from 'text-mask-addons/dist/emailMask';

import { BaseComponent } from './../../base/base-component/base-component.component';
import { TextInputConfig } from './text-input.config';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})

export class TextInputComponent extends BaseComponent {

  @ViewChild('inputElement')
  inputElement: ElementRef;
  @ViewChild('tooltip')
  tooltip: TooltipDirective;

  @Input()
  labelClass?= 'control-label';
  @Input()
  inputClass?= 'form-control';
  @Input()
  inputFrameClass?: string;
  @Input()
  type: string;
  @Input()
  readonly = false;
  @Input()
  name = 'text';
  @Input()
  placeholder = '';
  @Input()
  title = '';
  @Input()
  model = '';
  @Input()
  hardValue: string = null;
  @Output()
  modelChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  maxlength: number;
  @Input()
  mask: any = { mask: false };
  @Input()
  step: string;
  @Input()
  min = '';
  @Input()
  max = '';
  @Input()
  minDate?: Date = null;
  @Input()
  maxDate?: Date = null;
  @Input()
  isNativeDateInput?: boolean;
  @Input()
  startingDay: number;
  private _dateValue: any;

  constructor(
    public translateService: TranslateService,
    public config: TextInputConfig
  ) {
    super();
  }
  afterCreate() {
    if (this.isNativeDateInput === undefined) {
      this.isNativeDateInput = this.config.isNativeDateInput;
    }
    if (this.tooltipEnable === undefined) {
      this.tooltipEnable = this.config.errorInTooltip;
    }
    if (this.maxlength === undefined) {
      this.maxlength = this.config.maxlength;
    }
    if (this.step === undefined) {
      this.step = this.config.step;
    }
    if (this.startingDay === undefined) {
      this.startingDay = this.config.startingDay;
    }
  }
  init() {
    if (this.type === undefined) {
      this.type = 'text';
    }
    if (this.inputFrameClass === undefined) {
      this.inputFrameClass = '';
    }
    if (this.mask.mask === false) {
      if (this.type === 'email') {
        this.type = 'text';
        this.mask.mask = emailMask;
      }
      if (this.type === 'currency') {
        const numberMask = createNumberMask(this.config.currencyMask);
        this.type = 'text';
        this.mask.mask = numberMask;
      }
      if (this.type === 'phone') {
        this.type = 'text';
        this.mask = this.config.phoneMask;
      }
      if (this.type === 'date' && !this.isNativeDateInput) {
        this.mask = this.config.dateMask;
        this.dateInputChange(this.value);
      }
    }
    super.init();
  }
  get dateValue() {
    return this._dateValue;
  }
  set dateValue(value: any) {
    this._dateValue = value;
    if (this.type === 'date') {
      this.value = this.getStringFromDateValue();
    }
  }
  dateInputChange(value: any) {
    if (value.target && value.target.value) {
      this.value = value.target.value;
    } else {
      this.value = value;
    }
    this.setDateValueFromString(this.value);
    if (!this._dateValue || this._dateValue.toString() === 'Invalid Date') {
      this._dateValue = new Date();
    }
  }
  get value() {
    if (this.hardValue !== null) {
      return this.hardValue;
    }
    if (this.type === 'date' && !this.isNativeDateInput) {
      return moment(moment(this.model, this.config.nativeInputDateFormat).toDate()).format(this.config.inputDateFormat);
    }
    return this.model;
  }
  set value(value) {
    let newValue: any = value;
    if (this.errorsValue && this.errorsValue[this.name]) {
      delete this.errorsValue[this.name];
      this.tooltipText = '';
    }
    if (this.type === 'date' && !this.isNativeDateInput) {
      newValue = moment(moment(value, this.config.inputDateFormat).toDate()).format(this.config.nativeInputDateFormat);
    }
    if (newValue === 'Invalid date' && !this.model) {
      newValue = this.model;
    }
    if (this.model !== newValue) {
      this.model = newValue;
      this.modelChange.emit(this.model);
    }
  }
  getStringFromDateValue() {
    if (this._dateValue === undefined) {
      return '';
    }
    let value: string;
    value = '';
    try {
      value = moment(this._dateValue).format(this.config.inputDateFormat);
    } catch (err) {
      value = '';
    }
    if (value === 'Invalid date') {
      value = '';
    }
    return value;
  }
  setDateValueFromString(value: any) {
    try {
      value = moment(value, this.config.inputDateFormat).toDate();
    } catch (err) {
      value = null;
    }
    if (value === 'Invalid date') {
      value = null;
    }
    this._dateValue = value;
  }
}