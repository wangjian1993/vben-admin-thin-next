/*
 * @Author: max
 * @Date: 2021-11-11 13:49:15
 * @LastEditTime: 2021-11-24 17:07:38
 * @LastEditors: max
 * @Description: 机构列表
 * @FilePath: /vben-admin-thin-next-main/src/api/system/system.ts
 */
import { defHttp } from '/@/utils/http/axios';

enum Api {
  enterTypeApi = '/api/base/entertype/',
  enterApi = '/api/base/enter/',
  userTypeApi = '/api/base/usertype/',
  userApi = '/api/base/user/',
  orgApi = '/api/base/user/',
}
//机构类型
export function getInstitutionList(params?: object) {
  return defHttp.get({ url: Api.enterTypeApi + 'getlist', params: params });
}
//机构添加,删除,编辑
export function enterTypeAction(params?: object, action?: string) {
  return defHttp.post({ url: Api.enterTypeApi + action, params: params });
}
//机构列表
export function getEnterList(params?: object) {
  return defHttp.get({ url: Api.enterApi + 'getlist', params: params });
}
export function enterAction(params?: object, action?: string) {
  return defHttp.post({ url: Api.enterApi + action, params: params });
}

//用户类型
export function getUserTypeList(params?: object) {
  return defHttp.get({ url: Api.userTypeApi + 'getall', params: params });
}
export function userTypeAction(params?: object, action?: string) {
  return defHttp.post({ url: Api.userTypeApi + action, params: params });
}
//用户列表
export function getUserList(params?: object) {
  return defHttp.get({ url: Api.userApi + 'getall', params: params });
}
export function userAction(params?: object, action?: string) {
  return defHttp.post({ url: Api.userApi + action, params: params });
}

//机构tree
export function getEnterTree(params?: object) {
  return defHttp.get({ url: Api.enterApi + 'gettree', params: params });
}
//获取组织信息
export function getOrganizationList(params?: object) {
  return defHttp.get({ url: Api.orgApi + 'getall', params: params });
}
export function orgdimensionAction(params?: object, action?: string) {
  return defHttp.post({ url: Api.orgApi + action, params: params });
}
