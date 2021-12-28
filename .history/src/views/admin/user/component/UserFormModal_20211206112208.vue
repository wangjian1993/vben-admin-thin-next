<!--
 * @Author: max
 * @Date: 2021-11-19 15:09:40
 * @LastEditTime: 2021-12-06 11:22:08
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
              name="avatar"
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
          <RadioGroup v-model:value="rolesValue" :options="rolesOptions" @change="rolesChange" />
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
  import { useMessage } from '/@/hooks/web/useMessage';
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
      const previewSource = ref('');
      const imgResult = ref<any>([]);
      const orgList = ref<any>([]);
      const rolesValue = ref<string>('');
      const rolesOptions = ref([]);
      const enterId = ref('');
      const loading = ref(false);
      const [register, { openModal }] = useModal();
      const { createMessage } = useMessage();
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
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          closeModal();
          if (!unref(isUpdate)) {
            //新增
            if (!!rolesValue.value) {
              createMessage.warning('请选择用户权限角色');
              return;
            }
            console.log('rolesValue', rolesValue.value);
            console.log('values', values);
            // emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
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
      // Block upload
      function handleBeforeUpload(file: File) {
        loading.value = true;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        previewSource.value = '';
        let typeArray = file.type.split('/');
        let fileType = typeArray[1].toUpperCase();
        reader.onload = function (e) {
          previewSource.value = (e.target?.result as string) ?? '';
          let parmas = {
            FileName: file.name,
            FileContent: e.target?.result,
            FileSuffix: '.' + fileType,
          };
          const imgData = uploadFile(parmas);
          imgResult.value = imgData;
          loading.value = false;
        };
        return false;
      }
      function checkOrg(record) {
        openModal(true, {
          enterId: enterId.value,
          record,
        });
      }
      function rolesChange(e) {
        console.log(e.target.value);
        rolesOptions.value.find((item: any) => {
          if (e.target.value === item.RoleId) {
            console.log(item);
          }
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
        loading,
        rolesChange,
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
