<!--
 * @Author: max
 * @Date: 2021-12-07 13:43:42
 * @LastEditTime: 2021-12-07 14:49:53
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
    <BasicTable
      @register="registerTable"
      @row-dbClick="handleRowDbClick"
      :searchInfo="searchInfo"
    />
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
        rowKey: 'index',
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
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
      return {
        registerTable,
        searchInfo,
        register,
        onSelectChange,
        handleRowDbClick,
        handleOk,
      };
    },
  });
</script>
