<!--
 * @Author: max
 * @Date: 2021-11-18 14:36:18
 * @LastEditTime: 2021-11-18 16:25:43
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/components/UpDrawer/Drawer.vue
-->
<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="Drawer Title" width="25%">
    <Description :column="1" :data="mockData" :schema="schema" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  export default defineComponent({
    components: { BasicDrawer, Description },
    setup() {
      let mockData = ref([]);
      let schema = ref([]);
      const [registerDrawer] = useDrawerInner((data) => {
        console.log('mockData', data);
        mockData = data.drawerData;
        schema = data.drawerLable;
      });
      const [register] = useDescription({
        title: 'useDescription',
      });
      console.log('mockData', mockData);
      console.log('schema', schema);
      return { mockData, schema, register, registerDrawer };
    },
  });
</script>
