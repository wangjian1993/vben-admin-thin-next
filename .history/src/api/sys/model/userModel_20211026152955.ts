/*
 * @Author: max
 * @Date: 2021-10-19 18:19:54
 * @LastEditTime: 2021-10-26 15:29:55
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/api/sys/model/userModel.ts
 */
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  userName: string;
  userPwd: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId?: string | number;
  token?: string;
  role?: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  //接口状态
  success: boolean;
}
