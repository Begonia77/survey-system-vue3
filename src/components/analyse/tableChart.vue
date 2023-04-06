<script setup>
import * as echarts from 'echarts'
import { NButton, NTag } from 'naive-ui'
import { defineProps, h, onMounted, reactive, ref } from 'vue'

const props = defineProps(['qsAnswer'])
console.log(props.qsAnswer)
// 组装图表所需参数并传入
const opts = props.qsAnswer.answers
const label = []
const data1 = []
const data2 = []
for (const i in opts) {
  label.push(opts[i].option)
  data1.push(parseInt(opts[i].subtotal))
  const ans = {
    name: opts[i].option,
    value: parseInt(opts[i].subtotal),
  }
  data2.push(ans)
}
const columns = [
  {
    title: '选项',
    key: 'option',
  },
  {
    title: '小计',
    key: 'num',
  },
  {
    title: '比例',
    key: 'proportion',
  },
]
// 将数据转换为表格所需的数据格式
const createData = () => {
  const data = []
  props.qsAnswer.answers.forEach((item, index) => {
    data.push({
      key: index,
      option: item.option,
      num: item.subtotal,
      proportion: `${item.percentage}%`,
    })
  })
  return data
}
const data = createData()
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(
    document.getElementById(`${props.qsAnswer.qs_order}1`),
  )
  // 绘制图表
  myChart.setOption({
    title: {},
    tooltip: {},
    xAxis: {
      data: label,
    },
    yAxis: {},
    series: [
      {
        name: '',
        type: 'bar',
        data: data1,
      },
    ],
  })
  // 基于准备好的dom，初始化echarts实例
  const myChart2 = echarts.init(
    document.getElementById(`${props.qsAnswer.qs_order}2`),
  )
  // 绘制图表，并改变饼图的颜色
  myChart2.setOption({
    title: {},
    tooltip: {},
    series: [
      {
        name: '',
        type: 'pie', // 设置图表类型为饼图
        radius: '65%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
        data: data2, // 数据数组，name 为数据项名称，value 为数据项值
        itemStyle: {
          // 设置饼图扇形的颜色
          color(params) {
            // 自定义颜色
            const colorList = [
              '#409EFF',
              '#E6A23C',
              '#67C23A',
              '#F56C6C',
              '#5CBB7A',
              '#909399',
            ]
            return colorList[params.dataIndex]
          },
        },
      },
    ],
  })
})
</script>

<template>
  <div>
    <div class="emc-qs-title">
      <span class="qs-title">{{ props.qsAnswer.qs_order }}.{{ props.qsAnswer.qs_title }}</span>
      <span
        v-if="props.qsAnswer.qs_type === '11'"
        class="qs-tip"
      >[单选题]</span>
      <span
        v-if="props.qsAnswer.qs_type === '12'"
        class="qs-tip"
      >[多选题]</span>
    </div>
    <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="data"
    />
    <div class="tag1">
      <NTag type="error">
        表&nbsp;&nbsp;格
      </NTag>
    </div>
    <div class="ems-qs-chart">
      <span
        :id="`${props.qsAnswer.qs_order}1`"
        style="height: 300px; width: 400px"
      />
      <span
        :id="`${props.qsAnswer.qs_order}2`"
        style="height: 300px; width: 400px"
      />
    </div>
    <div class="ems-qs-footer">
      <div>
        <span>提交人数：{{ props.qsAnswer.submit_person }}</span>
      </div>
      <div>
        <NTag type="info" class="tag">
          柱状图
        </NTag>
        <NTag type="success" class="tag">
          饼&nbsp;&nbsp;图
        </NTag>
      </div>
    </div>
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
  width: 900px;
  margin: 15px auto;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;

  .tag {
    margin-left: 10px;
  }
}

.ems-qs-chart {
  margin: auto;
  width: 900px;
  height: 300px;
  border: #99a9bf 1px solid;
  display: flex;
  justify-content: space-around;
}
.n-data-table {
  width: 800px;
  margin: auto;
  border: 1px solid #99a9bf;
}
</style>
