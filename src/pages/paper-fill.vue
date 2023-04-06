<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInst } from 'naive-ui'
import { FormItemRule, useMessage } from 'naive-ui'

const route = useRoute()
const paperId = route.query.id

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
      }],
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
      }],
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
      }],
    }],
  }],
}

// 写一个计算属性，将qsInfo.list.model里面的四个questions对象根据question_order进行排序，并返回
const sortedQuestions = computed(() => {
  return qsInfo.list.model.map((item: any) => {
    item.questions.sort((a: any, b: any) => {
      return a.question_order - b.question_order
    })
    return item
  })
})
const formRef = ref(null)
const fillFinish = () => {
  const form = sortedQuestions.value[0].questions.map((item: any) => {
    return {
      question_id: item.question_id,
      value: item.value || item.content,
    }
  })

  // if (form) {
  //   form.validate().then((res) => {
  //     console.log(res)
  //   })
  // }
  // else {
  //   console.log('error')
  // }
}
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
            <n-button type="success" @click="fillFinish">
              提交问卷
            </n-button>
          </n-grid-item>
        </n-grid>
      </n-layout-header>
      <n-layout-content>
        <div class="contain">
          <div class="head">
            <div class="title">
              {{ qsInfo.list.model[0].survey_title }}
            </div>
            <div class="des">
              {{ qsInfo.list.model[0].remark }}
            </div>
          </div>
          <div class="body">
            <n-form
              v-for="(question, index) of sortedQuestions[0].questions" ref="formRef"
              :key="question.question_id" :question="question.question_id" :index="index"
            >
              <n-grid :cols="24" :x-gap="24" :y-gap="24">
                <n-form-item-gi
                  v-if="question.type === 1" class="options" :span="24"
                  :label="`${index + 1}、${question.question}`" :path="question.value"
                >
                  <n-radio-group v-model:value="question.value" :name="question.question_id">
                    <n-space>
                      <n-radio
                        v-for="option in question.options" :key="option.option_id" class="option"
                        :value="option.option_id"
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
                  <n-checkbox-group v-model:value="question.value" :name="question.question_id">
                    <n-space>
                      <n-checkbox
                        v-for="option in question.options" :key="option.option_id" class="option"
                        :value="option.option_id"
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
                  <n-input v-model:value="question.content" style="width: 450px;" placeholder="" />
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
