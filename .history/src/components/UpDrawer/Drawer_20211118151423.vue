<!--
 * @Author: max
 * @Date: 2021-11-18 14:36:18
 * @LastEditTime: 2021-11-18 15:13:41
 * @LastEditors: max
 * @Description: 
 * @FilePath: /vben-admin-thin-next-main/src/components/UpDrawer/Drawer.vue
-->
<template>
  <BasicDrawer v-bind="$attrs" title="Drawer Title" width="25%">
    <Description :column="1" :data="mockData" :schema="schema" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  const mockData: Recordable = {
    username: 'test',
    nickName: 'VB',
    age: '123',
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema: DescItem[] = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];
  export default defineComponent({
    components: { BasicDrawer, Description },
    props: {
      drawerData: Array,
      drawerLable: Array,
    },
    setup() {
      console.log(props.drawerLable.value);
      const [register] = useDescription({
        title: 'useDescription',
      });
      return { mockData, schema, register };
    },
  });
</script>
