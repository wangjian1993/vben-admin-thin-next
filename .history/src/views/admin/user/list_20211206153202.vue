<!--
 * @Author: max
 * @Date: 2021-11-11 13:54:56
 * @LastEditTime: 2021-12-06 15:32:02
 * @LastEditors: max
 * @Description: 用户列表
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
          <a-button
            @click="handleAllDelete"
            style="margin-left: 10px"
            preIcon="ant-design:delete-outlined"
            :disabled="!hasPermission('delete') && checkedKeys.length > 0"
            >删除</a-button
          >
          <template v-if="checkedKeys.length > 0">
            <span class="ml-2">已选中{{ checkedKeys.length }}条记录(可跨页)</span>
            <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
          </template>
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
  import { defineComponent, reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { getUserList, userAction } from '/@/api/system/system';
  import EnterTree from './component/EnterTree.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './data/list';
  import { Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import UserFormModal from './component/UserFormModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'UserList',
    components: { BasicTable, PageWrapper, EnterTree, TableAction, Tag, UserFormModal },
    setup() {
      const checkedKeys = ref<any>([]);
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const { createMessage } = useMessage();
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        api: getUserList,
        rowKey: 'UserId',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys: checkedKeys,
          onChange: onSelectChange,
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
        userAction({ UserId: item.UserId, IsLocked: item.IsLocked == 'Y' ? 'N' : 'Y' }, 'lockuser');
        reload();
      }
      function handleSelect(id: string) {
        searchInfo.enterid = id;
        reload();
      }
      //多选
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }
      function handleView() {}
      return {
        onSelectChange,
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
        checkedKeys,
        hasPermission,
      };
    },
  });
</script>
