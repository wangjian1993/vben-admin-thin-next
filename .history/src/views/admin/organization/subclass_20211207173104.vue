<template>
  <div>
    <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
      <EnterTree class="w-1/4 xl:w-1/5" />
      <BasicTable @register="registerTable" class="w-2/4 xl:w-3/5" :searchInfo="searchInfo" />
      <UserList class="w-1/4 xl:w-1/5" />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { getUserList, userAction } from '/@/api/system/system';
  import EnterTree from '/@/component/EnterTree/EnterTree.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './data/list';
  import { Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import UserList from './component/UserList.vue';
  export default defineComponent({
    name: 'UserList',
    components: { BasicTable, PageWrapper, EnterTree, TableAction, Tag, UserList },
    setup() {
      const checkedKeys = ref<any>([]);
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const { createMessage, createConfirm } = useMessage();
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
      //多选删除
      async function handleAllDelete() {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '确认要删除选中内容？',
          onOk: async () => {
            await userAction(checkedKeys.value, 'delete');
            createMessage.success('删除成功！');
            await reload();
            checkedKeys.value = [];
          },
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
        handleAllDelete,
      };
    },
  });
</script>
