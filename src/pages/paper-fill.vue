<script setup lang="ts">
import { computed, onMounted, reactive, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInst } from 'naive-ui'
import { FormItemRule, useMessage } from 'naive-ui'
import { paperInfo } from '../api/paper-info'
import { getPapersList } from '../api/fill'
import logo from '../assets/logo.png'
import logo2 from '../assets/logo2.png'

const message = useMessage()
const route = useRoute()
const paperId = route.query.id

const state = reactive({
  isReturn: false,
  isFinish: false,
  num: 0,
  qsInfo: {} as any,
  isNewPaper: true,
  surveyForm: {} as any,
  ans: { questionList: [] } as any,
})

const getPaperInfo = async () => {
  const res = await paperInfo.getPaperInfoById(paperId)
  state.qsInfo = res.data.data

  state.qsInfo.questionList?.forEach((item: any) => {
    if (item.questionType === 1)
      state.surveyForm[item.questionId] = null

    else if (item.questionType === 2)
      state.surveyForm[item.questionId] = []

    else if (item.questionType === 3)
      state.surveyForm[item.questionId] = ''

    else
      state.surveyForm[item.questionId] = ''
  })
}

const sortedQuestions = computed(() => {
  return state.qsInfo.questionList?.slice().sort((item) => {
    return item.questionOrder - item.questionOrder
  })
})
const formRef = ref(null)
const fillFinish = async () => {
  state.isReturn = false
  Object.keys(state.surveyForm).forEach((key) => {
    if (state.surveyForm[key] === '') {
      state.isReturn = true
    }
    else {
      state.ans.surveyId = state.qsInfo.surveyId
      state.ans.createdUserId = 1
      if (state.qsInfo?.questionList[state.num]?.type === 2 || state.qsInfo?.questionList[state.num]?.type === 1) {
        const content = Array.isArray(unref(state.surveyForm[key])) ? `${unref(state.surveyForm[key]).join(',')},` : `${state.surveyForm[key]},`
        state.ans.questionList.push({
          questionId: +key,
          type: state.qsInfo?.questionList[state.num]?.type,
          content,
        })
      }
      else {
        state.ans.questionList.push({
          questionId: +key,
          type: state.qsInfo?.questionList[state.num]?.type,
          content: state.surveyForm[key],
        })
      }
      state.num = state.num + 1
    }
  })
  if (state.isReturn === false) {
    await getPapersList(state.ans)
    state.isFinish = true
  }
  else {
    message.error('请填写完整问卷')
  }
}
onMounted(() => {
  getPaperInfo()
})
</script>

<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>
        <n-grid :cols="24">
          <n-grid-item :span="6">
            <div class="logo111">
              <n-image class="logo2" fit="fill" :src="logo2" />
            </div>
          </n-grid-item>
          <n-grid-item :span="1">
            <div class="logo111">
              <n-image class="logo" fit="fill" :src="logo" />
            </div>
          </n-grid-item>
          <n-grid-item :span="10">
            <span class="title">填写问卷</span>
          </n-grid-item>
          <n-grid-item :span="4">
            <n-button v-if="!state.isFinish" type="success" @click="fillFinish">
              提交问卷
            </n-button>
          </n-grid-item>
        </n-grid>
      </n-layout-header>
      <n-layout-content v-if="!state.isFinish">
        <div class="contain">
          <div class="head">
            <div class="title">
              {{ state.qsInfo.surveyTitle }}
            </div>
            <div class="des">
              {{ state.qsInfo.remark }}
            </div>
          </div>
          <div class="body">
            <n-form
              v-for="(question, index) of sortedQuestions" ref="formRef" :key="question.questionId"
              :question="question.questionId" :index="index"
            >
              <n-grid :cols="24" :x-gap="24" :y-gap="24">
                <n-form-item-gi
                  v-if="question.type === 1" class="options" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-radio-group v-model:value="state.surveyForm[question.questionId]" :name="question.questionId">
                    <n-space>
                      <n-radio
                        v-for="option in question.optionList" :key="option.optionId" class="option"
                        :value="option.optionId"
                      >
                        {{ option.content }}
                      </n-radio>
                    </n-space>
                  </n-radio-group>
                </n-form-item-gi>
                <n-form-item-gi
                  v-if="question.type === 2" class="options" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-checkbox-group v-model:value="state.surveyForm[question.questionId]" :name="question.questionId">
                    <n-space>
                      <n-checkbox
                        v-for="option in question.optionList" :key="option.optionId" class="option"
                        :value="option.optionId"
                      >
                        {{ option.content }}
                      </n-checkbox>
                    </n-space>
                  </n-checkbox-group>
                </n-form-item-gi>
                <n-form-item-gi
                  v-if="question.type === 3" class="options" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-input v-model:value="state.surveyForm[question.questionId]" style="width: 450px;" placeholder="" />
                </n-form-item-gi>
                <n-form-item-gi
                  v-if="question.type === 4" class="options" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-input v-model:value="state.surveyForm[question.questionId]" style="width: 450px;" placeholder="" />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </div>
        </div>
      </n-layout-content>
      <div v-else class="tip">
        <h2>问卷已填写完成，可关闭该页面</h2>
      </div>
    </n-layout>
  </n-space>
</template>

<style lang="scss" scoped>
.logo111 {
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 90px;
}

.logo {
  // margin-left: 25px;
  height: 60px;
  width: 60px;
  // margin: 15px 30px;
}

.logo2 {
  // margin-left: 25px;
  height: 40px;
  width: 40px;
  margin: 8px 5px;
}

.tip {
  //垂直水平居中
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.n-layout-header {
  background: #1e649f;
  height: 60px;
  line-height: 60px;
  color: #fff;

  .title {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.n-layout-content {
  background: #E9EEF3;

  .contain {
    background: #fff;
    width: 740px;
    height: calc(100vh - 125px);
    margin: 20px auto 5px auto;
    border-radius: 10px;
    padding: 20px 30px;
    overflow: auto;

    .head {
      border-bottom: solid 1px #ccc;

      .title {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }

      .des {
        font-size: 14px;
        padding: 15px 0;
      }
    }

    .body {
      padding: 20px 10px;

      .options {
        margin: 5px 0;

        .option {
          // display: block;
          margin: 5px 0 0px 10px;
          width: 660px;
        }
      }
    }
  }
}
</style>
