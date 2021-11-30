/*
 * @Author: max
 * @Date: 2021-11-11 13:45:38
 * @LastEditTime: 2021-11-22 16:13:00
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/data/type.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '用户编码',
    dataIndex: 'UserTypeCode',
    align: 'center',
    width: '20%',
  },
  {
    title: '用户名称',
    dataIndex: 'UserTypeName',
    align: 'center',
    width: '20%',
  },
  {
    title: '描述',
    dataIndex: 'UserTypeDesc',
    align: 'center',
    width: '10%',
  },
];
export const dataFormSchema: FormSchema[] = [
  {
    field: 'UserTypeCode',
    label: '用户类型编码:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入用户类型编码',
    },
  },
  {
    field: 'UserTypeName',
    label: '用户类型名称:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入用户类型名称',
    },
  },
  {
    field: 'UserTypeDesc',
    label: '描述:',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入类型描述',
    },
  },
  {
    field: 'Enable',
    label: '是否启用:',
    component: 'RadioButtonGroup',
    required: true,
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
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '用户类型名称/编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户类型名称/编码',
    },
    colProps: { span: 8 },
  },
];
