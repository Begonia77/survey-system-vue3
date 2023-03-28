<script setup>
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { FormItemRule, useMessage } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { nanoid } from 'nanoid/async'
import { constVal } from '../util/constVal'

const message = useMessage()
const router = useRouter()

const route = useRoute()
const paperId = route.query.id

// 各种状态
const state = reactive({
  updataTitle: false,
  updataRemark: false,
  isNewQs: false,
})

// 根据问卷id获取问卷信息
// const getPaperInfo = async () => {
//   const res = await getPaperInfoById(paperId);
//   if (res.code === 200) {
//     paperInfo = res.data;
//   }
// }

const qsInfo = reactive({
  list: [],
})
const compRefList = ref([])
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
      question_id: 5,
      question_order: 7,
      question: '你的优点是？',
      type: 4,
      content: null,
    },
    {
      question_id: 3,
      question_order: 3,
      question: '您晚上休息的时间是在几点的时候？您晚上休息的时间是在几点的时候？您晚上休息的时间是在几点的时候？您晚上休息的时间是在几点的时候？您晚上休息的时间是在几点的时候？',
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

// 修改问卷标题和描述相关
const value = reactive({
  title: qsInfo.list.model[0].survey_title,
  remark: qsInfo.list.model[0].remark,
})
const cancelTitleUpdata = () => {
  message.info('取消修改')
  value.title = qsInfo.list.model[0].survey_title
}
const submitTitleUpdata = () => {
  if (value.title === '') {
    message.error('问卷标题不能为空，修改失败')
    value.title = qsInfo.list.model[0].survey_title
    return
  }
  qsInfo.list.model[0].survey_title = value.title
  message.success('问卷标题修改成功')
}
const cancelRemarkUpdata = () => {
  message.info('取消修改')
  value.remark = qsInfo.list.model[0].remark
}
const submitRemarkUpdata = () => {
  qsInfo.list.model[0].remark = value.remark
  message.success('问卷描述修改成功')
}

// 将题目排序
const sortedQuestions = computed(() => {
  return qsInfo.list.model.map((item) => {
    item.questions.sort((a, b) => {
      return a.question_order - b.question_order
    })
    return item
  })
})
// 计算题目总数
const qsNum = computed(() => {
  let num = 0
  sortedQuestions.value[0].questions.forEach((item) => {
    num += 1
  })
  return num
})
// 删除题目
const deleteQs = (id) => {
  const qsIndex = qsInfo.list.model[0].questions.findIndex((item) => {
    return item.question_id === id
  })
  qsInfo.list.model[0].questions.splice(qsIndex, 1)
}
// 上移题目
const moveUpQs = (index) => {
  const temp = qsInfo.list.model[0].questions[index].question_order
  const tempQs = qsInfo.list.model[0].questions[index]
  qsInfo.list.model[0].questions[index].question_order = qsInfo.list.model[0].questions[index - 1].question_order
  qsInfo.list.model[0].questions[index - 1].question_order = temp
  qsInfo.list.model[0].questions[index] = qsInfo.list.model[0].questions[index - 1]
  qsInfo.list.model[0].questions[index - 1] = tempQs
}
// 下移题目
const moveDownQs = (index) => {
  const temp = qsInfo.list.model[0].questions[index].question_order
  qsInfo.list.model[0].questions[index].question_order = qsInfo.list.model[0].questions[index + 1].question_order
  qsInfo.list.model[0].questions[index + 1].question_order = temp
  const tempQs = qsInfo.list.model[0].questions[index]
  qsInfo.list.model[0].questions[index] = qsInfo.list.model[0].questions[index + 1]
  qsInfo.list.model[0].questions[index + 1] = tempQs
}

// 添加题目

const addBinaryQuestion = async () => {
  // qsInfo.list.model[0].questions.push({
  //   question_id: await nanoid(),
  //   question: '',
  //   type: 1,
  //   value: null,
  //   options: [{
  //     option_id: 1,
  //     content: '',
  //   },
  //   {
  //     option_id: 2,
  //     content: '',
  //   }],
  // })
  // state.isNewQs = true
}
const addRadioQuestion = async () => {
  qsInfo.list.model[0].questions.push({
    question_id: await nanoid(),
    question_order: qsInfo.list.model[0].questions[qsInfo.list.model[0].questions.length - 1].question_order + 1,
    question: '',
    type: 1,
    value: null,
    options: [{
      option_id: 1,
      content: '',
    }, {
      option_id: 2,
      content: '',
    }],
  })
  state.isNewQs = true
}
const addCheckboxQuestion = async () => {
  qsInfo.list.model[0].questions.push({
    question_id: await nanoid(),
    question_order: qsInfo.list.model[0].questions[qsInfo.list.model[0].questions.length - 1].question_order + 1,
    question: '',
    type: 2,
    value: null,
    options: [{
      option_id: 1,
      content: '',
    }, {
      option_id: 2,
      content: '',
    }],
  })
  state.isNewQs = true
}
const addShortAnswerQuestion = async () => {
  qsInfo.list.model[0].questions.push({
    question_id: await nanoid(),
    question_order: qsInfo.list.model[0].questions[qsInfo.list.model[0].questions.length - 1].question_order + 1,
    question: '',
    type: 3,
    content: null,
  })
  state.isNewQs = true
}
const addLongAnswerQuestion = async () => {
  qsInfo.list.model[0].questions.push({
    question_id: await nanoid(),
    question_order: qsInfo.list.model[0].questions[qsInfo.list.model[0].questions.length - 1].question_order + 1,
    question: '',
    type: 4,
    content: null,
  })
  state.isNewQs = true
}

const submitEdit = () => {
  for (const comp of compRefList.value) {
    if (comp.state.isEdit || comp.state.isNew) {
      message.warning('您还有未编辑的题目，无法提交')
      return
    }
  }
  router.go(-1)
}

// 返回上一级
const goBack = () => {
  router.go(-1)
}
// onMounted(() => {
//   console.log(compRefList.value[0].state.isEdit)
// })
</script>

<template>
  <n-layout-header>
    <n-grid :cols="24">
      <n-grid-item :span="5" class="goback">
        <a @click="goBack()">返回</a>
      </n-grid-item>
      <n-grid-item :span="12" class="title">
        <span>编辑问卷</span>
      </n-grid-item>
      <n-grid-item :span="2" class="submitBtn">
        <n-button type="success" @click="submitEdit">
          完成编辑
        </n-button>
      </n-grid-item>
    </n-grid>
  </n-layout-header>
  <n-grid :cols="24" class="contain">
    <n-grid-item :span="5">
      <div class="left">
        <n-collapse :default-expanded-names="['1', '2']" style="width: 95%;">
          <n-collapse-item title="题目类型" name="1">
            <n-collapse :default-expanded-names="['1', '2', '3']" style="width: 100%;margin: 0;">
              <n-collapse-item title="选择题" name="1">
                <n-button style="width: 80%;" quaternary round @click="addBinaryQuestion">
                  判断题
                </n-button>
                <n-button style="width: 80%;" quaternary round @click="addRadioQuestion">
                  单选题
                </n-button>
                <n-button style="width: 80%;" quaternary round @click="addCheckboxQuestion">
                  多选题
                </n-button>
              </n-collapse-item>
              <n-collapse-item title="填空题" name="2">
                <n-button style="width: 80%;" quaternary round @click="addShortAnswerQuestion">
                  单行填空
                </n-button>
                <n-button style="width: 80%;" quaternary round @click="addLongAnswerQuestion">
                  多行填空
                </n-button>
              </n-collapse-item>
              <n-collapse-item title="个人信息" name="3">
                <n-button style="width: 80%;" quaternary round>
                  姓名
                </n-button>
                <n-button style="width: 80%;" quaternary round>
                  性别
                </n-button>
                <n-button style="width: 80%;" quaternary round>
                  手机号
                </n-button>
              </n-collapse-item>
            </n-collapse>
          </n-collapse-item>
          <n-collapse-item title="问卷大纲" name="2">
            <div
              v-for="(question, index) of sortedQuestions[0].questions" :key="question.question_id"
              :question="question.question_id" :index="index" style="margin-top: 3px;"
            >
              {{ index + 1 }}、{{ question.question }}
              <!-- {{ sortedQuestions[0].questions }} -->
            </div>
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-grid-item>
    <n-grid-item :span="12">
      <n-layout-content>
        <div v-for="item in qsInfo.list.model" :key="item.survey_id" class="contain">
          <div class="head">
            <div class="title" @click="state.updataTitle = true">
              {{ item.survey_title }}
            </div>
            <n-modal
              v-model:show="state.updataTitle" :trap-focus="false" :mask-closable="false" preset="dialog"
              title="请输入问卷标题" positive-text="确认" negative-text="取消" @positive-click="submitTitleUpdata"
              @negative-click="cancelTitleUpdata"
            >
              <n-input v-model:value="value.title" placeholder="请输入题目" clearable />
            </n-modal>
            <div class="des" @click="state.updataRemark = true">
              <b style="font-size: 17px;">问卷描述：</b>{{ item.remark }}
            </div>
            <n-modal
              v-model:show="state.updataRemark" :trap-focus="false" :mask-closable="false" preset="dialog"
              title="请输入问卷描述" positive-text="确认" negative-text="取消" @positive-click="submitRemarkUpdata"
              @negative-click="cancelRemarkUpdata"
            >
              <n-input v-model:value="value.remark" type="textarea" placeholder="请输入描述" clearable />
            </n-modal>
          </div>
          <div class="body">
            <n-form ref="formRef">
              <n-form-item-gi
                v-for="(question, index) of sortedQuestions[0].questions" :key="question.question_id"
                :question="question.question_id" :index="index"
              >
                <component
                  :is="constVal.qsTypeMap.get(question.type).comp" :ref="el => compRefList[index] = el"
                  :qs-index="index + 1" :qs-title="question.question" :qs-options="question.options"
                  :qs-value="question.value" :qs-id="question.question_id" :qs-length="qsNum" :is-new-qs="state.isNewQs"
                  @delete-qs="deleteQs(question.question_id)" @move-up-qs="moveUpQs(index)"
                  @move-down-qs="moveDownQs(index)"
                />
              </n-form-item-gi>
            </n-form>
          </div>
        </div>
      </n-layout-content>
    </n-grid-item>
    <n-grid-item :span="7">
      <!-- <div class="green" /> -->
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
    padding-right: 33px;
  }

  .title {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .submitBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    // 悬浮变成手指
    cursor: pointer;

    .n-button {
      font-size: 16px;
    }
  }
}

