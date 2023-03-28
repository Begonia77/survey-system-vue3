<script setup>
</script>

<template>
  <div id="app">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </div>
</template>

<style lang="scss">
.el-message {
  margin-top: 60px !important;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
}
</style>
