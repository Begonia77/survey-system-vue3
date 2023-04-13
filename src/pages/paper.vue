<script lang="ts" setup>
import { h, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDialog, useMessage } from 'naive-ui'
import { useClipboard } from '@vueuse/core'
import { paperInfo } from '../api/paper-info'
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
  userId: localStorage.getItem('userId'),
  modelRemark: '',
  createModelShow: false,
  modelId: 0,
  qsList: [],
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
  console.log(qsInfo.list)
}

// 根据问卷状态state筛选问卷，用计算属性实现, 0未发布，1已发布，2已结束
const filterQs = (state: number) => {
  if (state === -1)
    return qsInfo.list

  return qsInfo.list.filter(item => item.state === state)
}

const operateQs = [
  {
    label: '创建为模板',
    key: 1,
  },
]
const statisticalQs = [
  {
    label: '数据统计',
    key: 1,
  },
]
const sendQs = [
  {
    label: '链接',
    key: 1,
  },
  {
    label: '二维码',
    key: 2,
  },
]

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

const handleOperate = (key: string | number, id: number) => {
  state.modelId = id
  state.createModelShow = true
}
const submitModel = async () => {
  // 创建模板
  message.success('模板创建成功')
  // console.log(state.modelId)
  // console.log(state.modelRemark)
  const res = await paperInfo.getPaperInfoById(state.modelId)
  if (res.data.data) {
    // console.log(res.data.data)
    res.data.data.remark = state.modelRemark
    res.data.data.state = 4
    res.data.data.surveyId = null
    console.log(res.data.data)
    update.postNewModel(res.data.data)
  }

  state.modelRemark = ''
  // TODO:创建模板
}
const cancelModel = () => {
  message.info('模板创建取消')
  state.modelRemark = ''
  state.createModelShow = false
}
const handleStatistical = (key: string | number, id: number) => {
  // 跳转到统计页面
  router.push({
    name: 'paperAnalyse',
    query: {
      id,
    },
  })
}
const handleSend = (key: string | number, id: number) => {
  if (key === 1) {
    const paperLink = `${constVal.baseUrl}/paper/fill?id=${id}`
    copyLink(paperLink)
  }
  else {
    // router.push({
    //   name: 'paperQrcode',
    // })
    console.log('二维码')
    console.log(id)
    // TODO:生成二维码
  }
}

// 预览问卷
const prePaper = (id: number) => {
  console.log('预览问卷', id)
  router.push({
    name: 'paperView',
    query: {
      id,
    },
  })
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
  // console.log('编辑问卷',id)
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
          <n-space vertical>
            <n-input-group>
              <n-input clearable placeholder="请输入标题" />
              <n-button type="primary" ghost>
                搜索
              </n-button>
            </n-input-group>
          </n-space>
        </div>

        <div v-for="item in filterQs(activeKey)" v-show="item.state !== 4" :key="item.surveyId" class="card">
          <div class="head">
            <n-popover trigger="hover" placement="left">
              <template #trigger>
                <a class="title" @click="prePaper(item.surveyId)">{{ item.surveyTitle }}</a>
              </template>
              <a @click="prePaper(item.surveyId)">预览问卷</a>
            </n-popover>
            <span>
              答卷：{{ item.count_fill_in }} <i />
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
              <n-dropdown
                v-if="constVal.IS_PUBLISH.value === item.state" trigger="click" :options="sendQs"
                @select="handleSend($event, item.surveyId)"
              >
                <n-button class="drop">发送问卷</n-button>
              </n-dropdown>
              <n-dropdown
                v-if="constVal.UN_PUBLISH.value !== item.state" trigger="click" :options="statisticalQs"
                @select="handleStatistical($event, item.surveyId)"
              >
                <n-button class="drop">统计问卷</n-button>
              </n-dropdown>
              <n-dropdown trigger="click" :options="operateQs" @select="handleOperate($event, item.surveyId)">
                <n-button class="drop">操作问卷</n-button>
              </n-dropdown>
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
<!--
  <n-button @click="handleConfirm">
    警告
  </n-button> -->
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
