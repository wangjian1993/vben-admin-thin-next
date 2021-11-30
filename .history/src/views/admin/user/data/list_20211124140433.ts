/*
 * @Author: max
 * @Date: 2021-11-18 16:57:43
 * @LastEditTime: 2021-11-24 14:04:32
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/data/list.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getUserTypeList } from '/@/api/system/system';
export const columns: BasicColumn[] = [
  {
    title: '用户账号',
    dataIndex: 'UserLoginId',
    slots: { customRender: 'UserLoginId' },
    align: 'center',
    width: '15%',
  },
  {
    title: '用户名称',
    dataIndex: 'UserName',
    slots: { customRender: 'UserName' },
    align: 'center',
    width: '10%',
  },
  {
    title: '用户类型',
    dataIndex: 'UserTypeName',
    slots: { customRender: 'UserTypeName' },
    align: 'center',
    width: '10%',
  },
  {
    title: '企业微信',
    dataIndex: 'EnterWechatAccount',
    slots: { customRender: 'EnterWechatAccount' },
    align: 'center',
    width: '10%',
  },
  {
    title: '所属机构',
    dataIndex: 'EnterName',
    slots: { customRender: 'EnterName' },
    align: 'center',
    width: '20%',
  },
  {
    title: '状态',
    dataIndex: 'Enable',
    slots: { customRender: 'Enable' },
    align: 'center',
    width: 60,
  },
  {
    title: '锁定状态',
    dataIndex: 'IsLocked',
    slots: { customRender: 'IsLocked' },
    align: 'center',
    width: 80,
  },
];
export const dataFormSchema: FormSchema[] = [
  {
    field: 'avatar',
  },
  {
    field: 'UserName',
    label: '姓名:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入管理员邮箱',
    },
  },
  {
    field: 'UserTypeId',
    label: '用户类型:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入机构中文名',
    },
  },
  {
    field: 'UserLoginId',
    label: '账号:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构简称(中文)',
    },
  },
  {
    field: 'EntryDate',
    label: '入职日期:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构英文名',
    },
  },
  {
    field: 'EnterWechatAccount',
    label: '企业微信:',
    component: 'Select',
  },
  {
    field: 'Birthday',
    label: '出生日期:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构英文名',
    },
  },
  {
    field: 'Email',
    label: '邮箱:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构域名',
    },
  },
  {
    field: 'Gender',
    label: '性别:',
    component: 'RadioButtonGroup',
    defaultValue: 'Y',
    componentProps: {
      options: [
        {
          label: '启用',
          value: 'Y',
          key: '1',
        },
        {
          label: '禁用',
          value: 'N',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'MobilePhone',
    label: '手机:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入营业执照编码',
    },
  },
  {
    field: 'Address',
    label: '地址:',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入机构描述',
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'UserTypeId',
    label: '用户类型',
    component: 'ApiSelect',
    componentProps: {
      api: getUserTypeList,
      params: {
        pageindex: 1,
        pagesize: 20,
      },
      resultField: 'list',
      // use name as label
      labelField: 'UserTypeName',
      // use id as value
      valueField: 'UserTypeId',
    },
    colProps: { span: 6 },
  },
  {
    field: 'enable',
    label: '状态:',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '启用',
          value: 'Y',
          key: '1',
        },
        {
          label: '禁用',
          value: 'N',
          key: '2',
        },
      ],
    },
    colProps: { span: 6 },
  },
  {
    field: 'keyword',
    label: '用户名称/账号',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名称/账号',
    },
    colProps: { span: 6 },
  },
];
