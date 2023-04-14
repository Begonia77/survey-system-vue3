<script setup lang="ts">
import { computed, onMounted, reactive, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInst } from 'naive-ui'
import { FormItemRule, useMessage } from 'naive-ui'
import { paperInfo } from '../api/paper-info'
import { getPapersList } from '../api/fill'

const route = useRoute()
const paperId = route.query.id

const state = reactive({
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
  console.log(state.qsInfo)
}

const qsInfo = reactive<any>({
  list: [] as any[],
})

// qsInfo.list = {
//   model: [{
//     surveyId: 1,
//     survey_title: '大学生熬夜情况调查',
//     remark: '大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查',
//     num: 100,
//     created_user_id: '李四',
//     ansNum: 100,
//     created_time: '2023-05-01 12:00:00',
//     state: 2,
//     // 以下是题目列表
//     questions: [{
//       questionId: 1,
//       question_order: 1,
//       question: '你的性别是？',
//       type: 1,
//       value: null,
//       options: [{
//         optionId: 1,
//         content: '男',
//       },
//       {
//         optionId: 2,
//         content: '女',
//       }],
//     },
//     {
//       questionId: 2,
//       question_order: 6,
//       question: '你的年级是？',
//       type: 3,
//       content: null,
//     },
//     {
//       questionId: 3,
//       question_order: 3,
//       question: '您晚上休息的时间是在：',
//       type: 1,
//       value: null,
//       options: [{
//         optionId: 1,
//         content: '10：00之前',
//       },
//       {
//         optionId: 2,
//         content: '10：00---11：00',
//       },
//       {
//         optionId: 3,
//         content: '11：00---12：00',
//       },
//       {
//         optionId: 4,
//         content: '12：00之后',
//       }],
//     },
//     {
//       questionId: 4,
//       question_order: 2,
//       question: '熬夜的原因？',
//       type: 2,
//       value: null,
//       options: [{
//         optionId: 1,
//         content: '学习',
//       },
//       {
//         optionId: 2,
//         content: '工作',
//       },
//       {
//         optionId: 3,
//         content: '娱乐',
//       },
//       {
//         optionId: 4,
//         content: '其他',
//       }],
//     }],
//   }],
// }

// 写一个计算属性，将qsInfo.list.model里面的四个questions对象根据question_order进行排序，并返回
// const sortedQuestions = computed(() => {
//   return qsInfo.list.model.map((item: any) => {
//     item.questions.sort((a: any, b: any) => {
//       return a.question_order - b.question_order
//     })
//     return item
//   })
// })

const sortedQuestions = computed(() => {
  return state.qsInfo.questionList?.slice().sort((item) => {
    return item.questionOrder - item.questionOrder
  })
})
const formRef = ref(null)
const fillFinish = async () => {
  console.log(state.surveyForm)
  Object.keys(state.surveyForm).forEach((key) => {
    if (state.surveyForm[key] === null) {
      // message.error('请填写完整问卷')
      console.log('请填写完整问卷')
    }
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
  })
  await getPapersList(state.ans)
  state.isFinish = true
  console.log(state)
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
          <n-grid-item :span="7" />
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
              v-for="(question, index) of sortedQuestions" ref="formRef"
              :key="question.questionId" :question="question.questionId"
              :index="index"
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
