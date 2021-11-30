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
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="Activity name">
            <a-input v-model:value="formState.name" />
          </a-form-item>
        </a-form>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';
  interface FormState {
    name: string;
  }
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const formState: UnwrapRef<FormState> = reactive({
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      });
      const onSubmit = () => {
        console.log('submit!', toRaw(formState));
      };
      return {
        schemas,
        columns: getBasicColumns(),
        data: getBasicData(),
      };
    },
  });
</script>
