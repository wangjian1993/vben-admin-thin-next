/*
 * @Author: max
 * @Date: 2021-11-11 13:49:15
 * @LastEditTime: 2021-11-18 17:03:20
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/api/system/system.ts
 */
import { InstitutionParams, InstitutionListGetResultModel } from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  InstitutionList = '/api/base/entertype/getlist',
  enterTypeAction = '/api/base/entertype/',
  enterList = '/api/base/getlist',
  enterAction = '/api/base/',
}
//机构类型
export const getInstitutionList = (params: InstitutionParams) =>
  defHttp.get<InstitutionListGetResultModel>({ url: Api.InstitutionList, params });
//机构添加,删除,编辑
export function enterTypeAction(params?: object, action?: string) {
  return defHttp.post({ url: Api.enterTypeAction + action, params: params });
}
//机构列表
export function getEnterList(params?: object, action?: string) {
  return defHttp.get({ url: Api.enterList + action, params: params });
}
export function enterAction(params?: object, action?: string) {
  return defHttp.post({ url: Api.enterAction + action, params: params });
}
