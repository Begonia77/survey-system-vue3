<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FormInst, FormItemRule, useMessage } from 'naive-ui'

const route = useRoute();
let paperId = route.query.id;

// 根据问卷id获取问卷信息
// const getPaperInfo = async () => {
//   const res = await getPaperInfoById(paperId);
//   if (res.code === 200) {
//     paperInfo = res.data;
//   }
// }

const qsInfo = reactive<any>({
  list: [] as any[],
})

qsInfo.list = {
  model: [{
    survey_id: 1,
    survey_title: '大学生熬夜情况调查',
    remark: '大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查',
    num: 100,
    created_user_id: '李四',
    ansNum: 100,
    created_time: '2023-05-01 12:00:00',
    state: 2,
    // 以下是题目列表
    questions: [{
      question_id: 1,
      question_order: 1,
      question: '你的性别是？',
      type: 1,
      value: null,
      options: [{
        option_id: 1,
        content: '男',
      },
      {
        option_id: 2,
        content: '女',
      },],
    },
    {
      question_id: 2,
      question_order: 6,
      question: '你的年级是？',
      type: 3,
      content: null,
    },
    {
      question_id: 3,
      question_order: 3,
      question: '您晚上休息的时间是在：',
      type: 1,
      value: null,
      options: [{
        option_id: 1,
        content: '10：00之前',
      },
      {
        option_id: 2,
        content: '10：00---11：00',
      },
      {
        option_id: 3,
        content: '11：00---12：00',
      },
      {
        option_id: 4,
        content: '12：00之后',
      },],
    },
    {
      question_id: 4,
      question_order: 2,
      question: '熬夜的原因？',
      type: 2,
      value: null,
      options: [{
        option_id: 1,
        content: '学习',
      },
      {
        option_id: 2,
        content: '工作',
      },
      {
        option_id: 3,
        content: '娱乐',
      },
      {
        option_id: 4,
        content: '其他',
      },],
    },]
  },],
}
const router = useRouter()
// 返回上一级的方法
const goBack = () => {
  router.go(-1);
}
</script>

<template>
  <n-layout-header>
    <n-grid :cols="24">
      <n-grid-item :span="5">
        <a class="goback" @click="goBack()">返回</a>
      </n-grid-item>
      <n-grid-item :span="12">
        <span class="title">编辑问卷</span>
      </n-grid-item>
    </n-grid>
  </n-layout-header>
  <n-grid :cols="24" class="contain">
    <n-grid-item :span="5">
      <div class="left">
        <n-collapse :default-expanded-names="['1', '2']">
          <n-collapse-item title="题目类型" name="1">
            <div>单选题</div>
            <div>多选题</div>
            <div>填空题</div>
          </n-collapse-item>
          <n-collapse-item title="问卷大纲" name="2">
            <div>1、你的性别？</div>
            <div>2、你的年级？</div>
            <div>3、您晚上休息的时间是在：</div>
            <div>4、熬夜的原因？</div>
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-grid-item>
    <n-grid-item :span="12">
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item :span="7">
      <div class="green" />
    </n-grid-item>
  </n-grid>
</template>

<style lang="scss" scoped>
.n-layout-header {
  background: #1e649f;
  height: 60px;
  line-height: 60px;
  color: #fff;

  .goback {
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // 悬浮变成手指
    cursor: pointer;

  }

  .title {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.contain {
  background: #E9EEF3;
  padding: 10px 0;
  height: calc(100vh - 80px);

  .left {
    height: 98%;
    background-color: #fff;
    width: 65%;
    float: right;
    margin-right: 15px;
    border-radius: 5px;
    padding-top: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .title {
      font-size: 16px;
      font-weight: 600;
      padding-left: 10px;
    }
  }
}

.light-green {
  height: 100%;
  background-color: rgba(0, 128, 0, 0.12);
}

.green {
  height: 100%;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>