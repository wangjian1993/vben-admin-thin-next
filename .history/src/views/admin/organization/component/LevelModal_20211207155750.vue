<!--
 * @Author: max
 * @Date: 2021-12-07 13:43:42
 * @LastEditTime: 2021-12-07 15:57:50
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/organization/component/LevelModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    title="选择"
    width="50%"
    @register="register"
    :maskClosable="true"
    centered
    @ok="handleOk"
  >
    <BasicTable @register="registerTable" :searchInfo="searchInfo"
      ><template #tableTitle>
        <a-button
          @click="handleCreate"
          type="primary"
          preIcon="ant-design:plus-outlined"
          :disabled="!hasPermission('add')"
          >新增</a-button
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
        /> </template
    ></BasicTable>
    <LevelForm @register="registerModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from '../data/level';
  import { getOrgLevelList, orgLevelAction } from '/@/api/system/system';
  import { usePermission } from '/@/hooks/web/usePermission';
  import LevelForm from './LevelForm.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    components: { BasicModal, BasicTable, TableAction, LevelForm },
    emits: ['orgSubSelect'],
    setup(_, { emit }) {
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const checkedKeys = ref<any>([]);
      const { hasPermission } = usePermission();
      const { createMessage, createConfirm } = useMessage();
      const [registerTable, { reload, getRawDataSource }] = useTable({
        api: getOrgLevelList,
        columns,
        rowKey: 'OrgLevelId',
        useSearchForm: true,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          baseColProps: { xs: 24, sm: 12, md: 8, lg: 8 },
          resetButtonOptions: {
            // @ts-ignore
            preIcon: 'ant-design:reload-outlined',
          },
          submitButtonOptions: {
            // @ts-ignore
            preIcon: 'ant-design:search-outlined',
          },
        },
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys: checkedKeys,
          onChange: onSelectChange,
        },
        showIndexColumn: false,
        clickToRowSelect: false,
        bordered: true,
        actionColumn: {
          width: 220,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        searchInfo.dimsensionId = data.record.OrgDimensionId;
        setModalProps({ title: `${data.record.OrgDimensionName}-等级管理` });
        reload();
      });
      //多选
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }
      async function handleOk() {
        let { list } = await getRawDataSource();
        emit('orgSubSelect', list[checkedKeys.value[0]]);
        closeModal();
      }
      function handleCreate() {
        console.log('tianj ===');
        openModal(true, {
          isUpdate: false,
          OrgDimensionId: searchInfo.dimsensionId,
        });
      }
      async function handleAllDelete() {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '确认要删除选中内容？',
          onOk: async () => {
            await orgLevelAction(checkedKeys.value, 'delete');
            createMessage.success('删除成功！');
            await reload();
          },
        });
      }
      function handleEdit(record) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      async function handleDelete(record) {
        let parmas: string[] = [];
        parmas.push(record.OrgLevelId);
        await orgLevelAction(parmas, 'delete');
        createMessage.success('删除成功！');
        await reload();
      }
      //添加
      async function handleSuccess(item) {
        if (!item.isUpdate) {
          await orgLevelAction(item.values, 'add');
          createMessage.success('新增成功！');
        } else {
          await orgLevelAction(item.values, 'update');
          createMessage.success('编辑成功！');
        }
        await reload();
      }
      return {
        hasPermission,
        registerTable,
        searchInfo,
        register,
        onSelectChange,
        handleOk,
        checkedKeys,
        handleCreate,
        handleAllDelete,
        handleEdit,
        handleDelete,
        registerModal,
        handleSuccess,
      };
    },
  });
</script>
