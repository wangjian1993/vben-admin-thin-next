<!--
 * @Author: max
 * @Date: 2021-11-25 09:18:09
 * @LastEditTime: 2021-12-01 15:15:00
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/component/OrgListModal.vue
-->
<template>
  <BasicModal v-bind="$attrs" title="Modal Title" :maskClosable="true" centered>
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  export default defineComponent({
    components: { BasicModal, BasicTable },
    setup() {
      const [registerTable, { setLoading }] = useTable({
        columns: getBasicColumns(),
      });
      function changeLoading() {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      return {
        registerTable,
        changeLoading,
      };
    },
  });
</script>
