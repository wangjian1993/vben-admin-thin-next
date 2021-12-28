<!--
 * @Author: max
 * @Date: 2021-12-07 16:13:26
 * @LastEditTime: 2021-12-07 16:31:51
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/database/component/GroupForm.vue
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
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataFormSchema } from '../data/group';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const [registerForm, { setFieldsValue, resetFields, validate, updateSchema }] = useForm({
        labelWidth: 100,
        schemas: dataFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.ParamGroupId;
          setFieldsValue({
            ...data.record,
          });
          updateSchema([
            {
              field: 'ParamGroupCode',
              componentProps: { disabled: true },
            },
          ]);
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增应用类型' : '编辑应用类型'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          closeModal();
          if (!unref(isUpdate)) {
            emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
          } else {
            emit('success', {
              isUpdate: unref(isUpdate),
              values: { ...values, AppTypeId: rowId.value },
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
