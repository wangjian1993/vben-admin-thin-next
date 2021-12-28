<!--
 * @Author: max
 * @Date: 2021-12-07 11:17:56
 * @LastEditTime: 2021-12-07 11:17:57
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/organization/component/OrgForm.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    centered
    maskClosable
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataFormSchema } from '../data/list';
  import { getInstitutionList } from '/@/api/system/system';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const SuperiorEnter = ref('');
      const enterTypeInfo = reactive({
        EnterTypeId: '',
        EnterTypeName: '',
        EnterTypeCode: '',
      });
      const [registerForm, { setFieldsValue, resetFields, validate, updateSchema }] = useForm({
        labelWidth: 120,
        schemas: dataFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
        baseColProps: { lg: 24, md: 24 },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          rowId.value = data.record.EnterId;
          SuperiorEnter.value = data.record.EnterName;
          enterTypeInfo.EnterTypeId = data.record.EnterTypeId;
          enterTypeInfo.EnterTypeName = data.record.EnterTypeName;
          enterTypeInfo.EnterTypeCode = data.record.EnterTypeCode;
          setFieldsValue({
            ...data.record,
          });
        }
        const { list } = await getInstitutionList({ pageindex: 1, pagesize: 100 });
        list.forEach((item) => {
          item.label = item.EnterTypeName;
          item.value = item.EnterTypeId;
        });
        updateSchema([
          {
            field: 'EnterTypeId',
            componentProps: {
              options: list,
            },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增机构类型' : '编辑机构类型'));
      async function handleSubmit() {
        try {
          const values = await validate();
          values.EnterTypeId = enterTypeInfo.EnterTypeId;
          values.EnterTypeName = enterTypeInfo.EnterTypeName;
          values.EnterTypeCode = enterTypeInfo.EnterTypeCode;
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

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
