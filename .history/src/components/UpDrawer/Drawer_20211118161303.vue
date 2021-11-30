<!--
 * @Author: max
 * @Date: 2021-11-18 14:36:18
 * @LastEditTime: 2021-11-18 16:12:07
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
      const mockData = ref<Recordable[]>([]);
      const schema = ref<DescItem[]>([]);
      // const mockData: Recordable = {};
      // const schema: DescItem[] = [];
      const [registerDrawer] = useDrawerInner((data) => {
        mockData = data.drawerData;
        schema = data.drawerLable;
        console.log('mockData', mockData);
        console.log('schema', schema);
      });
      const [register] = useDescription({
        title: 'useDescription',
      });
      return { mockData, schema, register, registerDrawer };
    },
  });
</script>
