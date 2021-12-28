/*
 * @Author: max
 * @Date: 2021-11-18 16:57:43
 * @LastEditTime: 2021-11-22 14:31:55
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
    componentProps: {
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
