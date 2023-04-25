<script lang="ts" setup>
import { activate, h, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDialog, useMessage } from 'naive-ui'
import { useClipboard } from '@vueuse/core'
import { isEmpty } from 'lodash-es'
import { paperInfo } from '../api/paper-info'
import Kong from '../assets/kong.jpg'
import { constVal } from '../util/constVal'
import { getPapersList } from '../api/all-paper'
import { update } from '../api/update-paper'

const menuOptions = [
  {
    label: () => h(
      'span',
      {

      },
      { default: () => '全部问卷' },
    ),
    key: -1,
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => '未发布' },
    ),
    key: 0,
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => '已发布' },
    ),
    key: 1,
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => '已结束' },
    ),
    key: 2,
  },
]
const activeKey = ref(-1)
const state = reactive({
  search: '',
  userId: localStorage.getItem('userId'),
  modelRemark: '',
  createModelShow: false,
  modelId: 0,
  qsList: [],
  isShowChatGpt: false,
})

const message = useMessage()
const dialog = useDialog()
const { copy } = useClipboard()
const router = useRouter()
const qsInfo = reactive<any>({
  list: [] as any[],
})

const getAllPaperList = async () => {
  const res = await getPapersList()
  qsInfo.list = res.data.data.filter((item: any) => item.createdUserId === +state.userId!)
}

// 根据问卷状态state筛选问卷，用计算属性实现, 0未发布，1已发布，2已结束
const filterQs = (state: number) => {
  if (state === -1)
    return qsInfo.list
  return qsInfo.list.filter(item => item.state === state)
}

const copyLink = (url: string) => {
  dialog.success({
    title: '问卷链接',
    content: url,
    positiveText: '复制并关闭',
    onPositiveClick: async () => {
      await copy(url)
      message.success('复制成功')
    },
  })
}

const handleOperate = (id: number) => {
  state.modelId = id
  state.createModelShow = true
}
const submitModel = async () => {
  message.success('模板创建成功')
  const res = await paperInfo.getPaperInfoById(state.modelId)
  if (res.data.data) {
    res.data.data.remark = state.modelRemark
    res.data.data.state = 4
    update.postNewModel(res.data.data)
  }

  state.modelRemark = ''
}
const cancelModel = () => {
  message.info('模板创建取消')
  state.modelRemark = ''
  state.createModelShow = false
}
const handleStatistical = (id: number) => {
  // 跳转到统计页面
  router.push({
    name: 'paperAnalyse',
    query: {
      id,
    },
  })
}
const handleSend = (id: number) => {
  const paperLink = `${constVal.baseUrl}/paper/fill?id=${id}`
  copyLink(paperLink)
}

// 预览问卷
const prePaper = (id: number) => {
  router.push({
    name: 'paperView',
    query: {
      id,
    },
  })
}

