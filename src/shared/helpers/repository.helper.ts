import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from '../utils.service';
import * as _ from 'lodash';
import { EndpointHelper } from './endpoint.helper';
import { HttpHelper } from './http.helper';
import { MetaModel } from '../models/meta.model';

@Injectable()
export class RepositoryHelper extends EndpointHelper {
  constructor(public httpHelper: HttpHelper) {
    super(httpHelper);
  }
  itemUrl(repositoryService: any, key?: any) {
    if (key === undefined) {
      return repositoryService.apiUrl;
    } else {
      return `${repositoryService.apiUrl}/${key}`;
    }
  };
  itemsUrl(repositoryService: any) {
    let uri = new URLSearchParams();
    for (let queryProp in repositoryService.queryProps) {
      if (repositoryService.queryProps.hasOwnProperty(queryProp)) {
        uri.append(_.snakeCase(queryProp), repositoryService.queryProps[queryProp]);
      }
    }
    let apiUrl = repositoryService.apiUrl;
    if (repositoryService.props !== null) {
      apiUrl = repositoryService.apiUrlWithProps;
      for (let propKey in repositoryService.props) {
        if (repositoryService.props.hasOwnProperty(propKey)) {
          apiUrl = apiUrl.replace(`{${propKey}}`, repositoryService.props[propKey]);
        }
      }
    }
    return apiUrl + `?${uri.toString()}`;
  };
  itemsResponse(repositoryService: any, response: any) {
    let data = response.json();
    repositoryService.meta = new MetaModel(data['meta']);
    return data[_.camelCase(repositoryService.pluralName)];
  };
  itemResponse(repositoryService: any, response: any) {
    return response.json()[_.camelCase(repositoryService.name)];
  };
  readItemRequest(repositoryService: any, key: any): Observable<Response> {
    return this.httpHelper.get(
      this.itemUrl(repositoryService, key)
    );
  };
  readItemsRequest(repositoryService: any): Observable<Response> {
    return this.httpHelper.get(this.itemsUrl(repositoryService));
  };
  createItemRequest(repositoryService: any, item: any): Observable<Response> {
    return this.httpHelper.post(
      this.itemUrl(repositoryService),
      item
    );
  };
  updateItemRequest(repositoryService: any, item: any): Observable<Response> {
    return this.httpHelper.put(
      this.itemUrl(repositoryService, item.pk),
      item
    );
  };
  deleteItemsRequest(repositoryService: any, items: any): Observable<Response> {
    let ids = items.map((item: any) => item.pk);
    return this.httpHelper.delete(this.itemUrl(repositoryService, ids.join('|')));
  };
}