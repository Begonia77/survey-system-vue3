<script setup>
import { reactive } from 'vue'
import { NButton, NCarousel, NImage } from 'naive-ui'
import modelJpg from '../assets/model.jpg'
import typePng from '../assets/type.png'
import paperJpg from '../assets/paper.jpg'
import allJpg from '../assets/all.jpg'
import tableJpg from '../assets/table.jpg'
import chat1Jpg from '../assets/chat1.png'
import chat2Jpg from '../assets/chat2.png'

const state = reactive({
  userCount: '20',
  paperCount: '40',
})
</script>

<template>
  <div class="main-container">
    <div class="home-title">
      <div class="ht-1">
        智能问卷系统
      </div>
      <div class="ht-2">
        <div>为有问卷调查需求的人们提供多方位的服务</div>
        <div>内置chatGPT返回随机问题，供用户挑选</div>
        <div>使用chatGPT进行智能分析问卷，使用户更了解被调查者的需求与情况</div>
      </div>
      <NButton
        type="info"
        style="width: 15%; height: 50px; background: #067bef"
        @click="$router.push({ name: 'paper' })"
      >
        <span style="font-size: larger">开始体验&nbsp;&nbsp;<i
          style="font-weight: bolder"
          class="el-icon-right"
        /></span>
      </NButton>
    </div>
    <div class="home-main">
      <NImage object-fit="contain" :src="modelJpg" />
      <div class="hm-txt">
        <div class="hm-txt-1">
          <span>海量模板 开箱即用</span>
        </div>
        <div class="hm-txt-2">
          <span>所有用户均可将自己的问卷创建为模板，供他人使用<br>所有模板免费公开，面向所有用户</span>
        </div>
        <div>
          <NButton
            type="info"
            style="justify-content: center;
                margin-top: 20px;
                width: 50%;
                height: 50px;
                background: white;
                color: cornflowerblue;"
            @click="$router.push({ name: 'model' })"
          >
            <span style="font-size: larger">浏览模板&nbsp;&nbsp;<i
              style="font-weight: bolder"
              class="el-icon-right"
            /></span>
          </NButton>
        </div>
      </div>
    </div>
    <div class="home-main">
      <div class="hm-txt">
        <div class="hm-txt-1">
          <span>各种题型 任您选择</span>
        </div>
        <div class="hm-txt-2">
          <span>提供选择和填空两类基本题型<br>以及多种个人信息快捷题型，无需编辑，即插即用</span>
        </div>
      </div>
      <NImage object-fit="contain" width="200" :src="typePng" />
      <NImage object-fit="contain" width="250" :src="allJpg" />
    </div>
    <div class="home-main">
      <NImage object-fit="contain" width="800" :src="paperJpg" />
      <div class="hm-txt">
        <div class="hm-txt-1">
          <span>操作直观 功能丰富</span>
        </div>
        <div class="hm-txt-2">
          <span>可以随心管理自己的问卷<br>预览、编辑、发布、删除等功能应有尽有</span>
        </div>
      </div>
    </div>
    <div class="home-main">
      <div class="hm-txt">
        <div class="hm-txt-1">
          <span>所有数据 尽收眼底</span>
        </div>
        <div class="hm-txt-2">
          <span>对不同题型提供多样的统计方式<br>有适用于填空的表格和适用于选择的图表等</span>
        </div>
      </div>
      <NCarousel autoplay>
        <img
          class="carousel-img"
          :src="tableJpg"
        >
        <img
          class="carousel-img"
          :src="chat1Jpg"
        >
        <img
          class="carousel-img"
          :src="chat2Jpg"
        >
      </NCarousel>
    </div>
    <div class="home-footer">
      <span class="hf-txt">平台用户数量已达到<span class="hf-num">{{ state.userCount }}</span>人次<br>总计问卷调查数量<span class="hf-num">{{ state.paperCount }}</span>份，真诚期待您的加入！</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-img {
  height: 250px;
  width: 800px;
  object-fit: contain;
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.n-carousel {
  width: 800px;
}
.home-title {
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ht-1 {
    font-size: 50px;
    font-weight: 700;
    padding-bottom: 20px;
    color: #303133;
  }

  .ht-2 {
    font-size: 25px;
    font-weight: 500;
    color: #99a9bf;
    padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
}

.home-main {
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
  .hm-txt {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .hm-txt-1 {
      font-weight: 600;
      font-size: 40px;
      padding-bottom: 20px;
    }

    .hm-txt-2 {
      font-size: 20px;
      font-weight: 500;
      color: #99a9bf;
    }
  }
}

.home-footer {
  margin-top: 100px;
  margin-bottom: 70px;
  height: 200px;
  //background: #1e649f;
  .hf-txt {
    color: #1e649f;
    font-size: 50px;
    font-weight: 600;
  }
  .hf-num {
    padding: 0 10px;
    color: #dd6161;
    font-size: 60px;
    font-weight: 700;
  }
}
</style>
