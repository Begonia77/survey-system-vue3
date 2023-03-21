<script lang="ts" setup>
import { h, ref, reactive, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
// import router from '../router';
import { constVal } from '../util/constVal';

const menuOptions = [
  {
    label: () => h(
      'span',
      {

      },
      { default: () => "全部问卷" }
    ),
    key: "all-paper",
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => "已发布" }
    ),
    key: "published",
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => "未发布" }
    ),
    key: "unpublished",
  },
  {
    label: () => h(
      'span',
      {

      },
      { default: () => "已结束" }
    ),
    key: "has-ended",
  },
]

const qsInfo = reactive<any>({
  list: [] as any[],
})

qsInfo.list = {
  model: [{
    survey_id: 1,
    survey_title: '大学生熬夜情况调查大学生熬夜情况调查',
    remark: '大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查大学生熬夜情况调查',
    num: 100,
    created_user_id: '李四',
    ansNum: 100,
    created_time: '2023-05-01 12:00:00',
    state: 2,
  },
  {
    survey_id: 2,
    survey_title: '学生疫情防控每日报表',
    remark: '学生疫情防控每日报表',
    num: 48,
    created_user_id: '张三',
    ansNum: 100,
    created_time: '2021-05-04 12:00:00',
    state: 0,
  },
  {
    survey_id: 3,
    survey_title: '大学生恋爱情况调查',
    remark: '大学生恋爱情况调查大学生恋爱情况调查',
    num: 59,
    created_user_id: '六六',
    ansNum: 1009,
    created_time: '2022-05-01 12:00:00',
    state: 1,
  },
  {
    survey_id: 4,
    survey_title: '大学生恋爱情况调查',
    remark: '大学生恋爱情况调查大学生恋爱情况调查',
    num: 30,
    created_user_id: '王五',
    ansNum: 10,
    created_time: '2021-03-01 12:00:00',
    state: 2,
  },],
}
const activeKey = ref("all-paper")

// const message = useMessage();
const operateQs = [
  {
    label: "创建为模板",
    key: "create-template"
  }
]
const statisticalQs = [
  {
    label: "数据统计",
    key: "data-statistics"
  }
]
const sendQs = [
  {
    label: "链接",
    key: "link"
  },
  {
    label: "二维码",
    key: "two-dimensional-code"
  }
]

const handleOperate = (key: string | number) => {
  // message.info(String(key))
  console.log(key)
}
const handleStatistical = (key: string | number) => {
  // message.info(String(key))
  console.log(key)
}
const handleSend = (key: string | number) => {
  // message.info(String(key))
  console.log(key)
}

const router = useRouter()

// 预览问卷
const prePaper = (id: number) => {
  router.push({
    name: 'paperView',
    query: {
      id: id
    }
  })
}

// 操作问卷
// 删除问卷
const deletePaper = (id: number) => {
  console.log('删除问卷',id)
}
// 发布问卷
const publishPaper = (id: number) => {
  console.log('发布问卷',id)
}
// 结束问卷
const endPaper = (id: number) => {
  console.log('结束问卷',id)
}
// 编辑问卷
const editPaper = (id: number) => {
  router.push({
    name: 'paperEdit',
    query: {
      id: id
    }
  })
  // console.log('编辑问卷',id)
}

</script>

<template>
  <div class="content">

    <n-grid x-gap="50" :cols="24">
      <n-grid-item :span="5">
        <n-button type="info" style="width: 100%;height: 50px;font-size: 16px;margin-bottom: 20px;">
          + 创建问卷
        </n-button>
        <n-menu class="cen1" v-model:value="activeKey" :options="menuOptions" />
      </n-grid-item>
      <n-grid-item :span="18" class="qs">
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

        <div class="card" v-for="item in qsInfo.list.model" :key="item.survey_id">
          <div class="head">
            <n-popover trigger="hover" placement="left">
              <template #trigger>
                <a @click="prePaper(item.survey_id)" class="title">{{ item.survey_title }}</a>
              </template>
              <a @click="prePaper(item.survey_id)">预览问卷</a>
            </n-popover>
            <!-- <span class="title">{{ item.title }}</span> -->
            <span>
              答卷：{{ item.ansNum }} <i></i>
              创建时间：{{ item.created_time }} <i></i>
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
              <n-dropdown v-if="constVal.IS_PUBLISH.value === item.state" trigger="click" :options="sendQs"
                @select="handleSend">
                <n-button class="drop">发送问卷</n-button>
              </n-dropdown>
              <n-dropdown v-if="constVal.UN_PUBLISH.value !== item.state" trigger="click" :options="statisticalQs"
                @select="handleStatistical">
                <n-button class="drop">统计问卷</n-button>
              </n-dropdown>
              <n-dropdown trigger="click" :options="operateQs" @select="handleOperate">
                <n-button class="drop">操作问卷</n-button>
              </n-dropdown>
            </span>
            <span>
              <n-button @click="publishPaper(item.survey_id)" v-if="constVal.UN_PUBLISH.value === item.state" type="info" class="btn">
                发布
              </n-button>
              <n-button @click="editPaper(item.survey_id)" v-if="constVal.UN_PUBLISH.value === item.state" type="success" class="btn">
                编辑
              </n-button>
              <n-button @click="endPaper(item.survey_id)" v-if="constVal.IS_PUBLISH.value === item.state" type="warning" class="btn">
                结束
              </n-button>
              <n-button @click="deletePaper(item.survey_id)" type="error" class="btn">
                删除
              </n-button>
            </span>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
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
