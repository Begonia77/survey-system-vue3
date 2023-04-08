<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TableOnly from '../components/analyse/tableOnly.vue'
import TableChart from '../components/analyse/tableChart.vue'
import { constVal } from '../util/constVal'

// 帮我分析下面的问卷，一百字左右的简要分析。
// 标题: '大学生熬夜情况调查',
//     [{单选题: : '您通常每周熬夜几次？',提交人数: 25,
//         答案: [{ 选项: '1-2',选择人数: 7,},
//           {选项: '3-5',选择人数: 16, },
//           { 选项: '6-7',选择人数: 2,},],},
//       {多选题: '您熬夜后的身体状况如何？',submit_person: 25,
//       答案: [{选项: '疲劳',选择人数: 16,},
//           { 选项: '头痛',选择人数: 10,},
//           {选项: '精神状态不佳',选择人数: 22,},], },
//       {填空题: '还会继续熬夜吗？',
//         答案: [{option: '会',},{option: '不会',},{option: '不会',},{option: '不会',},{option: '不会',},{option: '会',},{option: '可能会',},{option: '会',},{option: '应该不会',},{option: '可能会',},{option: '应该会',},{option: '可能不会',},{option: '不会',},{option: '可能不会',},{option: '会',},{option: '可能不会',},{option: '不会',},{option: '可能不会',},{option: '会',},{option: '可能会',},{option: '可能不会',},{option: '会',},{option: '会',},{option: '不知道',},{option: '可能会',}],},]

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
        qs_title: '您通常每周熬夜几次？',
        qs_type: '11',
        qs_option: [
          '1-2',
          '3-5',
          '6-7',
        ],
        submit_person: 25,
        answers: [
          {
            option: '1-2',
            subtotal: 7,
            percentage: 28,
          },
          {
            option: '3-5',
            subtotal: 16,
            percentage: 64,
          },
          {
            option: '6-7',
            subtotal: 2,
            percentage: 8,
          },
        ],
      },
      {
        qs_order: 2,
        qs_number: 2,
        qs_title: '您熬夜后的身体状况如何？',
        qs_type: '12',
        qs_option: [
          '疲劳',
          '头痛',
          '精神状态不佳',
        ],
        submit_person: 25,
        answers: [
          {
            option: '疲劳',
            subtotal: 16,
            percentage: 33,
          },
          {
            option: '头痛',
            subtotal: 10,
            percentage: 21,
          },
          {
            option: '精神状态不佳',
            subtotal: 22,
            percentage: 46,
          },
        ],
      },
      {
        qs_order: 3,
        qs_number: 3,
        qs_title: '还会继续熬夜吗？',
        qs_type: '21',
        qs_option: [
          {
            option: '会',
          },
          {
            option: '不会',
          },
          {
            option: '会',
          },
          {
            option: '可能会',
          },
          {
            option: '会',
          },
          {
            option: '会',
          },
          {
            option: '不会',
          },
          {
            option: '会',
          },
          {
            option: '会',
          },
          {
            option: '会',
          },
          {
            option: '可能会',
          },
          {
            option: '不会',
          },
          {
            option: '应该会吧',
          },
          {
            option: '可能不会',
          },
          {
            option: '应该会吧',
          },
          {
            option: '可能不会',
          },
          {
            option: '应该会吧',
          },
          {
            option: '可能不会',
          },
          {
            option: '应该会吧',
          },
          {
            option: '可能不会',
          },
          {
            option: '应该会吧',
          },
          {
            option: '可能不会',
          },
          {
            option: '应该会吧',
          },
          {
            option: '可能不会',
          },
          {
            option: '会吧',
          },
        ],
        submit_person: 25,
      },
    ],
    ansPapers: 25,
  },
})
const state = reactive({
  chatGpt: '大学生每周熬夜的次数差异较大，最多的选项是“3-5 次”，最少的选项是“6-7 次”。因此，熬夜情况在不同程度上影响了大学生的身体健康。大学生熬夜后最常见的身体状况是疲劳，其次是头痛，精神状态不佳的选项最少。这表明大学生在熬夜后，身体容易出现疲劳、头痛等症状，这可能与他们的生活习惯有关。大学生对于熬夜的态度不尽相同。其中，选择“会”的人数最多。这表明大学生对于熬夜的态度存在一定的分歧，但熬夜行为仍然存在。综上所述，大学生熬夜情况比较严重，熬夜后身体容易出现疲劳、头痛等症状，但他们对于熬夜的态度仍然存在分歧。因此，需要采取措施来引导大学生合理作息，提高生活质量。',
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
