<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInst } from 'naive-ui'
import { FormItemRule, useMessage } from 'naive-ui'
import { paperInfo } from '../api/paper-info'

const router = useRouter()
const route = useRoute()
const paperId = route.query.id

// 根据问卷id获取问卷信息
// const getPaperInfo = async () => {
//   const res = await getPaperInfoById(paperId);
//   if (res.code === 200) {
//     paperInfo = res.data;
//   }
// }

const state = reactive({
  paperInfo: {} as any,
})
// state.paperInfo = {
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
//       questionList: [{
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
//       questionList: [{
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
//       questionList: [{
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

// 写一个计算属性，将state.paperInfo里面的四个questions对象根据question_order进行排序，并返回

const getPaperInfo = async () => {
  const res = await paperInfo.getPaperInfoById(paperId)
  state.paperInfo = res.data.data
}
const sortedQuestions = computed(() => {
  return state.paperInfo.questionList?.slice().sort((item) => {
    return item.questionOrder - item.questionOrder
  })
})
// const sortedQuestions = computed(() => {
//   return state.paperInfo.map((item: any) => {
//     item.questions.sort((a: any, b: any) => {
//       return a.question_order - b.question_order
//     })
//     return item
//   })
// })
const formRef = ref<FormInst | null>(null)
// 返回上一级的方法
const goBack = () => {
  router.go(-1)
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
          <n-grid-item :span="5">
            <a class="goback" @click="goBack()">返回</a>
          </n-grid-item>
          <n-grid-item :span="14">
            <span class="title">预览问卷</span>
          </n-grid-item>
        </n-grid>
      </n-layout-header>
      <n-layout-content>
        <div class="contain">
          <div class="head">
            <div class="title">
              {{ state.paperInfo.surveyTitle }}
            </div>
            <div class="des">
              {{ state.paperInfo.remark }}
            </div>
          </div>
          <div class="body">
            <n-form
              v-for="(question, index) of sortedQuestions" ref="formRef"
              :key="question.questionId" :question="question.questionId" :index="index"
            >
              <n-grid :cols="24" :x-gap="24" :y-gap="24">
                <n-form-item-gi
                  v-if="question.type === 1" class="questionList" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-radio-group v-model:value="question.value" :name="question.questionId">
                    <n-radio
                      v-for="option in question.optionList" :key="option.optionId" class="option"
                      :value="option.optionId"
                    >
                      {{ option.content }}
                    </n-radio>
                  </n-radio-group>
                </n-form-item-gi>
                <n-form-item-gi
                  v-if="question.type === 2" class="questionList" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-checkbox-group v-model:value="question.value" :name="question.questionId">
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
                  v-if="question.type === 3" class="questionList" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-input v-model:value="question.content" style="width: 450px;" placeholder="" />
                </n-form-item-gi>
                <n-form-item-gi
                  v-if="question.type === 4" class="questionList" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-input v-model:value="question.content" type="textarea" style="width: 450px;" placeholder="" />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </div>
        </div>
      </n-layout-content>
    </n-layout>
  </n-space>
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

      .questionList {
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
