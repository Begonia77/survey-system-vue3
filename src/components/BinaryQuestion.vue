<script setup lang="ts">
// 接收参数
const props = defineProps(['qsIndex', 'qsType'])
let edit = false // 是否处于编辑模式

// 切换编辑模式
const switchEdit = () => {
  edit = !edit
}
</script>

<template>
  判断题
</template>

<style lang="scss" scoped></style>