.contain {
  background: #E9EEF3;
  padding: 10px 0;
  height: calc(100vh - 80px);

  .left {
    // height: 90%;
    height: calc(100vh - 103px);
    background-color: #fff;
    width: 75%;
    float: right;
    margin-right: 15px;
    border-radius: 5px;
    padding-top: 7%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: auto;

    // .n-collapse {
    //   width: 90%;
    //   margin: 0 15px;
    // }
  }
}

.n-layout-content {
  background: #E9EEF3;

  .contain {
    background: #fff;
    width: 87%;
    height: calc(100vh - 125px);
    margin: 0 auto;
    border-radius: 10px;
    padding: 20px 30px;
    overflow: auto;

    .head {
      border-bottom: solid 1px #ccc;

      .title {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
      }

      .des {
        font-size: 14px;
        padding: 15px 0;
        cursor: pointer;
      }
    }

    .body {
      padding: 20px 10px;
    }
  }
}

::v-deep .n-collapse .n-collapse-item .n-collapse-item__content-inner {
  padding-top: 0px;
}

::v-deep .n-collapse .n-collapse-item {
  margin: 0 0 7px 15px;
}

::v-deep .n-collapse .n-collapse-item .n-collapse-item__header {
  padding: 7px 0 0 0;
}
</style>
