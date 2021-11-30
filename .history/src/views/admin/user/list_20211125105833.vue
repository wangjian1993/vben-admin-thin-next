<!--
 * @Author: max
 * @Date: 2021-11-11 13:54:56
 * @LastEditTime: 2021-11-25 10:58:33
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/list.vue
-->
<template>
  <div>
    <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
      <EnterTree ref="treeRef" class="w-1/4 xl:w-1/5" @select="handleSelect" />
      <UserBasicTable
        ref="tableRef"
        class="w-3/4 xl:w-4/5"
        :enterid="enterid"
        @refreshTree="handelRefreshTree"
      />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import EnterTree from './component/EnterTree.vue';
  import UserBasicTable from './component/UserBasicTable.vue';
  export default defineComponent({
    name: 'UserList',
    components: { PageWrapper, EnterTree, UserBasicTable },
    setup() {
      const enterid = ref();
      const treeRef = ref();
      const tableRef = ref();
      function handleSelect(id: string) {
        enterid.value = id;
        reload();
      }

      function handelRefreshTree(value) {
        // 刷新左侧树
        unref(treeRef).refresh(value);
        const nodeIdTemp = value;
        // nodeId未改变，主动触发表格刷新
        if (nodeIdTemp === enterid.value) {
          unref(tableRef).refresh();
        }
        // watch，触发表格刷新
        enterid.value = nodeIdTemp;
      }
      return {
        treeRef,
        tableRef,
        handleSelect,
        enterid,
        handelRefreshTree,
      };
    },
  });
</script>
