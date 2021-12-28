/*
 * @Author: max
 * @Date: 2021-12-07 13:46:06
 * @LastEditTime: 2021-12-07 14:47:58
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/organization/data/level.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '组织等级编号',
    dataIndex: 'OrgLevelCode',
    slots: { customRender: 'OrgLevelCode' },
    align: 'center',
  },
  {
    title: '组织等级名称',
    dataIndex: 'OrgLevelName',
    slots: { customRender: 'OrgLevelName' },
    align: 'center',
  },
  {
    title: '组织维度',
    dataIndex: 'OrgDimensionName',
    slots: { customRender: 'OrgDimensionName' },
    align: 'center',
  },
  {
    title: '级别',
    dataIndex: 'OrgLevelSortNo',
    slots: { customRender: 'OrgLevelSortNo' },
    align: 'center',
  },
];
export const dataFormSchema: FormSchema[] = [
  {
    field: 'OrgLevelName',
    label: '等级名称:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入等级名称',
    },
  },
  {
    field: 'OrgLevelCode',
    label: '等级编码:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入等级编码',
    },
  },
  {
    field: 'OrgLevelSortNo',
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
    field: 'Enable',
    label: '是否启用:',
    component: 'RadioButtonGroup',
    defaultValue: 'Y',
    componentProps: {
      options: [
        {
          label: '启用',
          value: 'Y',
          key: 'Y',
        },
        {
          label: '禁用',
          value: 'N',
          key: 'N',
        },
      ],
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '等级名称/编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入等级名称/编码',
    },
    colProps: { span: 8 },
  },
];
