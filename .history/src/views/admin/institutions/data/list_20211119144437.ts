/*
 * @Author: max
 * @Date: 2021-11-18 16:57:43
 * @LastEditTime: 2021-11-19 14:44:37
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/data/list.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getInstitutionList } from '/@/api/system/system';
export const columns: BasicColumn[] = [
  {
    title: '机构中文名',
    dataIndex: 'EnterName',
    slots: { customRender: 'name' },
    align: 'center',
    width: '15%',
    ellipsis: true,
  },
  {
    title: '机构编号',
    dataIndex: 'EnterCode',
    slots: { customRender: 'EnterCode' },
    align: 'center',
    width: 120,
  },
  {
    title: '机构类型',
    dataIndex: 'EnterTypeName',
    slots: { customRender: 'type' },
    align: 'center',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'Enable',
    slots: { customRender: 'Enable' },
    align: 'center',
    width: '5%',
  },
  {
    title: '上级机构名称',
    dataIndex: 'SuperiorEnterName',
    slots: { customRender: 'SuperiorEnterName' },
    align: 'center',
    width: '15%',
    ellipsis: true,
  },
  {
    title: '排序号',
    dataIndex: 'SortNo',
    slots: { customRender: 'SortNo' },
    align: 'center',
    width: '5%',
  },
  {
    title: '创建时间',
    dataIndex: 'DateTimeCreated',
    slots: { customRender: 'address' },
    align: 'center',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '创建人',
    dataIndex: 'UserCreated',
    slots: { customRender: 'UserCreated' },
    align: 'center',
    width: 100,
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
  {
    field: 'entertype',
    label: '机构类型',
    component: 'ApiSelect',
    // componentProps: {
    //   placeholder: '请选择机构类型',
    // },
    componentProps: {
      // more details see /src/components/Form/src/components/ApiSelect.vue
      api: getInstitutionList,
      params: {
        pageindex: 1,
        pagesize: 20,
      },
      resultField: 'list',
      // use name as label
      labelField: 'EnterTypeName',
      // use id as value
      valueField: 'EnterTypeCode',
    },
    colProps: { span: 8 },
  },
];
