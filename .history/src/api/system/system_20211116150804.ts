/*
 * @Author: max
 * @Date: 2021-11-11 13:49:15
 * @LastEditTime: 2021-11-16 15:08:04
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/api/system/system.ts
 */
import { InstitutionParams, InstitutionListGetResultModel } from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  InstitutionList = '/api/base/entertype/getlist',
}
enum Api {
  enterTypeAction = '/api/base/entertype/',
}

//机构类型
export const getInstitutionList = (params: InstitutionParams) =>
  defHttp.get<InstitutionListGetResultModel>({ url: Api.InstitutionList, params });

//机构添加,删除,编辑
export function enterTypeAction(params?: object, action?: string) {
  return defHttp.post({ url: Api.InstitutionList + action, params: params });
}
