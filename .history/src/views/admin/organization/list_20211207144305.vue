<!--
 * @Author: max
 * @Date: 2021-11-11 13:55:25
 * @LastEditTime: 2021-12-07 14:43:05
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/organization/list.vue
-->
<template>
  <div>
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
      <template #IsPartAuth="{ text }">
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
            {
              icon: 'ant-design:profile-outlined',
              tooltip: '查看',
              label: '查看',
              onClick: handleDetail.bind(null, record),
            },
            {
              icon: 'ant-design:cluster-outlined',
              tooltip: '等级管理',
              label: '等级管理',
              onClick: handleLevel.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <OrgForm @register="registerModal" @success="handleSuccess" />
    <LevelModal @register="registerLevel" />
    <Drawer @register="register" :drawerData="drawerData" :drawerLable="drawerLable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './data/list';
  import { getOrganizationList, orgdimensionAction } from '/@/api/system/system';
  import { Tag } from 'ant-design-vue';
  import OrgForm from './component/OrgForm.vue';
  import LevelModal from './component/LevelModal.vue';
  import { useModal } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import Drawer from '/@/components/UpDrawer/Drawer.vue';
  export default defineComponent({
    components: { BasicTable, Tag, TableAction, OrgForm, Drawer, LevelModal },
    setup() {
      //弹出框
      const checkedKeys = ref<any>([]);
      const drawerData = ref<any>([]);
      const drawerLable = ref<any>([]);
      const [registerModal, { openModal: openModal }] = useModal();
      const [registerLevel, { openModal: openLevelModal }] = useModal();
      const { hasPermission } = usePermission();
      const { createMessage, createConfirm } = useMessage();
      const [register, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '',
        api: getOrganizationList,
        columns,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        rowKey: 'OrgDimensionId',
        clickToRowSelect: false,
        useSearchForm: true,
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys: checkedKeys,
          onChange: onSelectChange,
        },
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
        actionColumn: {
          width: 220,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      //编辑
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      //添加-------
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }
      //查看详情
      function handleDetail(record: Recordable) {
        record.Enable = record.Enable == 'Y' ? '启用' : '禁用';
        drawerData.value = record;
        drawerLable.value = columns;
        drawerLable.value.forEach((item) => {
          if (item.dataIndex) {
            item.field = item.dataIndex;
            item.label = item.title;
            item.labelMinWidth = 10;
          }
        });
        openDrawer(true, {
          drawerLable,
          drawerData,
        });
      }
      //新增
      async function handleSuccess(item) {
        if (!item.isUpdate) {
          await orgdimensionAction(item.values, 'add');
          createMessage.success('新增成功！');
        } else {
          await orgdimensionAction(item.values, 'update');
          createMessage.success('编辑成功！');
        }
        await reload();
      }
      //单个删除
      async function handleDelete(record: Recordable) {
        let parmas: string[] = [];
        parmas.push(record.OrgDimensionId);
        await orgdimensionAction(parmas, 'delete');
        createMessage.success('删除成功！');
        await reload();
      }
      //多选删除
      async function handleAllDelete() {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '确认要删除选中内容？',
          onOk: async () => {
            await orgdimensionAction(checkedKeys.value, 'delete');
            createMessage.success('删除成功！');
            await reload();
          },
        });
      }
      function handleLevel(record: Recordable) {
        openLevelModal(true, { ...record });
      }
      //多选
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }
      return {
        handleCreate,
        handleEdit,
        handleDelete,
        handleAllDelete,
        handleSuccess,
        handleDetail,
        registerLevel,
        registerModal,
        registerTable,
        hasPermission,
        onSelectChange,
        register,
        drawerData,
        drawerLable,
        checkedKeys,
        handleLevel,
      };
    },
  });
</script>
