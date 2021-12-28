/*
 * @Author: max
 * @Date: 2021-11-11 13:45:38
 * @LastEditTime: 2021-12-07 16:32:46
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/database/data/group.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '快码组名称',
    dataIndex: 'ParamGroupName',
    slots: { customRender: 'ParamGroupName' },
    align: 'center',
  },
  {
    title: '快码组编码',
    dataIndex: 'ParamGroupCode',
    slots: { customRender: 'ParamGroupCode' },
    align: 'center',
  },
  {
    title: '快码组描述',
    dataIndex: 'ParamGroupDesc',
    slots: { customRender: 'ParamGroupDesc' },
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'Enable',
    slots: { customRender: 'Enable' },
    align: 'center',
  },
];
export const dataFormSchema: FormSchema[] = [
  {
    field: 'ParamGroupName',
    label: '快码组名称:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入快码组名称',
    },
  },
  {
    field: 'ParamGroupCode',
    label: '快码组编码:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入快码组编码',
    },
  },
  {
    field: 'ParamGroupDesc',
    label: '描述:',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入快码组描述',
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
