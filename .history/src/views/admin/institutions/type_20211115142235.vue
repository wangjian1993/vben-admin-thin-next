<!--
 * @Author: max
 * @Date: 2021-11-11 13:43:39
 * @LastEditTime: 2021-11-15 14:22:35
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/type.vue
-->
<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined">新增</a-button>
        <a-button style="margin-left: 10px" preIcon="ant-design:delete-outlined">删除</a-button>
      </template>
      <template #toolbar>
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="">
            <a-input v-model:value="formState.name" style="width: 200px" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 8, offset: 1 }" style="margin-left: 10px">
            <a-button type="primary" preIcon="ant-design:search-outlined"> 搜索 </a-button>
            <a-button style="margin-left: 10px" preIcon="ant-design:reload-outlined">重置</a-button>
          </a-form-item>
        </a-form>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './type.data';
  import { defineComponent, reactive, toRaw, UnwrapRef } from 'vue';
  import { getInstitutionList } from '/@/api/system/system';
  import { PageWrapper } from '/@/components/Page';
  interface FormState {
    name: string;
  }
  export default defineComponent({
    components: { BasicTable, PageWrapper },
    setup() {
      const [registerTable] = useTable({
        title: '',
        api: getInstitutionList,
        columns,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        TableSetting: {
          redo: true,
        },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      const formState: UnwrapRef<FormState> = reactive({
        name: '',
      });
      const onSubmit = () => {
        console.log('submit!', toRaw(formState));
      };
      return {
        registerTable,
        labelCol: { span: 4 },
        wrapperCol: { span: 1 },
        formState,
        onSubmit,
      };
    },
  });
</script>
