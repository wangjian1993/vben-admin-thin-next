<!--
 * @Author: max
 * @Date: 2021-11-11 13:54:56
 * @LastEditTime: 2021-11-23 09:33:21
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/list.vue
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex"><p>哈哈哈</p></PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { getUserList } from '/@/api/demo/system';
  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './data/list';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'userList',
    components: { PageWrapper },
    setup() {
      return {};
    },
  });
</script>
