/*
 * @Author: max
 * @Date: 2021-10-19 18:19:54
 * @LastEditTime: 2021-11-12 16:52:00
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/api/model/baseModel.ts
 */
export interface BasicPageParams {
  pageindex: number;
  pagesize: number;
}

export interface BasicFetchResult<T> {
  list: T[];
  recordsTotal: number;
}
