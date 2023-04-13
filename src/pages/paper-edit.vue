<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { FormItemRule, useMessage } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { nanoid } from 'nanoid/async'
import { constVal } from '../util/constVal'
import { paperInfo } from '../api/paper-info'
import { chatGpt } from '../api/chat-gpt'

const message = useMessage()
const router = useRouter()

const route = useRoute()
const paperId = route.query.id

// 各种状态
const state = reactive({
  waitting: false,
  updataTitle: false,
  updataRemark: false,
  isNewQs: false,
  gpt: Array.from({ length: 10 }, () => false),
  isNewPaper: true,
  search: '',
  qsInfo: {
    surveyId: -1,
    surveyTitle: '请输入标题',
    remark: '',
    state: 0,
    count_question: 0,
    questionList: [],
  },
})

// gpt相关
const saveDialog = ref([
  {
    title: '您的恋爱对象是否是大学同学？',
    optionList: [
      {
        text: '是',
      },
      {
        text: '否',
      },
    ],
  }, {
    title: '您认为大学生恋爱的最大困难是什么？',
    optionList: [
      {
        text: '时间和学业压力',
      },
      {
        text: '经济压力',
      },
      {
        text: '家庭的反对或不支持',
      },
      {
        text: '空间和住宿问题',
      },
      {
        text: '社交压力和舆论压力',
      },
    ],
  }])
// 根据问卷id获取问卷信息
const getPaperInfo = async () => {
  const res = await paperInfo.getPaperInfoById(paperId)
  if (res.data.data) {
    state.isNewPaper = false
    state.qsInfo = res.data.data
  }
  console.log(res.data.data)
  // console.log(constVal.qsTypeMap.get(state.qsInfo.questionList[0]).comp)
}

const searchKeyword = async (keyword) => {
  state.waitting = true
  const res = await chatGpt.postChatGptQs(keyword)
  // 定时器模拟请求
  // const res = await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         questionList: [
  //           {
  //             title: '您的恋爱对象是大学同学？',
  //             optionList: [
  //               {
  //                 text: '是',
  //               },
  //               {
  //                 text: '这怎么不许呢',
  //               },
  //             ],
  //           }, {
  //             title: '您认为大学生恋爱的最大困难是什么？',
  //             optionList: [
  //               {
  //                 text: '时间和学业压力',
  //               },
  //               {
  //                 text: '经济压力',
  //               },
  //               {
  //                 text: '家庭的反对或不支持',
  //               },
  //               {
  //                 text: '空间和住宿问题',
  //               },
  //               {
  //                 text: '社交压力和舆论压力',
  //               },
  //             ],
  //           }],
  //       },
  //     })
  //   }, 10000)
  // })
  if (res.data) {
    saveDialog.value = res.data.questionList
    state.waitting = false
  }
}

getPaperInfo()
const compRefList = ref([])

// 修改问卷标题和描述相关
const value = reactive({
  title: state.qsInfo.surveyTitle,
  remark: state.qsInfo.remark,
})
const cancelTitleUpdata = () => {
  message.info('取消修改')
  value.title = state.qsInfo.surveyTitle
}
const submitTitleUpdata = () => {
  if (value.title === '') {
    message.error('问卷标题不能为空，修改失败')
    value.title = state.qsInfo.surveyTitle
    return
  }
  state.qsInfo.surveyTitle = value.title
  message.success('问卷标题修改成功')
}
const cancelRemarkUpdata = () => {
  message.info('取消修改')
  value.remark = state.qsInfo.remark
}
const submitRemarkUpdata = () => {
  state.qsInfo.remark = value.remark
  message.success('问卷描述修改成功')
}

// 将题目排序
const sortedQuestions = computed(() => {
  return state.qsInfo.questionList.slice().sort((item) => {
    return item.questionOrder - item.questionOrder
  })
})
// 计算题目总数
const qsNum = computed(() => {
  return state.qsInfo.questionList.length
})
// 删除题目
const deleteQs = (id) => {
  // 如果问卷中只有一道题，不允许删除
  if (state.qsInfo.questionList.length === 1) {
    message.error('问卷中至少要有一道题目')
    return
  }
  const qsIndex = state.qsInfo.questionList.findIndex((item) => {
    return item.questionId === id
  })
  state.qsInfo.questionList.splice(qsIndex, 1)
}
// 上移题目
const moveUpQs = (index) => {
  const temp = state.qsInfo.questionList[index].questionOrder
  const tempQs = state.qsInfo.questionList[index]
  state.qsInfo.questionList[index].questionOrder = state.qsInfo.questionList[index - 1].questionOrder
  state.qsInfo.questionList[index - 1].questionOrder = temp
  state.qsInfo.questionList[index] = state.qsInfo.questionList[index - 1]
  state.qsInfo.questionList[index - 1] = tempQs
}
// 下移题目
const moveDownQs = (index) => {
  const temp = state.qsInfo.questionList[index].questionOrder
  state.qsInfo.questionList[index].questionOrder = state.qsInfo.questionList[index + 1].questionOrder
  state.qsInfo.questionList[index + 1].questionOrder = temp
  const tempQs = state.qsInfo.questionList[index]
  state.qsInfo.questionList[index] = state.qsInfo.questionList[index + 1]
  state.qsInfo.questionList[index + 1] = tempQs
}

