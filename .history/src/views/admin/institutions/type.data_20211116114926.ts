/*
 * @Author: max
 * @Date: 2021-11-11 13:45:38
 * @LastEditTime: 2021-11-16 11:49:26
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/type.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '类型编码',
    dataIndex: 'EnterTypeCode',
    align: 'center',
    width: '20%',
  },
  {
    title: '类型名称',
    dataIndex: 'EnterTypeName',
    align: 'center',
    width: '20%',
  },
  {
    title: '是否启动',
    dataIndex: 'Enable',
    slots: { customRender: 'Enable' },
    align: 'center',
    width: '5%',
  },
  {
    title: '默认',
    dataIndex: 'IsDefualt',
    slots: { customRender: 'IsDefualt' },
    align: 'center',
    width: '5%',
  },
  {
    title: '首页URL',
    dataIndex: 'IndexUrl',
    align: 'center',
    width: '10%',
  },
  {
    title: '描述',
    dataIndex: 'EnterTypeDesc',
    align: 'center',
    width: '10%',
  },
];
export const dataFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '类型编号:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入类型编号',
    },
  },
  {
    field: 'deptFullname',
    label: '类型名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入类型名称',
    },
  },
  {
    field: 'orgType',
    label: '描述:',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入类型描述',
    },
  },
  {
    field: 'leader',
    label: '首页URL',
    component: 'Input',
    componentProps: {
      placeholder: '请输入首页URL',
    },
  },
  {
    field: 'status',
    label: '是否启用',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: '0',
  },
  {
    field: 'status',
    label: '是否默认',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: '0',
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];
