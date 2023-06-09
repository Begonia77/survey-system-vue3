<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TableOnly from '../components/analyse/tableOnly.vue'
import TableChart from '../components/analyse/tableChart.vue'
import { constVal } from '../util/constVal'
import { paperInfo } from '../api/paper-info'

const route = useRoute()
const paperId = route.query.id

const router = useRouter()
const paper = reactive({

  surveyId: 8,
  createdUserId: 1,
  surveyTitle: '测试填空题',
  remark: '',
  createdTime: '2023-04-24 02:24:40',
  state: 1,
  analysis: null,
  count_question: 2,
  count_fill_in: 1,
  questionList: [],
})
const state = reactive({
  chatGpt: '',
  waitting: false,
  notGpt: true,
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
}
const getChatGpt = async () => {
  state.waitting = true
  const res = await paperInfo.getChatGpt(paperId)
  if (res.data.data) {
    state.chatGpt = res.data.data.prompt
    state.waitting = false
  }
}
// 返回上一级
const goBack = () => {
  router.push({
    name: 'paper',
  })
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
        <h1>{{ paper.surveyTitle }}(报告)</h1>
      </div>
      <div class="gpt">
        <div v-if="state.chatGpt && !state.waitting">
          <h3>以下是基于您的问卷结果的分析报告：</h3>
          <div>
            {{ state.chatGpt }}
          </div>
        </div>
        <div v-else-if="!state.chatGpt && !state.waitting">
          <h3>点击重新分析即可获取分析报告！</h3>
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
        <div v-for="(ans, index) in ansList" :key="ans.key">
          <component
            :is="constVal.analysisTypeMap.get(ans.name).comp" :count-fill-in="paper.count_fill_in"
            :qs-answer="paper.questionList[ans.index]" :qs-index="index"
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
