/*
 * @Author: max
 * @Date: 2021-11-16 09:14:36
 * @LastEditTime: 2021-11-16 11:33:24
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/component/data.ts
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useGlobSetting } from '/@/hooks/setting';
export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    width: 120,
    align: 'left',
  },
  {
    title: '部门全称',
    dataIndex: 'deptFullname',
    width: 200,
    align: 'left',
  },
  {
    title: '租户',
    dataIndex: 'tenantName',
    width: 120,
    ifShow: tenantMode,
  },
  {
    title: '机构类型',
    dataIndex: 'orgType',
    width: 120,
    slots: { customRender: 'orgType' },
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    width: 120,
  },
  {
    title: '负责人电话',
    dataIndex: 'leaderPhone',
    width: 120,
  },
  {
    title: '办公电话',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '邮政编码',
    dataIndex: 'postCode',
    width: 120,
  },
  {
    title: '联系地址',
    dataIndex: 'address',
    width: 120,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    slots: { customRender: 'status' },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入部门名称',
    },
  },
  {
    field: 'deptFullname',
    label: '部门全称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入部门全称',
    },
  },
];
