/*
 * @Author: max
 * @Date: 2021-10-19 18:19:54
 * @LastEditTime: 2021-10-26 15:50:20
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/api/sys/model/userModel.ts
 */
/**
 * @description: Login interface parameters
 */
import type { Menu } from '/@/router/types';
export interface LoginParams {
  userName: string;
  userPwd: string;
}

export interface RoleInfo {
  enterpriseId: string;
  orgId: string;
  userId: string;
  userName: string;
  PhotoUrl: string;
}

export interface Headers {
  token: string;
}
/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  headers?: Headers[];
  data?: GetUserInfoModel[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  //接口状态
  success: boolean;
  //路由信息
  userModules: Menu[];
}
