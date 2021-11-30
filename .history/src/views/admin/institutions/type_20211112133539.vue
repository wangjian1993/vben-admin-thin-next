<template>
  <div class="p-2">
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
        <div>
          <BasicForm :labelWidth="10" :schemas="schemas" @submit="handleSubmit" />
        </div>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';
  import { BasicForm, FormSchema } from '/@/components/Form';
  const schemas: FormSchema[] = [
    {
      field: 'field',
      component: 'Input',
      label: '',
      colProps: {
        span: 6,
      },
      defaultValue: '1',
      componentProps: {
        placeholder: '自定义placeholder',
        onChange: (e) => {
          console.log(e);
        },
      },
    },
  ];

  export default defineComponent({
    components: { BasicTable, BasicForm },
    setup() {
      return {
        schemas,
        columns: getBasicColumns(),
        data: getBasicData(),
      };
    },
  });
</script>