const newGptPaper = async () => {
  // $router.push({ name: 'gpt' })
  if (state.chatGptTitle === '') {
    message.error('请输入调查问卷标题')
    state.isShowChatGpt = false
  }
  else if (state.chatGptCount <= 0 || state.chatGptCount > 10) {
    message.error('请输入1-10之间的题目数量')
    state.isShowChatGpt = false
  }
  else {
    message.loading('正在生成，请等待...')
    state.isLoading = true
    state.isShowChatGpt = false
    console.log(state.chatGptTitle, state.chatGptCount)
    // TODO: 调用后端接口
    const res = await chatGpt.postChatGptNewPaper(state.chatGptTitle, state.chatGptCount).finally(() => {
      state.isLoading = false
      message.success('生成成功，请去查看')
      localStorage.setItem('chatGptPaperId', res.data.data)
    })
  }
  state.chatGptTitle = ''
  state.chatGptCount = null
}
const cancelGptPaper = () => {
  state.isShowChatGpt = false
  state.chatGptTitle = ''
  state.chatGptCount = null
}
const onViewNewPaper = () => {
  // 取出本地存储的问卷id
  state.chatGptPaperId = localStorage.getItem('chatGptPaperId')
  state.chatGptPaperId = 24
  if (state.isLoading)
    message.loading('正在生成问卷，请等待...')
  else if (!state.chatGptPaperId || state.chatGptPaperId === 'null' || state.chatGptPaperId === 'undefined')
    message.error('您还没有生成问卷')
  else
    router.push({ name: 'paperChatgpt', query: { id: state.chatGptPaperId } })
}
// 操作问卷
// 0未发布  1已发布  2已结束  3模板  4删除
// 新增问卷
const addPaper = () => {
  router.push({
    name: 'paperEdit',
  })
}
// 编辑问卷
const editPaper = (id: number) => {
  router.push({
    name: 'paperEdit',
    query: {
      id,
    },
  })
}
// 发布问卷
const publishPaper = (id: number) => {
  dialog.warning({
    title: '提示',
    content: '是否发布问卷？发布后不能进行修改！',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      update.postPaperPublish(id).then((res) => {
        if (res.status === 200) {
          message.success('发布成功')
          getAllPaperList()
        }
        else {
          message.error('发布失败')
        }
      })
    },
    onNegativeClick: () => {
      message.warning('取消发布')
    },
  })
}
// 结束问卷
const endPaper = (id: number) => {
  dialog.success({
    title: '提示',
    content: '是否结束收集问卷？结束后将不能收集问卷！',
    positiveText: '结束',
    negativeText: '取消',
    onPositiveClick: () => {
      update.postPaperEnd(id).then((res) => {
        if (res.status === 200) {
          message.success('发布成功')
          getAllPaperList()
        }
        else {
          message.error('发布失败')
        }
      })
    },
    onNegativeClick: () => {
      message.warning('取消结束')
    },
  })
}
// 删除问卷
const deletePaper = (id: number) => {
  dialog.error({
    title: '警告',
    content: '是否删除问卷？删除后将不能恢复！',
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: () => {
      update.postPaperDelete(id).then((res) => {
        if (res.status === 200) {
          message.success('删除成功')
          getAllPaperList()
        }
        else {
          message.error('删除失败')
        }
      })
    },
    onNegativeClick: () => {
      message.warning('取消删除')
    },
  })
}
onMounted(() => {
  getAllPaperList()
})
</script>

