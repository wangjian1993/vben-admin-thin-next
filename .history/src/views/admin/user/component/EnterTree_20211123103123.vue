<!--
 * @Author: max
 * @Date: 2021-11-22 16:53:18
 * @LastEditTime: 2021-11-23 10:30:34
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/component/EnterTree.vue
-->
<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <div class="tree-select">
      <p>机构类型选择:</p>
      <Select
        ref="select"
        v-model:value="value1"
        style="width: 120px"
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="disabled" disabled>Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </Select>
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
  import { getEnterTree } from '/@/api/system/system';
  import { Select } from 'ant-design-vue';
  export default defineComponent({
    components: { BasicTree, Select },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        treeData.value = (await getEnterTree()) as unknown as TreeItem[];
      }

      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      onMounted(() => {
        fetch();
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
