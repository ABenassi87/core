import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { HttpHelper } from './http.helper';
import { User } from '../models/user.model';
import { isJson, translate } from '../utils';

@Injectable()
export class EndpointHelper {
  constructor(public httpHelper: HttpHelper) {
  }
  get apiUrl() {
    return '/api';
  }
  get mockApiUrl() {
    return '/api';
  }
  actionUrl(endpointService: any, action?: any) {
    if (action === undefined) {
      return endpointService.apiUrl;
    } else {
      return `${endpointService.apiUrl}/${action}`;
    }
  };
  actionRequest(endpointService: any, action?: any, data?: any): Observable<Response> {
    if (data && data.format) {
      data = data.format();
    }
    if (endpointService.name === 'account') {
      if (action === 'info') {
        return this.httpHelper.http.post(this.actionUrl(endpointService, action), { 'token': localStorage.getItem('token') });
      }
      if (action === 'login') {
        return this.httpHelper.http.post(this.actionUrl(endpointService, action), data);
      }
    }
    return this.httpHelper.post(this.actionUrl(endpointService, action), data);
  };
  actionResponse(endpointService: any, action?: any, response?: Response) {
    let data: any;
    if (response.json && _.isFunction(response.json)) {
      data = response.json();
    } else {
      data = response;
    }
    if (endpointService.name === 'account') {
      if (action === 'info' || action === 'login') {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        return new User(data.user);
      }
      if (action === 'update') {
        return new User(data);
      }
    }
  };
  extractError(error: any, message?: string): any {
    if (message === undefined) {
      message = translate('Unknown error');
    }
    if (!error._body || !isJson(error._body) || error.json().type === 'error') {
      console.log(error);
      return { message: [error.statusText ? error.statusText : message] };
    } else {
      const errorBody = error.json();
      if (_.isString(errorBody)) {
        return { message: [errorBody] };
      }
      if (errorBody.description !== undefined) {
        return { message: [errorBody.description] };
      }
      if (errorBody.message !== undefined) {
        return { message: [errorBody.message] };
      }
      if (errorBody.errors !== undefined) {
        return { message: [errorBody.errors] };
      }
      if (errorBody.detail !== undefined) {
        return { message: [errorBody.detail] };
      }
      if (errorBody.nonFieldErrors !== undefined) {
        return { message: [errorBody.nonFieldErrors] };
      }
      for (const key in errorBody) {
        if (errorBody.hasOwnProperty(key)) {
          errorBody[_.camelCase(key)] = errorBody[key];
        }
      }
      return errorBody;
    }
  }
}
