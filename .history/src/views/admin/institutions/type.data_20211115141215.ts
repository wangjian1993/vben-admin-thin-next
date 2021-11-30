/*
 * @Author: max
 * @Date: 2021-11-11 13:45:38
 * @LastEditTime: 2021-11-15 14:12:03
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
    align: 'center',
    width: '5%',
    customRender: (text) => {
      return text == 'Y' ? '启用' : '禁用';
    },
  },
  {
    title: '默认',
    dataIndex: 'IsDefualt',
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