// 将saveDialog数组里的options里添加optionId并且将text转化为content
// const saveDialogWithId = computed(() => {
//   const temp = []
//   saveDialog.value.forEach((item, index) => {
//     const tempItem = {
//       questionId: index + 1,
//       question: item.title,
//       type: 1,
//       value: null,
//       optionList: [],
//     }
//     item.optionList.forEach((option, optionIndex) => {
//       tempItem.optionList.push({
//         optionId: optionIndex + 1,
//         content: option.text,
//       })
//     })
//     temp.push(tempItem)
//   })
//   return temp
// })
// 将1、2、3转化为A、B、C
const convertNumToLetter = (num) => {
  const letter = String.fromCharCode(64 + num)
  return letter
}
const gptShow = (index) => {
  state.gpt[index] = true
}
// 添加题目
let order = 1
const addRadioQuestion = async () => {
  if (state.qsInfo.questionList.length === 0)
    order = 1
  else
    order = state.qsInfo.questionList[state.qsInfo.questionList.length - 1].questionOrder + 1
  state.qsInfo.questionList.push({
    questionId: await nanoid(),
    questionOrder: order,
    question: '',
    type: 1,
    value: null,
    optionList: [{
      optionId: 1,
      content: '',
    }, {
      optionId: 2,
      content: '',
    }],
  })
  state.isNewQs = true
}
const addCheckboxQuestion = async () => {
  if (state.qsInfo.questionList.length === 0)
    order = 1
  else
    order = state.qsInfo.questionList[state.qsInfo.questionList.length - 1].questionOrder + 1
  state.qsInfo.questionList.push({
    questionId: await nanoid(),
    questionOrder: order,
    question: '',
    type: 2,
    value: null,
    optionList: [{
      optionId: 1,
      content: '',
    }, {
      optionId: 2,
      content: '',
    }],
  })
  state.isNewQs = true
}
const addShortAnswerQuestion = async () => {
  if (state.qsInfo.questionList.length === 0)
    order = 1
  else
    order = state.qsInfo.questionList[state.qsInfo.questionList.length - 1].questionOrder + 1
  state.qsInfo.questionList.push({
    questionId: await nanoid(),
    questionOrder: order,
    question: '',
    type: 3,
    content: null,
  })
  state.isNewQs = true
}
const addLongAnswerQuestion = async () => {
  if (state.qsInfo.questionList.length === 0)
    order = 1
  else
    order = state.qsInfo.questionList[state.qsInfo.questionList.length - 1].questionOrder + 1
  state.qsInfo.questionList.push({
    questionId: await nanoid(),
    questionOrder: order,
    question: '',
    type: 4,
    content: null,
  })
  state.isNewQs = true
}
const gptAddRadioQuestion = async (index) => {
  if (state.qsInfo.questionList.length === 0)
    order = 1
  else
    order = state.qsInfo.questionList[state.qsInfo.questionList.length - 1].questionOrder + 1
  for (let i = 0; i < saveDialog.value[index].optionList.length; i += 1) {
    saveDialog.value[index].optionList[i].optionId = i + 1
    saveDialog.value[index].optionList[i].content = saveDialog.value[index].optionList[i].text
  }
  state.qsInfo.questionList.push({
    questionId: await nanoid(),
    questionOrder: order,
    question: saveDialog.value[index].title,
    type: 1,
    value: null,
    optionList: saveDialog.value[index].optionList,
  })
}
const gptAddCheckboxQuestion = async (index) => {
  if (state.qsInfo.questionList.length === 0)
    order = 1
  else
    order = state.qsInfo.questionList[state.qsInfo.questionList.length - 1].questionOrder + 1
  for (let i = 0; i < saveDialog.value[index].optionList.length; i += 1) {
    saveDialog.value[index].optionList[i].optionId = i + 1
    saveDialog.value[index].optionList[i].content = saveDialog.value[index].optionList[i].text
  }
  state.qsInfo.questionList.push({
    questionId: await nanoid(),
    questionOrder: order,
    question: saveDialog.value[index].title,
    type: 2,
    value: null,
    optionList: saveDialog.value[index].optionList,
  })
}

const submitEdit = () => {
  for (const comp of compRefList.value) {
    if (comp.state.isEdit || comp.state.isNew) {
      message.warning('您还有未编辑的题目，无法提交')
      return
    }
  }
  // 转换成json格式
  const qsInfo = JSON.stringify(state.qsInfo)
  console.log(qsInfo)
  // router.go(-1)
}

