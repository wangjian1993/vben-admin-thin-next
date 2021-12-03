<!--
 * @Author: max
 * @Date: 2021-11-25 09:18:09
 * @LastEditTime: 2021-12-02 10:36:02
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
    @row-dbClick="rowClick"
    :maskClosable="true"
    centered
  >
    <BasicTable @register="registerTable" :searchInfo="searchInfo" />
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
    setup() {
      const searchInfo = reactive<Recordable>({});
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { reload }] = useTable({
        api: getOrginfo,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        rowSelection: {
          type: 'radio',
          selectedRowKeys: checkedKeys,
          onChange: onSelectChange,
        },
        clickToRowSelect: false,
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
      function rowClick(record) {
        console.log(record);
      }
      return {
        registerTable,
        searchInfo,
        register,
        onSelectChange,
        rowClick,
      };
    },
  });
</script>
