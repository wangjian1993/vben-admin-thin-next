<!--
 * @Author: max
 * @Date: 2021-11-25 09:18:09
 * @LastEditTime: 2021-12-01 18:05:22
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
    <BasicTable @register="registerTable" :searchInfo="searchInfo" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, searchFormSchema } from '../data/org';
  import { getOrginfo } from '/@/api/system/system';
  export default defineComponent({
    components: { BasicModal, BasicTable },
    setup() {
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        api: getOrginfo,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        bordered: true,
      });
      const [register] = useModalInner(async (data) => {
        searchInfo.dimsensionId = data.record.OrgDimensionId;
        searchInfo.enterid = data.enterId;
      });
      onMounted(() => {
        reload();
        console.log('1111111');
      });
      return {
        registerTable,
        searchInfo,
        register,
      };
    },
  });
</script>
