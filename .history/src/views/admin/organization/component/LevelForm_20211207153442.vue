<!--
 * @Author: max
 * @Date: 2021-12-07 15:05:17
 * @LastEditTime: 2021-12-07 15:34:42
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/organization/component/LevelForm.vue
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
  import { dataFormSchema } from '../data/level';
  import { getInstitutionList } from '/@/api/system/system';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
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
          rowId.value = data.record.OrgDimensionId;
          updateSchema([
            {
              field: 'OrgDimensionCode',
              componentProps: { disabled: true },
            },
          ]);
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增组织维度' : '编辑组织维度'));
      async function handleSubmit() {
        try {
          const values = await validate();
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