<template>
  <div class="content">
    <n-grid x-gap="50" :cols="24">
      <n-grid-item :span="6" style="margin-left: 60px;">
        <n-button type="info" style="width: 100%;height: 50px;font-size: 16px;margin-bottom: 20px;" @click="addPaper">
          + 创建问卷
        </n-button>
        <n-menu v-model:value="activeKey" class="cen1" :options="menuOptions" />
      </n-grid-item>
      <n-grid-item :span="17" class="qs">
        <div class="title">
          <h2>问卷列表</h2>
          <div>
            <NButton
              type="info"
              style="padding: 20px; background: #067bef; margin-right: 30px;"
              @click="state.isShowChatGpt = true"
            >
              <span @click="state.isShowChatGpt = true">生成一份问卷</span>
            </NButton>
            <NButton
              type="success"
              style="padding: 20px; margin-right: 30px;"
              @click="onViewNewPaper"
            >
              <span>查看生成的问卷</span>
            </NButton>
          </div>
        </div>
        <div class="new-card" @click="addPaper">
          点击创建新问卷 +
        </div>

        <n-result
          v-if="isEmpty(filterQs(activeKey))" title="暂无问卷"
          description="请创建问卷进行体验！"
        >
          <template #icon>
            <div style="width: 300px; margin-top: 20px;">
              <NImage object-fit="contain" width="300" :src="Kong" />
            </div>
          </template>
        </n-result>

        <div v-for="item in filterQs(activeKey)" v-show="item.state !== 4" :key="item.surveyId" class="card">
          <div class="head">
            <n-popover trigger="hover" placement="left">
              <template #trigger>
                <a class="title" @click="prePaper(item.surveyId)">{{ item.surveyTitle }}</a>
              </template>
              <a @click="prePaper(item.surveyId)">预览问卷</a>
            </n-popover>
            <span>
              创建时间：{{ item.createdTime }} <i />
              <n-tag v-if="constVal.UN_PUBLISH.value === item.state" type="warning">
                未发布
              </n-tag>
              <n-tag v-if="constVal.IS_PUBLISH.value === item.state" type="success">
                已发布
              </n-tag>
              <n-tag v-if="constVal.IS_STOP.value === item.state" type="error">
                已结束
              </n-tag>
            </span>
          </div>
          <div class="body">
            <span>
              <n-button v-if="constVal.IS_PUBLISH.value === item.state" class="drop" @click="handleSend(item.surveyId)">发送问卷</n-button>
              <n-button v-if="constVal.UN_PUBLISH.value !== item.state" class="drop" @click="handleStatistical(item.surveyId)">数据统计</n-button>
              <n-button class="drop" @click="handleOperate(item.surveyId)">创建为模板</n-button>
            </span>
            <span>
              <n-button
                v-if="constVal.UN_PUBLISH.value === item.state" type="info" class="btn"
                @click="publishPaper(item.surveyId)"
              >
                发布
              </n-button>
              <n-button
                v-if="constVal.UN_PUBLISH.value === item.state" type="success" class="btn"
                @click="editPaper(item.surveyId)"
              >
                编辑
              </n-button>
              <n-button
                v-if="constVal.IS_PUBLISH.value === item.state" type="warning" class="btn"
                @click="endPaper(item.surveyId)"
              >
                结束
              </n-button>
              <n-button type="error" class="btn" @click="deletePaper(item.surveyId)">
                删除
              </n-button>
            </span>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>

  <n-modal
    v-model:show="state.createModelShow" :trap-focus="false" :mask-closable="false" preset="dialog"
    title="请输入模板描述" positive-text="确认" negative-text="取消" @positive-click="submitModel()"
    @negative-click="cancelModel"
  >
    <n-input v-model:value="state.modelRemark" type="textarea" placeholder="请输入描述" clearable />
  </n-modal>

  <n-modal
    v-model:show="state.isShowChatGpt" :trap-focus="false" :mask-closable="false" preset="dialog"
    title="请输入相关信息" positive-text="生成问卷" negative-text="取消" @positive-click="newGptPaper"
    @negative-click="cancelGptPaper"
  >
    <div>
      <div style="padding: 5px; line-height: 35px;">
        调查问卷标题：<n-input v-model:value="state.chatGptTitle" placeholder="请输入调查问卷标题" clearable />
      </div>
      <div style="padding: 5px; line-height: 35px;">
        题目数（不大于10）：<n-input-number v-model:value="state.chatGptCount" button-placement="both" placeholder="请输入生成题目数量" :min="1" :max="10" />
      </div>
    </div>
  </n-modal>
</template>

<style lang="scss" scoped>
.content {
  flex-direction: column;
  height: 100%;
  width: 96%;
  margin: auto;

  .cen1 {
    background-color: #f8f8f8;
    // max-width: 1200px;
    width: 100%;
  }
}

a {
  cursor: pointer;
}

.qs {
  height: 100%;
  width: 100%;

  .title {
    // 浮动布局，使之左右分布
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .new-card {
    height: 120px;
    width: 100%;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 0 4px #ccc;
  background-color: rgba(255,255,255,0.6);
    // 虚线
    border: dashed 1px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    cursor: pointer;
  }
  .card {
    background-color: #f8f8f8;
    height: 120px;
    width: 100%;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 0 4px #ccc;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      line-height: 60px;
      margin: 0 20px;
      width: 95%;
      font-size: 13px;
      border-bottom: solid 1px #ccc;

      .title {
        font-size: 18px;
        font-weight: bold;
      }

      .n-tag {
        font-size: 12px;
        height: 20px;
      }

      i {
        margin: 0 7px;
        border-left: solid 1px #ccc;
      }
    }

    .body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 56px;
      line-height: 56px;
      margin: 0 20px;
      width: 95%;

      .btn {
        width: 60px;
        height: 30px;
        font-size: 12px;
        margin-left: 10px;
      }

      .drop {
        height: 30px;
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
}
</style>
