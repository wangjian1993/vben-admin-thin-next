<!--
 * @Author: max
 * @Date: 2021-11-16 09:06:48
 * @LastEditTime: 2021-11-16 09:15:39
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/component/TypeFormModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="900px"
  >
    <!-- <BasicForm @register="registerForm" /> -->
  </BasicModal>
</template>
<script lang="ts">
  import { listDictModel } from '/@/api/common';
  import { addObj, editObj } from '/@/api/modules/system/sysDept';

  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // import { BasicForm, useForm } from '/@/components/Form';
  import { dataFormSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'FormModal',
    components: { BasicModal},
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();

      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
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
          rowId.value = data.record.id;
        }
        setFieldsValue({
          ...data.record,
        });

        const orgTypeOptions = await listDictModel({ dictCode: 'sys_org_type' });
        const statusOptions = await listDictModel({ dictCode: 'sys_status' });
        updateSchema([
          {
            field: 'orgType',
            componentProps: {
              options: orgTypeOptions,
            },
          },
          {
            field: 'status',
            componentProps: {
              options: statusOptions,
            },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          !unref(isUpdate)
            ? await addObj({ ...values })
            : await editObj({ ...values, id: rowId.value });
          !unref(isUpdate)
            ? createMessage.success('新增成功！')
            : createMessage.success('编辑成功！');
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
