import { BaseResourceModel } from './../base/models/base-resource.model';
import { translate } from './../utils/utils';
import { Group } from './group.model';
import { Permission } from './permission.model';

export class GroupPermission extends BaseResourceModel {
  static titles: any = {
    id: translate('Id'),
    group: translate('Group'),
    permission: translate('Permission'),
  };
  static fields: any = ['id', 'group', 'permission'];

  id: number;
  group: Group;
  permission: Permission;

  static meta(): any {
    const meta: any = GroupPermission;
    meta.group = Group;
    meta.permission = Permission;
    return meta;
  }

  constructor(obj?: any) {
    super(obj);
  }
  get asString() {
    return this.permissionAsString;
  }
  get permissionAsString() {
    if (this.permission) {
      return this.permission.asString;
    } else {
      return '';
    }
  }
}