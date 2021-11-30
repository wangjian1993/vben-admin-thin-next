<!--
 * @Author: max
 * @Date: 2021-11-22 16:53:18
 * @LastEditTime: 2021-11-23 11:06:02
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
        v-model:value="enterTypeVale"
        style="width: 200px"
        @change="handleChange"
      >
        <SelectOption
          v-for="item in treeOptions"
          :key="item.EnterTypeId"
          :value="item.EnterTypeId"
          >{{ item.EnterTypeName }}</SelectOption
        >
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
  import { getEnterTree, getInstitutionList } from '/@/api/system/system';
  import { Select, SelectTypes, SelectOption } from 'ant-design-vue';
  export default defineComponent({
    components: { BasicTree, Select, SelectOption },
    emits: ['select'],
    setup(_, { emit }) {
      const treeOptions = ref<SelectTypes['options']>([]);
      const treeData = ref<TreeItem[]>([]);
      const enterTypeVale = ref('');
      const entertypeid = ref('');
      //获取机构列表
      async function fetch() {
        treeData.value = (await getEnterTree({
          entertypeid: entertypeid.value,
        })) as unknown as TreeItem[];
      }
      //获取机构类型类别
      async function getEnterType() {
        let list = await getInstitutionList({ pageindex: 1, pagesize: 20 });
        enterTypeVale.value = list[0].EnterTypeId;
        entertypeid.value = list[0].EnterTypeId;
        treeOptions.value = list;
        fetch();
      }
      //类型选择
      const handleChange = (value: string) => {
        entertypeid.value = value;
        fetch();
      };
      function handleChange() {}
      onMounted(() => {
        getEnterType();
      });
      return { treeData, handleSelect, treeOptions, handleChange, enterTypeVale };
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
