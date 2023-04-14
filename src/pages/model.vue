<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getPapersList } from '../api/all-paper'
import Kong from '../assets/kong.jpg'
const router = useRouter()
const qsInfo = reactive({
  list: [],
  search: '',
})

const getAllModelList = async () => {
  const res = await getPapersList()
  qsInfo.list = res.data.data.filter(item => item.state === 4)
}

const createPaper = (item) => {
  router.push({
    name: 'paperEdit',
    query: {
      id: item.surveyId,
    },
  })
}

const prePaper = (id) => {
  router.push({
    name: 'paperView',
    query: {
      id,
    },
  })
}
const onSearch = () => {
  if (qsInfo.search) {
    qsInfo.list = qsInfo.list.filter(item => item.surveyTitle.includes(qsInfo.search))
  }

  else {
    qsInfo.list = []
    getAllModelList()
  }
}
onMounted(() => {
  getAllModelList()
})
</script>

<template>
  <div style="padding: 20px 75px;">
    <n-input-group style="padding-bottom: 30px;">
      <span style="margin-right: 10px;margin-top: 5px;">标题</span>
      <n-input v-model:value="qsInfo.search" :style="{ width: '30%' }" clearable placeholder="请输入模板标题" />
      <n-button type="primary" ghost @click="onSearch">
        搜索
      </n-button>
    </n-input-group>

    <n-result
      v-if="qsInfo.list.length === 0" title="暂无模板"
      description="在我的问卷中创建模板，可进行体验！"
    >
      <template #icon>
        <div style="width: 400px; margin-top: 20px;">
          <NImage object-fit="contain" width="400" :src="Kong" />
        </div>
      </template>
    </n-result>
    <n-grid x-gap="80" y-gap="40" :cols="9">
      <n-grid-item v-for="item in qsInfo.list" :key="item.surveyId" :span="3" class="card">
        <div class="title">
          <a class="tt" @click="prePaper(item.surveyId)">{{ item.surveyTitle }}</a>
          <n-button style="float: right; --n-height:28px;" strong secondary round type="info" @click="createPaper(item)">
            创建
          </n-button>
        </div>
        <div class="des">
          {{ item.remark ? item.remark : '未填写描述' }}
        </div>
        <div class="foot">
          <span>共 {{ item.count_question }} 题</span>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
a {
  cursor: pointer;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  height: 220px;
  padding: 10px 26px;

  .title {
    font-size: 17px;
    font-weight: 600;
    color: #333;
    padding: 10px 0;
    border-bottom: solid 1px #ddd;
    margin-bottom: 10px;

    .tt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      width: 78%;
    }
  }

  .des {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    width: 96%;
    height: 46%;
    padding: 0 2%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #666;
    border-top: solid 1px #ddd;
    padding: 11px;
  }
}
</style>
