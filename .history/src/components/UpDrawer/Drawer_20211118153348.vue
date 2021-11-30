<!--
 * @Author: max
 * @Date: 2021-11-18 14:36:18
 * @LastEditTime: 2021-11-18 15:33:48
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/components/UpDrawer/Drawer.vue
-->
<template>
  <BasicDrawer v-bind="$attrs" title="Drawer Title" width="25%">
    <Description :column="1" :data="mockData" :schema="schema" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { propTypes } from '/@/utils/propTypes';
  const mockData: Recordable = {};
  const schema: DescItem[] = [];
  export default defineComponent({
    components: { BasicDrawer, Description },
    props: {
      drawerData: propTypes.object,
      drawerLable: propTypes.object,
    },
    setup(props) {
      console.log(props.drawerData);
      return { mockData, schema };
    },
  });
</script>
