<!--
 * @Author: max
 * @Date: 2021-11-11 13:43:39
 * @LastEditTime: 2021-11-11 13:43:40
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/admin/institutions/type.vue
-->
<!--  -->
<template>
  <div>机构烈性</div>
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
