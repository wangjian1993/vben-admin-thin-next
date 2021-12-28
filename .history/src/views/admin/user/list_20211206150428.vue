<!--
 * @Author: max
 * @Date: 2021-11-11 13:54:56
 * @LastEditTime: 2021-12-06 15:04:28
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/list.vue
-->
<template>
  <div>
    <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
      <EnterTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
      <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
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
          <Tag :color="text === 'N' ? 'success' : 'error'">
            {{ text === 'Y' ? '已锁定' : '正常' }}
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
            :dropDownActions="[
              {
                label: record.Enable == 'Y' ? '禁用' : '启用',
                onClick: handleEnable.bind(null, record),
              },
              {
                label: record.IsLocked == 'Y' ? '解锁' : '锁定',
                onClick: handleLocked.bind(null, record),
              },
            ]"
          />
        </template>
      </BasicTable>
      <UserFormModal @register="registerModal" @success="handleSuccess" />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { getUserList, userAction } from '/@/api/system/system';
  import EnterTree from './component/EnterTree.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './data/list';
  import { Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import UserFormModal from './component/UserFormModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'UserList',
    components: { BasicTable, PageWrapper, EnterTree, TableAction, Tag, UserFormModal },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const { createMessage } = useMessage();
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

      async function handleDelete(record: Recordable) {
        console.log(record);
        let parmas: string[] = [];
        parmas.push(record.UserId);
        await userAction(parmas, 'delete');
        createMessage.success('删除成功！');
        await reload();
      }

      async function handleSuccess(item) {
        console.log('提交====', item);
        if (!item.isUpdate) {
          await userAction(item.values, 'add');
          createMessage.success('新增成功！');
        } else {
          // await userTypeAction(item.values, 'update');
          // createMessage.success('编辑成功！');
        }
        await reload();
      }
      async function handleEnable(item) {
        await userAction(
          { UserId: item.UserId, Enable: item.Enable == 'Y' ? 'N' : 'Y' },
          'enableuser',
        );
        await reload();
      }
      function handleLocked(item) {
        await userAction(
          { UserId: item.UserId, IsLocked: item.IsLocked == 'Y' ? 'N' : 'Y' },
          'lockuser',
        );
        await reload();
      }
      function handleSelect(id: string) {
        searchInfo.enterid = id;
        reload();
      }
      function handleView() {}
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
        handleEnable,
        handleLocked,
      };
    },
  });
</script>
