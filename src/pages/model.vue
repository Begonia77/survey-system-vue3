<script setup lang="ts">
import { reactive } from "vue";
const qsInfo = reactive<any>({
  list: [] as any[],
})
qsInfo.list = {
  model: [{
    id: 1,
    title: '大学生熬夜情况调查大学生熬夜情况调查',
    description: '大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查',
    num: 100,
    user: '李四',
  },
  {
    id: 2,
    title: '学生疫情防控每日报表',
    description: '学生疫情防控每日报表',
    num: 48,
    user: '张三',
  },
  {
    id: 3,
    title: '大学生恋爱情况调查',
    description: '大学生恋爱情况调查大学生恋爱情况调查',
    num: 59,
    user: '六六',
  },
  {
    id: 4,
    title: '大学生恋爱情况调查',
    description: '大学生恋爱情况调查大学生恋爱情况调查',
    num: 30,
    user: '王五',
  },],
}
</script>

<template>
  <div style="padding: 20px 75px;">
  <n-space vertical>
    <n-input-group style="padding-bottom: 30px;">
      <span style="margin-right: 10px;">标题</span>
      <n-input :style="{ width: '30%' }" clearable />
      <n-button type="primary" ghost>
        搜索
      </n-button>
    </n-input-group>
  </n-space>

  <n-grid x-gap="50" y-gap="40" :cols="9">
    <n-grid-item :span="3" class="card" v-for="item in qsInfo.list.model" :key="item.id">
      <div class="title">
        <span class="tt">{{ item.title }}</span>
        <n-button style="float: right; --n-height:28px;" strong secondary round type="info">
          创建
        </n-button>
      </div>
      <n-ellipsis :line-clamp="4" class="des">
        {{ item.description }}
      </n-ellipsis>
      <!-- <div class="des">{{ item.description }}</div> -->
      <div class="foot">
        <span>共{{ item.num }}题</span>
        <span>来自用户：{{ item.user }}</span>
      </div>
    </n-grid-item>
  </n-grid>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  height: 200px;
  padding: 10px;
  .title {
    font-size: 17px;
    font-weight: 600;
    color: #333;
    padding: 10px 0;
    border-bottom: solid 1px #ddd;
    margin-bottom: 10px;
    .tt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      width: 78%;
    }
  }
  .des {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    width: 96%;
    height: 46%;
    padding: 0 2%;

  }
  .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #666;
    border-top: solid 1px #ddd;
    padding: 11px;
  }
}
</style>
