<template>
  <div class="p-1">
    <BasicTable
      :columns="columns"
      :dataSource="data"
      :canResize="canResize"
      :loading="loading"
      :striped="striped"
      :bordered="border"
      showTableSetting
      :pagination="{ pageSize: 20 }"
    >
      <template #tableTitle>
        <a-button type="primary" style="">操作按钮</a-button>
      </template>
      <template #toolbar>
        <a-input type="text" style="width: 200px" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      return {
        columns: getBasicColumns(),
        data: getBasicData(),
      };
    },
  });
</script>
