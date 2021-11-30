<!--
 * @Author: max
 * @Date: 2021-11-19 15:09:40
 * @LastEditTime: 2021-11-24 15:21:50
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/component/UserFormModal.vue
-->
<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      centered
      maskClosable
      :title="getTitle"
      @ok="handleSubmit"
      width="50%"
    >
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1" tab="Tab 1">
          <div class="avatar-box">
            <p>头像:</p>
            <Upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <Icon v-if="loading" icon="ant-design:loading-outlined" />
                <Icon v-else icon="ant-design:plus-outlined" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </Upload>
          </div>
          <BasicForm @register="registerForm" />
        </TabPane>
        <TabPane key="2" tab="Tab 2">Content of Tab Pane 2</TabPane>
        <TabPane key="3" tab="Tab 3">Content of Tab Pane 3</TabPane>
      </Tabs>
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataFormSchema } from '../data/list';
  // import { getEnterList, getInstitutionList } from '/@/api/system/system';
  import { Tabs, Upload } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  export default defineComponent({
    components: {
      BasicModal,
      BasicForm,
      Tabs,
      TabPane: Tabs.TabPane,
      Upload,
      Icon,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const SuperiorEnter = ref('');
      const enterTypeInfo = ref(Array);
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 120,
        schemas: dataFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        // const list = await getEnterList({ pageindex: 1, pagesize: 100 });
        // const typeList = await getInstitutionList({ pageindex: 1, pagesize: 100 });
        // console.log('typeList', typeList);
        // list.forEach((item) => {
        //   item.label = item.EnterName;
        //   item.value = item.EnterId;
        // });
        // typeList.forEach((item) => {
        //   item.label = item.EnterTypeName;
        //   item.value = item.EnterTypeCode;
        // });
        // list.unshift({
        //   label: '顶级',
        //   value: '0',
        // });
        // updateSchema([
        //   {
        //     field: 'SuperiorEnterId',
        //     componentProps: {
        //       options: list,
        //       onChange: (e) => {
        //         if (e == 0) SuperiorEnter.value = '顶级';
        //         return;
        //         const { EnterName } = list.find((item) => item.EnterId === e);
        //         SuperiorEnter.value = EnterName;
        //       },
        //     },
        //   },
        //   {
        //     field: 'EnterTypeName',
        //     componentProps: {
        //       options: typeList,
        //       onChange: (e) => {
        //         enterTypeInfo.value = typeList.find((item) => item.EnterTypeCode === e);
        //         console.log(enterTypeInfo);
        //       },
        //     },
        //   },
        // ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));
      async function handleSubmit() {
        try {
          const values = await validate();
          values.EnterTypeId = enterTypeInfo.value.EnterTypeId;
          values.EnterTypeName = enterTypeInfo.value.EnterTypeName;
          values.EnterTypeCode = enterTypeInfo.value.EnterTypeCode;
          if (SuperiorEnter.value != '') {
            values.SuperiorEnterName = SuperiorEnter.value;
          } else {
            values.SuperiorEnterName = '';
            values.SuperiorEnterId = '';
          }
          setModalProps({ confirmLoading: true });
          closeModal();
          if (!unref(isUpdate)) {
            //新增
            emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
          } else {
            //编辑
            emit('success', {
              isUpdate: unref(isUpdate),
              values: { ...values, EnterId: rowId.value },
            });
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        activeKey: ref('1'),
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      };
    },
  });
</script>
<style lang="less">
  .avatar-box {
    display: flex;
    align-items: center;
    margin-left: 100px;
    justify-content: center;
  }
</style>
