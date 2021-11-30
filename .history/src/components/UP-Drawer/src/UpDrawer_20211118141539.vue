<!--
 * @Author: max
 * @Date: 2021-11-18 14:10:46
 * @LastEditTime: 2021-11-18 14:15:39
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/components/UP-Drawer/src/UpDrawer.vue
-->
<template>
  <BasicDrawer v-bind="$attrs" title="Drawer Title" width="50%"> Drawer Info. </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  export default defineComponent({
    components: { BasicDrawer },
  });
</script>
