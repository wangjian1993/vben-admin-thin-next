/*
 * @Author: max
 * @Date: 2021-11-11 13:49:45
 * @LastEditTime: 2021-11-15 14:05:39
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/api/system/model/systemModel.ts
 */
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type InstitutionParams = BasicPageParams;

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};
//机构类型
export interface InstitutionListItem {
  DateTimeCreated: string;
  Enable: string;
  EnterTypeCode: string;
  EnterTypeDesc: string;
  EnterTypeId: string;
  EnterTypeName: string;
  IndexUrl: string;
  IsDefualt: string;
  UserCreated: string;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

/**
 * @description: Request list return value
 */
export type InstitutionListGetResultModel = BasicFetchResult<InstitutionListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
