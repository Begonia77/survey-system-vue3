<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TableOnly from '../components/analyse/tableOnly.vue'
import TableChart from '../components/analyse/tableChart.vue'
import { constVal } from '../util/constVal'
import { paperInfo } from '../api/paper-info'

const route = useRoute()
const paperId = route.query.id
// 帮我分析下面的问卷，一百字左右的简要分析。
// 标题: '大学生熬夜情况调查',
//     [{单选题: : '您通常每周熬夜几次？',提交人数: 25,
//         答案: [{ 选项: '1-2',选择人数: 7,},
//           {选项: '3-5',选择人数: 16, },
//           { 选项: '6-7',选择人数: 2,},],},
//       {多选题: '您熬夜后的身体状况如何？',submit_person: 25,
//       答案: [{选项: '疲劳',选择人数: 16,},
//           { 选项: '头痛',选择人数: 10,},
//           {选项: '精神状态不佳',选择人数: 22,},], },
//       {填空题: '还会继续熬夜吗？',
//         答案: [{option: '会',},{option: '不会',},{option: '不会',},{option: '不会',},{option: '不会',},{option: '会',},{option: '可能会',},{option: '会',},{option: '应该不会',},{option: '可能会',},{option: '应该会',},{option: '可能不会',},{option: '不会',},{option: '可能不会',},{option: '会',},{option: '可能不会',},{option: '不会',},{option: '可能不会',},{option: '会',},{option: '可能会',},{option: '可能不会',},{option: '会',},{option: '会',},{option: '不知道',},{option: '可能会',}],},]

const router = useRouter()
const paper = reactive({
  surveyId: 7,
  createdUserId: 1,
  surveyTitle: '恋爱调查问卷',
  remark: '这是一份测试问卷',
  createdTime: '2023-04-13 03:45:18',
  state: 1,
  analysis: null,
  count_question: 3,
  count_fill_in: 1,
  questionList: [
    {
      surveyId: 7,
      questionId: 37,
      question: '您目前单身吗？',
      questionOrder: 1,
      type: 1,
      remark: null,
      content: null,
      optionList: [
        {
          questionId: 37,
          optionId: 58,
          content: '是',
          count: 6,
        },
        {
          questionId: 37,
          optionId: 59,
          content: '否',
          count: 2,
        },
      ],
    },
    {
      surveyId: 7,
      questionId: 23,
      question: '您认为大学生恋爱的最大困难是什么？',
      questionOrder: 2,
      type: 1,
      remark: null,
      content: null,
      optionList: [
        {
          questionId: 23,
          optionId: 60,
          content: '时间和学业压力',
          count: 2,
        },
        {
          questionId: 23,
          optionId: 61,
          content: '经济压力',
          count: 0,
        },
        {
          questionId: 23,
          optionId: 62,
          content: '家庭的反对或不支持',
          count: 4,
        },
        {
          questionId: 23,
          optionId: 63,
          content: '空间和住宿问题',
          count: 1,
        },
        {
          questionId: 23,
          optionId: 64,
          content: '社交压力和舆论压力',
          count: 1,
        },
      ],
    },
    {
      surveyId: 7,
      questionId: 38,
      question: '您觉得恋爱最重要的是什么？',
      questionOrder: 3,
      type: 2,
      remark: null,
      content: null,
      optionList: [
        {
          questionId: 38,
          optionId: 65,
          content: '互相理解',
          count: 2,
        },
        {
          questionId: 38,
          optionId: 66,
          content: '浪漫',
          count: 1,
        },
        {
          questionId: 38,
          optionId: 67,
          content: '金钱',
          count: 1,
        },
        {
          questionId: 38,
          optionId: 68,
          content: '外表',
          count: 2,
        },
        {
          questionId: 38,
          optionId: 69,
          content: '其他',
          count: 2,
        },
      ],
    },
  ],
})
const state = reactive({
  chatGpt: '',
  waitting: false,
})
const ansList = ref<Array<{
  key: number
  name: number
  index: number
}>>([])

const getPaperInfo = async () => {
  const res = await paperInfo.getPaperInfoById(paperId)
  if (res.data.data) {
    Object.assign(paper, res.data.data)
    state.chatGpt = paper.analysis
  }
  // console.log(constVal.qsTypeMap.get(state.qsInfo.questionList[0]).comp)
}
const getChatGpt = async () => {
  state.waitting = true
  const res = await paperInfo.getChatGpt(paperId)
  console.log(res)
  if (res.data.data) {
    state.chatGpt = res.data.data.prompt
    state.waitting = false
  }
}
// 返回上一级
const goBack = () => {
  router.go(-1)
}
onMounted(async () => {
  await getPaperInfo()

  for (const idx in paper.questionList) {
    if (paper.questionList[idx].type !== 3 && paper.questionList[idx].type !== 4)
      ansList.value.push({ key: paper.questionList[idx].questionOrder, name: 1, index: +idx })
    else ansList.value.push({ key: paper.questionList[idx].questionOrder, name: 0, index: +idx })
  }
})
</script>

<template>
  <div>
    <n-layout-header>
      <n-grid :cols="24">
        <n-grid-item :span="4" class="goback">
          <a @click="goBack()">返回</a>
        </n-grid-item>
        <n-grid-item :span="16" class="title">
          <span>问卷统计与分析</span>
        </n-grid-item>
      </n-grid>
    </n-layout-header>
    <div class="edit-main">
      <div class="edit-main-title">
        <span>{{ paper.surveyTitle }}(报告)</span>
      </div>
      <div class="gpt">
        <div v-if="state.chatGpt !== '' && !state.waitting">
          <h3>以下是基于您的问卷结果的分析报告：</h3>
          <div>
            {{ state.chatGpt }}
          </div>
        </div>
        <div v-else-if="state.chatGpt === '' && !state.waitting">
          <h2>点击重新分析即可获取分析报告！</h2>
        </div>
        <div v-show="state.waitting" class="wait">
          <n-spin size="large" />&nbsp;&nbsp;
          等待返回问卷分析结果
        </div>
        <div class="wait" style="margin-left: 10px; margin-bottom: 10px;">
          <n-button strong secondary round type="primary" @click="getChatGpt">
            重新分析
          </n-button>
        </div>
      </div>
      <div class="edit-main-content">
        <div v-for="(ans) of ansList" :key="ans.key">
          <component
            :is="constVal.analysisTypeMap.get(ans.name).comp" :count-fill-in="paper.count_fill_in"
            :qs-answer="paper.questionList[ans.index]"
          />
        </div>
      </div>
      <br>
      <n-divider />
      <div style="height: 60px; line-height: 60px; text-align: center">
        <span>我是可是有底线的~</span>
      </div>
    </div>
  </div>
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
    padding-right: 33px;
  }

  .title {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.wait {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 20px;
}

.edit-main {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: calc(100vh - 60px);
  width: 70%;
  margin: 0 auto;
  overflow: auto;
  overflow-x: hidden;

  /*问卷标题区*/
  .edit-main-title {
    text-align: center;
    padding: 15px 0;

    span {
      font-weight: bolder;
      font-size: larger;
    }
  }

}

.gpt {
  padding: 10px 20px;
  font-size: 16px;
  line-height: 30px;
  width: 90%;
  margin: 10px auto;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>
