/*
 * @Author: max
 * @Date: 2021-11-25 09:49:22
 * @LastEditTime: 2021-12-02 10:04:24
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/data/org.ts
 */
/*
 * @Author: max
 * @Date: 2021-11-11 13:45:38
 * @LastEditTime: 2021-11-22 16:13:00
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/data/type.ts
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '组织名称',
    dataIndex: 'OrgName',
    slots: { customRender: 'OrgName' },
    align: 'left',
  },
  {
    title: '组织编码',
    dataIndex: 'OrgCode',
    slots: { customRender: 'OrgCode' },
    align: 'center',
  },
  {
    title: '等级',
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
    field: 'UserTypeCode',
    label: '用户类型编码:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入用户类型编码',
    },
  },
  {
    field: 'UserTypeName',
    label: '用户类型名称:',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入用户类型名称',
    },
  },
  {
    field: 'UserTypeDesc',
    label: '描述:',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入类型描述',
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
    label: '等级名称/编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入等级名称/编码',
    },
    colProps: { span: 8 },
  },
];
