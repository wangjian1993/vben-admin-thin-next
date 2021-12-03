<!--
 * @Author: max
 * @Date: 2021-11-25 09:18:09
 * @LastEditTime: 2021-12-01 17:38:38
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
  import { defineComponent } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, searchFormSchema } from '../data/org';
  import { getOrginfo } from '/@/api/system/system';
  export default defineComponent({
    components: { BasicModal, BasicTable },
    setup() {
      const searchInfo = reactive<Recordable>({});
      const [registerTable] = useTable({
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
        console.log('11111111111111', data);
      });
      return {
        registerTable,
        searchInfo,
        register,
      };
    },
  });
</script>
