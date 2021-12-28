/*
 * @Author: max
 * @Date: 2021-11-11 13:45:38
 * @LastEditTime: 2021-12-07 16:10:50
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/application/data/type.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '应用名称',
    dataIndex: 'AppTypeName',
    slots: { customRender: 'AppTypeName' },
    align: 'center',
  },
  {
    title: '编码',
    dataIndex: 'AppTypeCode',
    slots: { customRender: 'AppTypeCode' },
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'AppTypeDesc',
    slots: { customRender: 'AppTypeDesc' },
    align: 'center',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'Enable',
    slots: { customRender: 'enable' },
    align: 'center',
    width: 100,
  },
];
export const dataFormSchema: FormSchema[] = [
  {
    field: 'EnterTypeCode',
    label: '类型名称:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入应用类型名称',
    },
  },
  {
    field: 'EnterTypeName',
    label: '类型编码:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入应用类型编码',
    },
  },
  {
    field: 'EnterTypeDesc',
    label: '类型描述:',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入应用类型描述',
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
    label: '类型名称/编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入应用类型名称/编码',
    },
    colProps: { span: 8 },
  },
];
