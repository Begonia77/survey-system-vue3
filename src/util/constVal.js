import RadioQuestion from '../components/RadioQuestion.vue'
import CheckboxQuestion from '../components/CheckboxQuestion.vue'
import ShortAnswerQuestion from '../components/ShortAnswerQuestion.vue'
import LongAnswerQuestion from '../components/LongAnswerQuestion.vue'
import TableOnly from '../components/analyse/tableOnly.vue'
import TableChart from '../components/analyse/tableChart.vue'

// 问卷状态
const UN_PUBLISH = { desc: '未发布', value: 0 }
const IS_PUBLISH = { desc: '已发布', value: 1 }
const IS_STOP = { desc: '已结束', value: 2 }

// 0为判断 1为单选 2为多选 3为单行填空 4为多行填空
// 问卷类型
const qsTypeMap = new Map()
qsTypeMap.set(1, { desc: '单选题', value: 1, comp: RadioQuestion })
qsTypeMap.set(2, { desc: '多选题', value: 2, comp: CheckboxQuestion })
qsTypeMap.set(3, { desc: '单行填空', value: 3, comp: ShortAnswerQuestion })
qsTypeMap.set(4, { desc: '多行填空', value: 4, comp: LongAnswerQuestion })

const analysisTypeMap = new Map()
analysisTypeMap.set(0, { desc: '只有表格', value: 0, comp: TableOnly })
analysisTypeMap.set(1, { desc: '三个图', value: 1, comp: TableChart })
// const baseUrl = 'http://survey.wryte.top:53368/#'
const baseUrl = 'http://127.0.0.1:5173/#'

export const constVal = {
  qsTypeMap,
  analysisTypeMap,
  UN_PUBLISH,
  IS_PUBLISH,
  IS_STOP,
  baseUrl,
}
