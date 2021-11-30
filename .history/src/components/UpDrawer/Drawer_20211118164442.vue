<!--
 * @Author: max
 * @Date: 2021-11-18 14:36:18
 * @LastEditTime: 2021-11-18 16:44:42
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/components/UpDrawer/Drawer.vue
-->
<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="详情" size="small" width="25%">
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
      let mockData = ref<Recordable[]>([]);
      let schema = ref<DescItem[]>([]);
      const [registerDrawer] = useDrawerInner((data) => {
        mockData.value = data.drawerData;
        schema.value = data.drawerLable;
      });
      const [register] = useDescription({
        title: 'useDescription',
      });
      return { mockData, schema, register, registerDrawer };
    },
  });
</script>
