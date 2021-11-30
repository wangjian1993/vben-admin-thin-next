<template>
  <BasicDrawer v-bind="$attrs" title="Drawer Title" width="20%"> Drawer Info. </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  export default defineComponent({
    components: { BasicDrawer },
    setup() {
      return {};
    },
  });
</script>
