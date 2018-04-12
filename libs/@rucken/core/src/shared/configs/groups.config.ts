import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { IRestProviderOptions, PaginationMeta, ProviderActionEnum } from 'ngx-repository';
import { TokenService } from '../../modules/token/token.service';
import { Group } from '../models/group';

@Injectable()
export class GroupsConfig implements IRestProviderOptions<Group> {
  name = 'group';
  pluralName = 'groups';
  autoload = true;
  paginationMeta = {
    perPage: 5
  };
  actionOptions = {
    requestOptions: (key: number | string, data: any, action: ProviderActionEnum) => {
      let headers = { 'Content-Type': 'application/json' };
      headers = { ...headers, ...this._tokenService.getHeader() };
      return { headers: headers, withCredentials: false };
    },
    responseData: (data: any, action: ProviderActionEnum) => {
      if (action === ProviderActionEnum.Delete) {
        return true;
      } else {
        if (action === ProviderActionEnum.LoadAll) {
          return plainToClass(Group, data.body.groups);
        } else {
          return plainToClass(Group, data.body.group);
        }
      }
    },
    responsePaginationMeta: (data: any, action: ProviderActionEnum): PaginationMeta => {
      return { totalResults: data.body.meta.totalResults, perPage: undefined };
    }
  };
  restOptions = {
    limitQueryParam: 'per_page',
    pageQueryParam: 'cur_page',
    searchTextQueryParam: 'q'
  };
  constructor(
    private _tokenService: TokenService
  ) {
  }
}