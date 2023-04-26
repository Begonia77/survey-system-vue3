<script lang="ts" setup>
import * as echarts from 'echarts'
import { NButton, NTag } from 'naive-ui'
import { defineProps, h, onMounted, reactive, ref } from 'vue'

interface Props {
  qsIndex: number
  countFillIn: number
  qsAnswer: {
    surveyId: number
    questionId: number
    question: string
    questionOrder: number
    type: number
    remark: string
    content: string
    optionList: {
      questionId: number
      optionId: number
      content: string
      count: number
    }[]
  }
}
const props = defineProps<Props>()
const state = reactive({
  label: [] as string[],
  data1: [] as number[],
  data2: [] as { name: string; value: number }[],
  data: [] as any[],
})

const columns = [
  {
    title: '数据条目',
    key: 'index',
  },
  {
    title: '用户答案',
    key: 'option',
  },
]
// 将数据转换为表格所需的数据格式
let i = 0
const createData = () => {
  const data: any[] = []
  // const totalCount = props.qsAnswer.optionList.reduce(
  //   (prev, cur) => prev + cur.count,
  //   0,
  // )
  for (const item of props.qsAnswer.optionList) {
    state.label.push(item.content)
    i = i + 1
    const ans = {
      index: i,
      option: item.content,
    }
    data.push(ans)
  }
  return data
}
const data = createData()
</script>

<template>
  <div>
    <div class="emc-qs-title">
      <span class="qs-title">{{ props.qsIndex + 1 }}.{{ props.qsAnswer.question }}</span>
      <span
        v-if="props.qsAnswer.type === 3"
        class="qs-tip"
      >[单行填空]</span>
      <span
        v-if="props.qsAnswer.type === 4"
        class="qs-tip"
      >[多行填空]</span>
    </div>
    <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="data"
    />
    <div class="ems-qs-footer">
      <!-- <div>
        <span>提交人数：{{ props.qsAnswer.submit_person }}</span>
      </div> -->
      <div class="tag1">
        <NTag type="error">
          表&nbsp;&nbsp;格
        </NTag>
      </div>
    </div>
    <el-divider />
  </div>
</template>

<style lang="scss" scoped>
.emc-qs-title {
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 20px;

  .qs-title {
    font-size: larger;
    font-weight: bolder;
  }

  .qs-tip {
    font-size: larger;
  }
}

.tag1 {
  width: 850px;
  display: flex;
  justify-content: end;
  margin: 15px auto;
}
.ems-qs-footer {
  width: 850px;
  margin: 15px auto;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}

.n-data-table {
  width: 800px;
  margin: auto;
  border: 1px solid #99a9bf;
}
</style>
