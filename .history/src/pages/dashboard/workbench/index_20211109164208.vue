<!--
 * @Author: max
 * @Date: 2021-11-02 11:27:34
 * @LastEditTime: 2021-11-09 16:41:41
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/pages/dashboard/workbench/index.vue
-->
<template>
  <PageWrapper>
    <div style="display:flex;">
      <img src="../../../assets/images/welcome.png" class="logo" alt="logo" />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  const loading = ref(true);
  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