// 返回上一级
const goBack = () => {
  router.go(-1)
}
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
            <n-collapse :default-expanded-names="['1', '2']" style="width: 100%;margin: 0;">
              <n-collapse-item title="选择题" name="1">
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
            </n-collapse>
          </n-collapse-item>
          <n-collapse-item title="问卷大纲" name="2">
            <div
              v-for="(question, index) of sortedQuestions" :key="question.questionId" :question="question.questionId"
              :index="index" style="margin-top: 3px;"
            >
              {{ index + 1 }}、{{ question.question }}
            </div>
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-grid-item>
    <n-grid-item :span="11">
      <n-layout-content>
        <div class="contain">
          <div class="head">
            <div class="title" @click="state.updataTitle = true">
              {{ state.qsInfo.surveyTitle }}
            </div>
            <n-modal
              v-model:show="state.updataTitle" :trap-focus="false" :mask-closable="false" preset="dialog"
              title="请输入问卷标题" positive-text="确认" negative-text="取消" @positive-click="submitTitleUpdata"
              @negative-click="cancelTitleUpdata"
            >
              <n-input v-model:value="value.title" placeholder="请输入题目" clearable />
            </n-modal>
            <div class="des" @click="state.updataRemark = true">
              <b style="font-size: 17px;">问卷描述：</b>{{ state.qsInfo.remark }}
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
                v-for="(question, index) of sortedQuestions" :key="question.questionId"
                :question="question.questionId" :index="index"
              >
                <component
                  :is="constVal.qsTypeMap.get(question.type).comp"
                  :ref="el => compRefList[index] = el"
                  :qs-index="index + 1" :qs-title="question.question" :qs-options="question.optionList"
                  :qs-value="question.value" :qs-id="question.questionId" :qs-length="qsNum" :is-new-qs="state.isNewQs"
                  @delete-qs="deleteQs(question.questionId)" @move-up-qs="moveUpQs(index)"
                  @move-down-qs="moveDownQs(index)"
                />
              </n-form-item-gi>
            </n-form>
          </div>
        </div>
      </n-layout-content>
    </n-grid-item>
    <n-grid-item :span="8">
      <div class="chat">
        <div class="gpt">
          <div v-show="state.waitting" class="wait">
            <n-spin size="large" />&nbsp;&nbsp;
            正在为您生成题目，请稍等...
          </div>
          <div v-show="saveDialog !== undefined && !state.waitting">
            这是我为您提供的题目：
          </div>
          <div v-show="saveDialog === undefined && !state.waitting" class="title">
            <div>目前还没有您的提问！</div>
            <div>快发送问卷标题或者问题关键词给我吧！</div>
            <div>我会随机给您生成问题，供您选择！</div>
          </div>
          <div v-for="(item, index) of saveDialog" v-show="saveDialog !== undefined && !state.waitting" :key="item.title" :item="item.title" :index="index" class="item">
            <n-grid :x-gap="6" :cols="6" @mouseenter="gptShow(index)" @mouseleave="state.gpt[index] = false">
              <n-grid-item :span="4">
                {{ index + 1 }}、{{ item.title }}
                <div v-for="(option, x) of item.optionList" :key="option.text" :option="option.text" :index="x">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ convertNumToLetter(x + 1) }}、{{ option.text }}
                </div>
              </n-grid-item>
              <n-grid-item :span="2" class="handle">
                <div v-show="state.gpt[index]">
                  <n-button strong secondary round type="success" @click="gptAddRadioQuestion(index)">
                    添加为单选题
                  </n-button>
                </div>
                <div v-show="state.gpt[index]">
                  <n-button strong secondary round type="info" @click="gptAddCheckboxQuestion(index)">
                    添加为多选题
                  </n-button>
                </div>
              </n-grid-item>
            </n-grid>
          </div>
        </div>
        <div class="user">
          <n-input-group>
            <span style="line-height: 35px; margin-right: 8px;">关键词</span>
            <n-input v-model:value="state.search" :style="{ width: '50%' }" placeholder="请输入关键词" :allow-input="noSideSpace" />
            <n-button type="primary" ghost @click="searchKeyword(state.search)">
              搜索
            </n-button>
          </n-input-group>
        </div>
        <div class="tip">
          <div>Tip：</div>
          <div>发送问卷的标题或者问题关键词，会随机为您推荐题目。</div>
          <div>点击题目右边的按钮，选择需要的题目添加为单选题或者多选题。</div>
          <div>可多次获取随机的题目。</div>
        </div>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style lang="scss" scoped>
.chat {
  background: #fff;
  width: 90%;
  height: calc(100vh - 103px);
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px 10px;
  overflow: auto;

  .gpt {
    height: 43vh;
    overflow: auto;
    border: 1px solid #ccc;
    background: #fdfdfd;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    padding-top: 30px;
    .wait {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .title {
      text-align: center;
      margin: 60px 0;
      font-size: 20px;

      div {
        margin: 15px 0;
      }
    }

    .item {
      padding: 0 20px;
      margin-top: 10px;
      min-height: 80px;

      .handle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        .n-button {
          margin-bottom: 5px;
        }
      }
    }
  }

  .user {
    padding: 10px;
    margin: 0 0 10px 40px;
  }

  .tip {
    background: #f5f5f5;
    border-radius: 10px;
    padding: 20px 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
}

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
    width: 90%;
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
