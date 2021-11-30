<!--
 * @Author: max
 * @Date: 2021-11-02 11:27:34
 * @LastEditTime: 2021-11-10 09:27:42
 * @LastEditors: max
 * @Description: 工作台页面
 * @FilePath: /vben-admin-thin-next-main/src/views/dashboard/workbench/index.vue
-->
<template>
  <PageWrapper>
    <div class="logo-centent">
      <img src="../../../assets/images/welcome.png" class="logo" alt="logo" />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
</script>
<style lang="less">
  .logo-centent {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }
</style>
