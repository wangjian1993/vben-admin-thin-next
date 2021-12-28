/*
 * @Author: max
 * @Date: 2021-11-18 16:57:43
 * @LastEditTime: 2021-12-07 10:53:36
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/organization/data/list.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getInstitutionList } from '/@/api/system/system';
export const columns: BasicColumn[] = [
  {
    title: '维度名称',
    dataIndex: 'OrgDimensionName',
    slots: { customRender: 'OrgDimensionName' },
    align: 'center',
    width: 200,
  },
  {
    title: '编码',
    dataIndex: 'OrgDimensionCode',
    slots: { customRender: 'OrgDimensionCode' },
    align: 'center',
    width: '20%',
  },
  {
    title: '机构类型',
    dataIndex: 'EnterTypeName',
    slots: { customRender: 'EnterTypeName' },
    align: 'center',
    width: '10%',
  },
  {
    title: '参与授权',
    dataIndex: 'IsPartAuth',
    slots: { customRender: 'IsPartAuth' },
    align: 'center',
    width: '5%',
  },
  {
    title: '状态',
    dataIndex: 'Enable',
    slots: { customRender: 'Enable' },
    align: 'center',
    width: '5%',
  },
  {
    title: '排序号',
    dataIndex: 'SortNo',
    slots: { customRender: 'SortNo' },
    align: 'center',
    width: '10%',
  },
];
export const dataFormSchema: FormSchema[] = [
  {
    field: 'OrgDimensionName',
    label: '维度名称:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入维度名称',
    },
  },
  {
    field: 'OrgDimensionCode',
    label: '维度编码:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入维度编码',
    },
  },
  {
    field: 'EnterTypeName',
    label: '机构类型:',
    component: 'Select',
    required: true,
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
    field: 'IsPartAuth',
    label: '是否授权:',
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
    label: '组织名称/编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入组织名称/编码',
    },
    colProps: { span: 8 },
  },
];
