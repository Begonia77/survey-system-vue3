<script lang="ts" setup>
import { h, ref, reactive } from 'vue';

const menuOptions = [
  {
    label: () => h(
      'span',
      {
      },
      { default: () => "全部问卷" }
    ),
    key: "all-paper",
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => "已发布" }
    ),
    key: "published",
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => "未发布" }
    ),
    key: "unpublished",
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => "已结束" }
    ),
    key: "has-ended",
  },
]

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
    ansNum: 100,
    creatTime: '2023-05-01 12:00:00',
    state: '2',
  },
  {
    id: 2,
    title: '学生疫情防控每日报表',
    description: '学生疫情防控每日报表',
    num: 48,
    user: '张三',
    ansNum: 100,
    creatTime: '2021-05-04 12:00:00',
    state: '0',
  },
  {
    id: 3,
    title: '大学生恋爱情况调查',
    description: '大学生恋爱情况调查大学生恋爱情况调查',
    num: 59,
    user: '六六',
    ansNum: 100,
    creatTime: '2022-05-01 12:00:00',
    state: '1',
  },
  {
    id: 4,
    title: '大学生恋爱情况调查',
    description: '大学生恋爱情况调查大学生恋爱情况调查',
    num: 30,
    user: '王五',
    ansNum: 100,
    creatTime: '2021-03-01 12:00:00',
    state: '2',
  },],
}
const activeKey = ref("all-paper")



</script>

<template>
  <div class="content">

    <n-grid x-gap="50" :cols="24">
      <n-grid-item :span="5">
        <n-button type="info" style="width: 100%;height: 50px;font-size: 16px;margin-bottom: 20px;">
          + 创建问卷
        </n-button>
        <n-menu class="cen1" v-model:value="activeKey" :options="menuOptions" />
      </n-grid-item>
      <n-grid-item :span="18" class="qs">
        <div class="title">
          <h2>问卷列表</h2>
          <n-space vertical>
            <n-input-group>
              <n-input clearable />
              <n-button type="primary" ghost>
                搜索
              </n-button>
            </n-input-group>
          </n-space>
        </div>

        <div class="card" v-for="item in qsInfo.list.model" :key="item.id">
          {{ item.title }}
          {{ item.ansNum }}
          {{ item.creatTime }}
          {{ item.state }}
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
.content {
  flex-direction: column;
  height: 100%;
  width: 96%;
  margin: auto;

  .cen1 {
    background-color: #f8f8f8;
    // max-width: 1200px;
    width: 100%;
  }
}

.qs {
  height: 100%;
  width: 100%;

  .title {
    // 浮动布局，使之左右分布
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card {
    background-color: #f8f8f8;
    height: 120px;
    width: 100%;
    margin: 20px 0;
  }
}
</style>
