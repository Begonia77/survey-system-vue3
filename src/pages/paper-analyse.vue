<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TableOnly from '../components/analyse/tableOnly.vue'
import TableChart from '../components/analyse/tableChart.vue'
import { constVal } from '../util/constVal'

const router = useRouter()
const paper = reactive({
  list: {
    paper_id: 'qOAQHmBl',
    qs_count: 8,
    title: '大学生熬夜情况调查',
    content: [
      {
        qs_id: '',
        qs_order: 1,
        qs_number: 1,
        qs_title: '一周熬夜次数:',
        qs_type: '11',
        qs_option: [
          '1-2',
          '3-5',
          '6-7',
        ],
        submit_person: 5,
        answers: [
          {
            option: '1-2',
            subtotal: 3,
            percentage: 60,
          },
          {
            option: '3-5',
            subtotal: 1,
            percentage: 20,
          },
          {
            option: '6-7',
            subtotal: 1,
            percentage: 20,
          },
        ],
      },
      {
        qs_order: 2,
        qs_number: 2,
        qs_title: '熬夜的原因？',
        qs_type: '12',
        qs_option: [
          '开心',
          '习惯',
          '有事',
        ],
        submit_person: 5,
        answers: [
          {
            option: '开心',
            subtotal: 3,
            percentage: 60,
          },
          {
            option: '习惯',
            subtotal: 3,
            percentage: 60,
          },
          {
            option: '有事',
            subtotal: 3,
            percentage: 60,
          },
        ],
      },
      {
        qs_order: 3,
        qs_number: 3,
        qs_title: '还要继续熬夜吗？',
        qs_type: '21',
        qs_option: [
          {
            option: '要的哇',
          },
          {
            option: '不了不了',
          },
          {
            option: '撒发生',
          },
          {
            option: '啊风格',
          },
          {
            option: '阿飞去',
          },
        ],
        submit_person: 5,
      },
    ],
    ansPapers: 5,
  },
})
const state = reactive({
  chatGpt: '你的熬夜情况如何？这是一个测试问卷，希望你能认真填写，谢谢！这是一份问卷分析报告，希望你能认真阅读，谢谢！你的熬夜情况如何？这是一个测试问卷，希望你能认真填写，谢谢！这是一份问卷分析报告，希望你能认真阅读，谢谢！你的熬夜情况如何？这是一个测试问卷，希望你能认真填写，谢谢！这是一份问卷分析报告，希望你能认真阅读，谢谢！你的熬夜情况如何？这是一个测试问卷，希望你能认真填写，谢谢！这是一份问卷分析报告，希望你能认真阅读，谢谢！',
})
const ansList = []
for (const item of paper.list.content) {
  if (item.qs_type !== '21')
    ansList.push({ key: item.qs_order, name: 1 })
  else ansList.push({ key: item.qs_order, name: 0 })
}
// export default {
//   name: 'PaperAnalyse',
//   components: { TableChart, TableOnly },
//   data() {
//     return {
//       title: '',
//       answer: [],
//       ansList: [],
//     }
//   },
//   created() {
//     const paperId = this.$route.params.id
//     const paper = dataSource.getPaperById(paperId)
//     this.title = paper.title
//     const questions = paper.content.sort((a, b) => a.qs_order - b.qs_order)
//     this.answer = questions

//     // 构造题目组件列表
//     for (const item of questions) {
//       if (
//         item.qs_type === this.QS_TYPE.SELECT_RADIO.value
//         || item.qs_type === this.QS_TYPE.SELECT_MULTI.value
//         || item.qs_type === this.QS_TYPE.SELECT_DROP.value
//       )
//         this.ansList.push({ key: item.qs_order, name: 'TableChart' })
//       else this.ansList.push({ key: item.qs_order, name: 'TableOnly' })
//     }
//   },
// }
// 返回上一级
const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div>
    <n-layout-header>
      <n-grid :cols="24">
        <n-grid-item :span="4" class="goback">
          <a @click="goBack()">返回</a>
        </n-grid-item>
        <n-grid-item :span="16" class="title">
          <span>问卷统计与分析</span>
        </n-grid-item>
      </n-grid>
    </n-layout-header>
    <div class="edit-main">
      <div class="edit-main-title">
        <span>{{ paper.list.title }}(报告)</span>
      </div>
      <div class="gpt">
        <div v-if="state.chatGpt">
          以下是基于您的问卷结果的分析报告：
          <div>
            {{ state.chatGpt }}
          </div>
        </div>
        <div v-else>
          等待返回问卷分析结果
        </div>
      </div>
      <div class="edit-main-content">
        <div v-for="(ans, index) in ansList" :key="ans.key">
          <component :is="constVal.analysisTypeMap.get(ansList[index].name).comp" :qs-answer="paper.list.content[index]" />
        </div>
      </div>
      <br>
      <n-divider />
      <div style="height: 60px; line-height: 60px; text-align: center">
        <span>我是可是有底线的~</span>
      </div>
    </div>
  </div>
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
}
.edit-main {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: calc(100vh - 60px);
  width: 70%;
  margin: 0 auto;
  overflow: auto;
  overflow-x: hidden;

  /*问卷标题区*/
  .edit-main-title {
    text-align: center;
    padding: 15px 0;

    span {
      font-weight: bolder;
      font-size: larger;
    }
  }

}
.gpt {
  padding: 10px 20px;
  font-size: 16px;
  line-height: 30px;
  width: 90%;
  margin: 10px auto;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>
