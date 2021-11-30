/*
 * @Author: max
 * @Date: 2021-11-11 13:45:38
 * @LastEditTime: 2021-11-16 11:34:00
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/type.data.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';

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
    label: '部门名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入部门名称',
    },
  },
  {
    field: 'deptFullname',
    label: '部门全称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入部门全称',
    },
  },
  {
    field: 'orgType',
    label: '机构类型',
    component: 'RadioGroup',
    defaultValue: '1',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'ApiTreeSelect',
    componentProps: ({ formModel }) => {
      console.log(formModel);
      return {
        placeholder: '请选择上级部门',
        api: selectTreeAndExcludeNode,
        params: {
          tenantId: formModel.tenantId,
          nodeId: formModel.id,
        },
        replaceFields: {
          title: 'name',
          key: 'id',
          value: 'id',
        },
      };
    },
  },
  {
    field: 'leader',
    label: '负责人',
    component: 'Input',
    componentProps: {
      placeholder: '请输入负责人',
    },
  },
  {
    field: 'leaderPhone',
    label: '负责人电话',
    component: 'Input',
    componentProps: {
      placeholder: '请输入负责人电话',
    },
  },
  {
    field: 'phone',
    label: '办公电话',
    component: 'Input',
    componentProps: {
      placeholder: '请输入办公电话',
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    componentProps: {
      placeholder: '请输入邮箱',
    },
  },
  {
    field: 'postCode',
    label: '邮政编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入邮政编码',
    },
  },
  {
    field: 'address',
    label: '联系地址',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入联系地址',
    },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    defaultValue: '1',
    componentProps: {
      placeholder: '请输入排序',
      min: 1,
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    required: true,
    defaultValue: '0',
  },
  {
    label: '备注',
    field: 'remarks',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入备注',
    },
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
