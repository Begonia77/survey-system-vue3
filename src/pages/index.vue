<script setup>
import QsnHeader from "../pages/layout/qsn-header.vue";
import QsnFooter from "../pages/layout/qsn-footer.vue";
</script>

<template>
  <div class="index">
    
    <n-space vertical size="large">
    <n-layout>
      <n-layout-header><QsnHeader/></n-layout-header>
      <n-layout has-sider>
        <n-layout-content content-style="padding: 24px;">
          <router-view />
        </n-layout-content>
      </n-layout>
      <n-layout-footer><QsnFooter/></n-layout-footer>
    </n-layout>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.n-layout-header {
  background: #1e649f;
  height: 60px;
  line-height: 60px;
}
.n-layout-footer {
  background: #545c64;
  padding: 10px;
}

.n-layout-sider {
  background: #E9EEF3;
}

.n-layout-content {
  background: #E9EEF3;
  // padding: 20px 70px;
}

.index {
  /* 因为是遮罩效果所以要fixed */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: #E9EEF3;
  /*必须 */
  display: flex;
  /* 必须，规定元素的排列方向 */
  flex-direction: column;
  /* 必须占满屏 */
  height: 100%;
  /* 没有这个就不能滚动了 */
  overflow: auto;
}

</style>
