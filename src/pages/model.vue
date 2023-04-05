<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const qsInfo = reactive({
  list: [],
})
qsInfo.list = {
  model: [{
    survey_id: 1,
    survey_title: '大学生熬夜情况调查大学生熬夜情况调查',
    remark: '大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查',
    num: 100,
    created_user_id: '李四',
    ansNum: 100,
    created_time: '2023-05-01 12:00:00',
    state: 2,
  },
  {
    survey_id: 2,
    survey_title: '学生疫情防控每日报表',
    remark: '学生疫情防控每日报表',
    num: 48,
    created_user_id: '张三',
    ansNum: 100,
    created_time: '2021-05-04 12:00:00',
    state: 0,
  },
  {
    survey_id: 3,
    survey_title: '大学生恋爱情况调查',
    remark: '大学生恋爱情况调查大学生恋爱情况调查',
    num: 59,
    created_user_id: '六六',
    ansNum: 1009,
    created_time: '2022-05-01 12:00:00',
    state: 1,
  },
  {
    survey_id: 4,
    survey_title: '大学生恋爱情况调查',
    remark: '大学生恋爱情况调查大学生恋爱情况调查',
    num: 30,
    created_user_id: '王五',
    ansNum: 10,
    created_time: '2021-03-01 12:00:00',
    state: 2,
  }],
}

const router = useRouter()

const prePaper = (id) => {
  router.push({
    name: 'paperView',
    query: {
      id,
    },
  })
}
</script>

<template>
  <div style="padding: 20px 75px;">
    <n-space vertical>
      <n-input-group style="padding-bottom: 30px;">
        <span style="margin-right: 10px;">标题</span>
        <n-input :style="{ width: '30%' }" clearable placeholder="请输入标题" />
        <n-button type="primary" ghost>
          搜索
        </n-button>
      </n-input-group>
    </n-space>

    <n-grid x-gap="50" y-gap="40" :cols="9">
      <n-grid-item v-for="item in qsInfo.list.model" :key="item.survey_id" :span="3" class="card">
        <div class="title">
          <a class="tt" @click="prePaper(item.survey_id)">{{ item.survey_title }}</a>
          <n-button style="float: right; --n-height:28px;" strong secondary round type="info">
            创建
          </n-button>
        </div>
        <!-- <n-ellipsis :line-clamp="4" class="des">
            {{ item.remark }}
          </n-ellipsis> -->
        <div class="des">
          {{ item.remark }}
        </div>
        <div class="foot">
          <span>共{{ item.num }}题</span>
          <span>来自用户：{{ item.created_user_id }}</span>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
a {
  cursor: pointer;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  height: 200px;
  padding: 10px;
  // 最下面的元素要位于底部
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;

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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
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
