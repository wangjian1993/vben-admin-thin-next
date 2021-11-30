/*
 * @Author: max
 * @Date: 2021-11-11 13:45:38
 * @LastEditTime: 2021-11-17 14:39:18
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/data/type.ts
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
    field: 'EnterTypeCode',
    label: '类型编号:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入类型编号',
    },
  },
  {
    field: 'EnterTypeName',
    label: '类型名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入类型名称',
    },
  },
  {
    field: 'EnterTypeDesc',
    label: '描述:',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入类型描述',
    },
  },
  {
    field: 'IndexUrl',
    label: '首页URL',
    component: 'Input',
    componentProps: {
      placeholder: '请输入首页URL',
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
  {
    field: 'IsDefualt',
    label: '是否默认:',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 'Y',
    componentProps: {
      options: [
        {
          label: '是',
          value: 'Y',
          key: '1',
        },
        {
          label: '否',
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
    label: '机构名称/编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入角色名称',
    },
    colProps: { span: 8 },
  },
];
