<!--
 * @Author: max
 * @Date: 2021-11-11 13:54:56
 * @LastEditTime: 2021-11-23 13:52:42
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/list.vue
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <EnterTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :enterid="enterid">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
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
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref} from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { getUserList } from '/@/api/system/system';
  import EnterTree from './component/EnterTree.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './data/list';
  import { Tag } from 'ant-design-vue';
  export default defineComponent({
    name: 'userList',
    components: { BasicTable, PageWrapper, EnterTree, TableAction, Tag },
    setup() {
      const enterid = ref('');
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
      });
      function handleCreate() {
        openModal(true, {
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

      function handleSelect(enterid: String) {
        console.log("enterid===",enterid)
        enterid.value = enterid;
        reload();
      }

      function handleView() {}
      return {
        enterid,
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
