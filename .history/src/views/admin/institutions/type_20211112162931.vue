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
          <a-form-item label="">
            <a-input v-model:value="formState.name" style="width: 200px" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 8, offset: 1 }" style="margin-left: 10px">
            <a-button type="primary" preIcon="mdi:page-next-outline"> 主按钮 </a-button>
            <Button style="margin-left: 10px">重置</Button>
          </a-form-item>
        </a-form>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import Button from '/@/components/Button';
  import { getBasicColumns, getBasicData } from './tableData';
  import { defineComponent, reactive, toRaw, UnwrapRef } from 'vue';
  interface FormState {
    name: string;
  }
  export default defineComponent({
    components: { BasicTable, Button },
    setup() {
      const formState: UnwrapRef<FormState> = reactive({
        name: '',
      });
      const onSubmit = () => {
        console.log('submit!', toRaw(formState));
      };
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 1 },
        formState,
        onSubmit,
        columns: getBasicColumns(),
        data: getBasicData(),
      };
    },
  });
</script>
