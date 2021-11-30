/*
 * @Author: max
 * @Date: 2021-11-11 13:49:15
 * @LastEditTime: 2021-11-12 16:53:49
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/api/system/system.ts
 */
import { InstitutionParams, InstitutionListGetResultModel } from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  InstitutionList = '/api/base/entertype/getlist',
}

export const getInstitutionList = (params: InstitutionParams) =>
  defHttp.get<InstitutionListGetResultModel>({ url: Api.InstitutionList, params });
