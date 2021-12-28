<!--
 * @Author: max
 * @Date: 2021-11-11 13:55:15
 * @LastEditTime: 2021-12-07 16:57:06
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/organization/subclass.vue
-->
<!--  -->
<template>
  <div><p>就假按揭啊</p></div>
</template>

<script lang="ts">
  import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
  export default {
    name: '',
    setup() {
      console.log('1-开始创建组件-setup');
      const data: DataProps = reactive({});
      onBeforeMount(() => {
        console.log('2.组件挂载页面之前执行----onBeforeMount');
      });
      onMounted(() => {
        console.log('3.-组件挂载到页面之后执行-------onMounted');
      });
      const refData = toRefs(data);
      return {
        ...refData,
      };
    },
  };
</script>
<style scoped lang="less"></style>
