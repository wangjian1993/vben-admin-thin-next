<!--
 * @Author: max
 * @Date: 2021-11-19 15:09:40
 * @LastEditTime: 2021-12-06 09:42:12
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
        <TabPane key="1" tab="基本信息">
          <div class="avatar-box">
            <Upload
              v-model:file-list="fileList"
              name="avatar"
              fileList="[]"
              accept="image/*"
              list-type="picture-card"
              class="avatar-uploader"
              :beforeUpload="handleBeforeUpload"
              :show-upload-list="false"
            >
              <img v-if="previewSource" :src="previewSource" alt="avatar" />
              <div v-else>
                <Icon v-if="loading" icon="ant-design:loading-outlined" />
                <Icon v-else icon="ant-design:plus-outlined" />
                <div class="ant-upload-text">头像上传</div>
              </div>
            </Upload>
          </div>
          <BasicForm @register="registerForm" />
        </TabPane>
        <TabPane key="2" tab="组织信息">
          <Form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
            <template v-for="item in orgList" :key="item.OrgDimensionId">
              <FormItem :label="item.OrgDimensionName">
                <Input
                  v-if="item.levelArray"
                  style="width: 180px"
                  disabled
                  v-model:value="item.levelArray.OrgName"
                />
                <Input v-else style="width: 180px" disabled />
                <Button type="primary" shape="circle" @click="checkOrg(item)">
                  <Icon icon="ant-design:plus-outlined" />
                </Button>
              </FormItem>
            </template>
          </Form>
        </TabPane>
        <TabPane key="3" tab="权限角色">
          <RadioGroup v-model:value="rolesValue" :options="rolesOptions" />
        </TabPane>
      </Tabs>
      <OrgListModal @register="register" @orgSubSelect="orgSubSelect" />
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, UnwrapRef, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataFormSchema } from '../data/list';
  import { getOrganizationList, getUserRoles, uploadFile } from '/@/api/system/system';
  import { Tabs, Upload, Form, Input, Button, RadioGroup } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import OrgListModal from './OrgListModal.vue';
  import { useModal } from '/@/components/Modal';
  interface FormState {
    name: string;
  }
  export default defineComponent({
    components: {
      BasicModal,
      BasicForm,
      OrgListModal,
      Tabs,
      TabPane: Tabs.TabPane,
      Upload,
      Icon,
      Form,
      FormItem: Form.Item,
      Input,
      Button,
      RadioGroup,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const formState: UnwrapRef<FormState> = reactive({
        name: '',
      });
      const isUpdate = ref(true);
      const rowId = ref('');
      const SuperiorEnter = ref('');
      const enterTypeInfo = ref(Array);
      const previewSource = ref('');
      const orgList = ref([]);
      const rolesValue = ref<string>('');
      const rolesOptions = ref<array>([]);
      const enterId = ref('');
      const [register, { openModal }] = useModal();
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
        enterId.value = data.enterid;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        const { list } = await getOrganizationList({ pageindex: 1, pagesize: 50 });
        orgList.value = list;
        const rolesList = await getUserRoles();
        rolesList.list.forEach((item) => {
          item.label = item.RoleName;
          item.value = item.RoleId;
        });
        rolesOptions.value = rolesList.list;
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
          // values.EnterTypeId = enterTypeInfo.value.EnterTypeId;
          // values.EnterTypeName = enterTypeInfo.value.EnterTypeName;
          // values.EnterTypeCode = enterTypeInfo.value.EnterTypeCode;
          // if (SuperiorEnter.value != '') {
          //   values.SuperiorEnterName = SuperiorEnter.value;
          // } else {
          //   values.SuperiorEnterName = '';
          //   values.SuperiorEnterId = '';
          // }
          // setModalProps({ confirmLoading: true });
          // closeModal();
          // if (!unref(isUpdate)) {
          //   //新增
          //   emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
          // } else {
          //   //编辑
          //   emit('success', {
          //     isUpdate: unref(isUpdate),
          //     values: { ...values, EnterId: rowId.value },
          //   });
          // }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      // Block upload
      function handleBeforeUpload(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        previewSource.value = '';
        console.log('file====', file);
        reader.onload = function (e) {
          previewSource.value = (e.target?.result as string) ?? '';
        };
        return false;
      }
      function checkOrg(record) {
        openModal(true, {
          enterId: enterId.value,
          record,
        });
      }
      //组织机构选择
      function orgSubSelect(record) {
        orgList.value.find((item) => {
          if (item.OrgDimensionId == record.OrgDimensionId) {
            item.levelArray = record;
          }
        });
      }
      return {
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        activeKey: ref('1'),
        labelCol: { span: 4 },
        wrapperCol: { span: 6 },
        handleBeforeUpload,
        previewSource,
        formState,
        orgList,
        rolesValue,
        rolesOptions,
        register,
        openModal,
        checkOrg,
        orgSubSelect,
      };
    },
  });
</script>
<style lang="less">
  .avatar-box {
    display: flex;
    align-items: center;
    margin-left: 120px;
  }
</style>
