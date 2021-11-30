/*
 * @Author: max
 * @Date: 2021-10-19 18:19:54
 * @LastEditTime: 2021-10-27 15:07:02
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
  headers: Headers[];
  data: GetUserInfoModel[];
}
//用户信息
export interface UserInfo {
  //用户id
  userId: string;
  //用户名
  userName: string;
  //头像
  PhotoUrl: string;
  //组织id
  enterpriseId: string;
  //路由信息
  userModules: Menu[];
}
/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  data: UserInfo[];
}
