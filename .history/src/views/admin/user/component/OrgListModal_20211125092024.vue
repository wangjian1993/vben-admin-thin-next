<!--
 * @Author: max
 * @Date: 2021-11-25 09:18:09
 * @LastEditTime: 2021-11-25 09:20:24
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/user/component/OrgListModal.vue
-->
<template>
  <div class="px-10">
    <Modal @register="register" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useModal } from '/@/components/Modal';
  import Modal from './Modal.vue';
  export default defineComponent({
    components: { Modal },
    setup() {
      const [register, { openModal }] = useModal();
      return {
        register,
        openModal,
      };
    },
  });
</script>
