<script setup>
import { NButton, NTag } from 'naive-ui'
import { h, reactive, ref } from 'vue'
const props = defineProps(['qsAnswer'])

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
const createData = () => {
  const data = []
  props.qsAnswer.qs_option.forEach((item, index) => {
    data.push({
      key: index,
      index: index + 1,
      option: item.option,
    })
  })
  return data
}
const data = createData()
</script>

<template>
  <div>
    <div class="emc-qs-title">
      <span class="qs-title">{{ props.qsAnswer.qs_order }}.{{ props.qsAnswer.qs_title }}</span>
      <span v-if="props.qsAnswer.qs_type === '21'" class="qs-tip">[单行文本]</span>
      <span
        v-else-if="props.qsAnswer.qs_type === '22'"
        class="qs-tip"
      >[多行文本]</span>
    </div>
    <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="data"
    />
    <div class="ems-qs-footer">
      <div>
        <span>提交人数：{{ props.qsAnswer.submit_person }}</span>
      </div>
      <div>
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
