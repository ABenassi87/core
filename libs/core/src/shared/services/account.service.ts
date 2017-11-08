import 'rxjs/add/operator/map';

import { EventEmitter, Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { EndpointHelper } from '../helpers/endpoint.helper';
import { translate } from './../common/utils';
import { EndpointStatusEnum } from './../enums/endpoint-status.enum';
import { User } from './../models/user.model';

@Injectable()
export class AccountService {
  name: string;
  account$: Subject<any | User>;
  apiUrl: string;

  statusMessage: string;
  changeStatus$: Subject<EndpointStatusEnum> = <Subject<EndpointStatusEnum>>new Subject();

  protected _account: any | User;
  protected _status: EndpointStatusEnum;

  endpointHelper: EndpointHelper;

  constructor(
    public injector: Injector
  ) {
    this.endpointHelper = injector.get(EndpointHelper);
    this.name = 'account';
    this.apiUrl = `${this.endpointHelper.apiUrl}/${this.name}`;
    this.account$ = <Subject<User>>new Subject();
  }
  get token(): string | null {
    // you custom code in extended class
    return null;
  }
  set token(value: string | null) {
    // you custom code in extended class
  }
  transformModel(item: any) {
    return new User(item);
  }
  get status() {
    return this._status;
  }
  setStatus(status: EndpointStatusEnum, message?: string) {
    this._status = status;
    setTimeout((out: any) => {
      if (message) {
        this.statusMessage = message;
      } else {
        this.statusMessage = '';
      }
      this.changeStatus$.next(status);
    });
  }
  set account(user: any | User) {
    this._account = user;
    this.account$.next(this._account);
  }
  get account(): any | User {
    return this._account;
  }
  checkPermissions(permissionNames: string[]) {
    if (!this.account) {
      return false;
    }
    return this.account.checkPermissions(permissionNames);
  }
  info(token?: string): EventEmitter<any> {
    const result = new EventEmitter<any>();
    this.setStatus(EndpointStatusEnum.Loading,
      translate('Loading...')
    );
    this.endpointHelper.actionRequest(this, 'info', { 'token': (token ? token : this.token) }).map(
      (response: any) => this.endpointHelper.actionResponse(this, 'info', response)).
      subscribe((data: { user: any, token: string } | any) => {
        this.account = this.transformModel(data.user);
        this.token = data.token;
        result.emit(this.account);
        this.setStatus(EndpointStatusEnum.Ok);
      }, (error: any) => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(EndpointStatusEnum.Error,
          translate('Error')
        );
      });
    return result;
  }
  login(account: any | User): EventEmitter<any> {
    const result = new EventEmitter<any>();
    this.setStatus(EndpointStatusEnum.Processing,
      translate('Login...')
    );
    this.endpointHelper.actionRequest(this, 'login', account.formatToAuth(), true).map(
      (response: any) => this.endpointHelper.actionResponse(this, 'login', response)).
      subscribe((data: { user: any, token: string } | any) => {
        this.account = this.transformModel(data.user);
        this.token = data.token;
        result.emit(this.account);
        this.setStatus(EndpointStatusEnum.Ok);
      }, (error: any) => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(EndpointStatusEnum.Error,
          translate('Error')
        );
      });
    return result;
  }
  logout(): EventEmitter<any> {
    const result = new EventEmitter<any>();
    this.setStatus(EndpointStatusEnum.Processing,
      translate('Logout...')
    );
    setTimeout((out: any) => {
      this.account = null;
      this.token = null;
      result.emit({ message: 'OK' });
      this.setStatus(EndpointStatusEnum.Ok);
    }, 700);
    return result;
  }
  update(account: any | User): EventEmitter<any> {
    if (account.validate && account.validate() !== true) {
      return this.validateError(account);
    }
    const result = new EventEmitter<any>();
    this.setStatus(EndpointStatusEnum.Updating,
      translate('Updating...')
    );
    this.endpointHelper.actionRequest(this, 'update', account).map(
      (response: any) => this.endpointHelper.actionResponse(this, 'update', response))
      .subscribe((user: any | User) => {
        this.account = this.transformModel(user);
        result.emit(this.account);
        this.setStatus(EndpointStatusEnum.Ok);
      }, (error: any) => {
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(EndpointStatusEnum.Error,
          translate('Error')
        );
      });
    return result;
  }
  validateError(item: any): EventEmitter<any> {
    const result = new EventEmitter<any>();
    result.error(item.validate());
    this.setStatus(EndpointStatusEnum.Invalid,
      translate('Error')
    );
    return result;
  }
}