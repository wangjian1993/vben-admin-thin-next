<!--
 * @Author: max
 * @Date: 2021-11-25 09:18:09
 * @LastEditTime: 2021-12-02 10:58:00
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/component/OrgListModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    title="行政组织选择"
    width="50%"
    @register="register"
    :maskClosable="true"
    centered
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
  import { columns, searchFormSchema } from '../data/org';
  import { getOrginfo } from '/@/api/system/system';
  export default defineComponent({
    components: { BasicModal, BasicTable },
    emits: ['orgSubSelect'],
    setup(_, { emit }) {
      const searchInfo = reactive<Recordable>({});
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { reload }] = useTable({
        api: getOrginfo,
        columns,
        rowKey: 'OrgId',
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        rowSelection: {
          type: 'radio',
          selectedRowKeys: checkedKeys,
        },
        useSearchForm: true,
        showIndexColumn: false,
        bordered: true,
      });
      const [register] = useModalInner(async (data) => {
        searchInfo.dimsensionId = data.record.OrgDimensionId;
        searchInfo.enterid = data.enterId;
        reload();
      });
      //单选
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        console.log(selectedRowKeys);
        checkedKeys.value = selectedRowKeys;
      }
      function handleRowDbClick(record: Recordable) {
        console.log('handleRowDbClick', record);
        emit('orgSubSelect', record);
      }
      return {
        registerTable,
        searchInfo,
        register,
        onSelectChange,
        handleRowDbClick,
      };
    },
  });
</script>
