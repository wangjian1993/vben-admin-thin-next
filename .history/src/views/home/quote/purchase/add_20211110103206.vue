<!--
 * @Author: max
 * @Date: 2021-11-09 17:21:12
 * @LastEditTime: 2021-11-10 10:32:06
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/views/home/quote/purchase/add.vue
-->
<!--  -->
<template>
  <div>新建报价</div>
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
