<!--
 * @Author: max
 * @Date: 2021-11-22 16:53:18
 * @LastEditTime: 2021-11-23 10:41:04
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/component/EnterTree.vue
-->
<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <div class="tree-select">
      <p>机构类型选择:</p>
      <a-select v-model:value="value3" style="width: 120px" loading>
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
    </div>
    <BasicTree
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getEnterTree, getInstitutionList } from '/@/api/system/system';
  import { Select, SelectTypes } from 'ant-design-vue';
  export default defineComponent({
    components: { BasicTree, Select },
    emits: ['select'],
    setup(_, { emit }) {
      const treeOptions = ref<SelectTypes['options']>([]);
      const treeData = ref<TreeItem[]>([]);
      async function fetch() {
        treeData.value = (await getEnterTree()) as unknown as TreeItem[];
      }
      async function getEnterType() {
        let list = await getInstitutionList();
        list.forEach((item) => {
          item.label = item.EnterTypeName;
          item.value = item.EnterTypeId;
        });
        treeOptions.value = list;
      }
      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      onMounted(() => {
        // fetch();
        getEnterType();
      });
      return { treeData, handleSelect };
    },
  });
</script>
<style lang="less">
  .tree-select {
    padding: 5px 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      height: 40px;
      line-height: 40px;
      margin: 0;
    }
  }
</style>
