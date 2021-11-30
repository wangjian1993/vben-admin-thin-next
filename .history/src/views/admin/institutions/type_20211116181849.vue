<!--
 * @Author: max
 * @Date: 2021-11-11 13:43:39
 * @LastEditTime: 2021-11-16 18:18:49
 * @LastEditors: max
 * @Description: 机构类型
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/type.vue
-->
<template>
  <div class="p-2">
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button
          @click="handleCreate"
          type="primary"
          preIcon="ant-design:plus-outlined"
          :disabled="!hasPermission('add')"
          >新增</a-button
        >
        <a-button
          style="margin-left: 10px"
          preIcon="ant-design:delete-outlined"
          :disabled="!hasPermission('delete')"
          >删除</a-button
        >
        <template v-if="checkedKeys.length > 0">
          <span>已选中{{ checkedKeys.length }}条记录(可跨页)</span>
          <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
        </template>
      </template>
      <template #toolbar>
        <a-form :model="formState">
          <a-form-item label="">
            <a-input v-model:value="formState.name" style="width: 200px" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 8, offset: 1 }" style="margin-left: 10px">
            <a-button type="primary" preIcon="ant-design:search-outlined"> 搜索 </a-button>
            <a-button style="margin-left: 10px" preIcon="ant-design:reload-outlined">重置</a-button>
          </a-form-item>
        </a-form>
      </template>
      <template #Enable="{ text }">
        <Tag :color="text === 'Y' ? 'success' : 'error'">
          {{ text === 'Y' ? '启用' : '禁用' }}
        </Tag>
      </template>
      <template #IsDefualt="{ text }">
        <Tag :color="text === 'Y' ? 'success' : 'error'">
          {{ text === 'Y' ? '是' : '否' }}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <TypeFormModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns } from './data/type';
  import { defineComponent, reactive, toRaw, UnwrapRef } from 'vue';
  import { getInstitutionList, enterTypeAction } from '/@/api/system/system';
  import { Tag } from 'ant-design-vue';
  import TypeFormModal from './component/TypeFormModal.vue';
  import { useModal } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  interface FormState {
    name: string;
  }
  export default defineComponent({
    components: { BasicTable, Tag, TableAction, TypeFormModal },
    setup() {
      //弹出框
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerModal, { openModal }] = useModal();
      const { hasPermission } = usePermission();
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: '',
        api: getInstitutionList,
        columns,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        rowKey: 'EnterTypeId',
        clickToRowSelect: true,
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      const formState: UnwrapRef<FormState> = reactive({
        name: '',
      });
      const onSubmit = () => {
        console.log('submit!', toRaw(formState));
      };
      function handleEdit(record: Recordable) {
        console.log(record);
      }
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }
      //新增
      async function handleSuccess(item) {
        console.log(item);
        if (!item.isUpdate) {
          await enterTypeAction(item.values, 'add');
          createMessage.success('新增成功！');
          await reload();
        }
      }
      //单个删除
      async function handleDelete(record: Recordable) {
        let parmas = [];
        parmas.push(record.EnterTypeId);
        await enterTypeAction(parmas, 'delete');
        createMessage.success('删除成功！');
        await reload();
      }
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        console.log(selectedRowKeys);
        checkedKeys.value = selectedRowKeys;
      }
      return {
        handleCreate,
        registerModal,
        handleEdit,
        handleDelete,
        registerTable,
        formState,
        onSubmit,
        hasPermission,
        handleSuccess,
        onSelectChange,
        checkedKeys,
      };
    },
  });
</script>
