<!--
 * @Author: max
 * @Date: 2021-12-07 13:43:42
 * @LastEditTime: 2021-12-07 14:54:12
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/organization/component/LevelModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    title="选择"
    width="50%"
    @register="register"
    :maskClosable="true"
    centered
    @ok="handleOk"
  >
    <BasicTable @register="registerTable" @row-dbClick="handleRowDbClick" :searchInfo="searchInfo"
      ><template #tableTitle>
        <a-button
          @click="handleCreate"
          type="primary"
          preIcon="ant-design:plus-outlined"
          :disabled="!hasPermission('add')"
          >新增</a-button
        >
        <a-button
          @click="handleAllDelete"
          style="margin-left: 10px"
          preIcon="ant-design:delete-outlined"
          :disabled="!hasPermission('delete') && checkedKeys.length > 0"
          >删除</a-button
        >
        <template v-if="checkedKeys.length > 0">
          <span class="ml-2">已选中{{ checkedKeys.length }}条记录(可跨页)</span>
          <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
        </template>
      </template></BasicTable
    >
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, searchFormSchema } from '../data/level';
  import { getOrgLevelList } from '/@/api/system/system';
  export default defineComponent({
    components: { BasicModal, BasicTable },
    emits: ['orgSubSelect'],
    setup(_, { emit }) {
      const searchInfo = reactive<Recordable>({});
      const checkedKeys = ref<any>([]);
      const [registerTable, { reload, getRawDataSource }] = useTable({
        api: getOrgLevelList,
        columns,
        rowKey: 'OrgLevelId',
        useSearchForm: true,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          baseColProps: { xs: 24, sm: 12, md: 8, lg: 8 },
          resetButtonOptions: {
            // @ts-ignore
            preIcon: 'ant-design:reload-outlined',
          },
          submitButtonOptions: {
            // @ts-ignore
            preIcon: 'ant-design:search-outlined',
          },
        },
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys: checkedKeys,
          onChange: onSelectChange,
        },
        useSearchForm: true,
        showIndexColumn: false,
        bordered: true,
        actionColumn: {
          width: 220,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        searchInfo.dimsensionId = data.record.OrgDimensionId;
        setModalProps({ title: `${data.record.OrgDimensionName}-等级管理` });
        reload();
      });
      function handleRowDbClick(record: Recordable) {
        emit('orgSubSelect', record);
        closeModal();
      }
      //多选
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }
      async function handleOk() {
        let { list } = await getRawDataSource();
        emit('orgSubSelect', list[checkedKeys.value[0]]);
        closeModal();
      }
      function handleAllDelete() {
        // body
      }
      function handleAllDelete(arguments) {
        // body
      }
      return {
        registerTable,
        searchInfo,
        register,
        onSelectChange,
        handleRowDbClick,
        handleOk,
        checkedKeys,
        handleAllDelete,
        handleAllDelete,
      };
    },
  });
</script>
