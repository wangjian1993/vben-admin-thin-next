/*
 * @Author: max
 * @Date: 2021-11-18 16:57:43
 * @LastEditTime: 2021-11-23 14:15:43
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
    field: 'EnterCode',
    label: '机构编码:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入机构编码',
    },
  },
  {
    field: 'EnterEMail',
    label: '管理员邮箱:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入管理员邮箱',
    },
  },
  {
    field: 'EnterName',
    label: '机构中文名:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入机构中文名',
    },
  },
  {
    field: 'EnterShortEnName',
    label: '机构简称(中文):',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构简称(中文)',
    },
  },
  {
    field: 'EnterEnName',
    label: '机构英文名:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构英文名',
    },
  },
  {
    field: 'SuperiorEnterId',
    label: '上级机构:',
    component: 'Select',
  },
  {
    field: 'EnterShortEnName',
    label: '机构简称(英文):',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构英文名',
    },
  },
  {
    field: 'EnterUrl',
    label: '机构域名:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构域名',
    },
  },
  {
    field: 'EnterCorporate',
    label: '机构法人:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构法人',
    },
  },
  {
    field: 'EnterLicense',
    label: '营业执照编码:',
    component: 'Input',
    componentProps: {
      placeholder: '请输入营业执照编码',
    },
  },
  {
    field: 'EnterDesc',
    label: '机构描述:',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入机构描述',
    },
  },
  {
    field: 'EnterTypeName',
    label: '机构类型:',
    component: 'Select',
    required: true,
  },
  {
    field: 'Enable',
    label: '是否启用:',
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
    field: 'EnterContacts',
    label: '联系人',
    component: 'Input',
    componentProps: {
      placeholder: '请输入首页URL',
    },
  },
  {
    field: 'EnterPhone',
    label: '联系电话',
    component: 'Input',
    componentProps: {
      placeholder: '请输入联系电话',
    },
  },
  {
    field: 'EnterFax',
    label: '传真',
    component: 'Input',
    componentProps: {
      placeholder: '请输入首页URL',
    },
  },
  {
    field: 'SortNo',
    label: '序号',
    component: 'InputNumber',
    required: true,
    defaultValue: '1',
    componentProps: {
      placeholder: '请输入排序',
      min: 1,
    },
  },
  {
    field: 'EnterAddr',
    label: '地址',
    component: 'Input',
    componentProps: {
      placeholder: '请输入序号',
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
    label: '机构类型',
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
