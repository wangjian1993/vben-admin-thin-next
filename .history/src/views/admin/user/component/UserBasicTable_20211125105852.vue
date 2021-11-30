<!--
 * @Author: max
 * @Date: 2021-11-25 10:45:17
 * @LastEditTime: 2021-11-25 10:58:52
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/component/UserBasicTable.vue
-->
<!--  -->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"
          >新增账号</a-button
        >
      </template>
      <template #Enable="{ text }">
        <Tag :color="text === 'Y' ? 'success' : 'error'">
          {{ text === 'Y' ? '启用' : '禁用' }}
        </Tag>
      </template>
      <template #IsLocked="{ text }">
        <Tag :color="text === 'Y' ? 'success' : 'error'">
          {{ text === 'Y' ? '正常' : '锁定' }}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看用户详情',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserFormModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, watch } from 'vue';
  import { getUserList } from '/@/api/system/system';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from '../data/list';
  import { Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import UserFormModal from './component/UserFormModal.vue';
  const props = {
    nodeId: { type: String },
    tenantId: { type: String },
  };
  export default defineComponent({
    name: '',
    components: { BasicTable, TableAction, Tag, UserFormModal },
    props,
    emits: ['refresh-tree'],
    setup(props, { emit }) {
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        api: getUserList,
        rowKey: 'UserId',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        beforeFetch: handleBeforeFetch,
      });
      function handleCreate() {
        const enterid = searchInfo.enterid;
        openModal(true, {
          enterid,
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {}

      function handleSelect(id: string) {
        searchInfo.enterid = id;
        reload();
      }
      function handleBeforeFetch(params) {
        return Object.assign(params, { enterid: searchInfo.enterid });
      }
      async function handleSuccess({ isUpdate, values }) {
        console.log(isUpdate);
        console.log(values);
        emit('refresh-tree', values.deptId);
        // 表格刷新，在refresh-tree事件之后，执行
        // reload();
      }
      watch(
        () => props.nodeId,
        () => {
          nextTick(() => {
            reload();
          });
        },
      );
      return {
        registerModal,
        searchInfo,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
      };
    },
  });
</script>
<style scoped lang="less"></style>
