<!--
 * @Author: max
 * @Date: 2021-11-22 16:53:18
 * @LastEditTime: 2021-11-23 09:43:37
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/component/EnterTree.vue
-->
<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree :treeData="treeData" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { CollapseContainer } from '/@/components/Container/index';
  export const treeData: TreeItem[] = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: 'home|svg',
      children: [
        { title: 'leaf', key: '0-0-0' },
        {
          title: 'leaf',
          key: '0-0-1',
          children: [
            { title: 'leaf', key: '0-0-0-0' },
            { title: 'leaf', key: '0-0-0-1' },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '1-1',
      icon: 'home|svg',
      children: [
        { title: 'leaf', key: '1-1-0' },
        { title: 'leaf', key: '1-1-1' },
      ],
    },
    {
      title: 'parent 3',
      key: '2-2',
      icon: 'home|svg',
      children: [
        { title: 'leaf', key: '2-2-0' },
        { title: 'leaf', key: '2-2-1' },
      ],
    },
  ];
  export default defineComponent({
    components: { BasicTree, CollapseContainer },
    setup() {
      return { treeData };
    },
  });
</script>
