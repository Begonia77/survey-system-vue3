<script setup>
import { defineComponent, h, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import logo from '../../assets/logo.png'
import logo2 from '../../assets/logo2.png'

const router = useRouter()
const message = useMessage()
const state = reactive({
  currentUser: localStorage.getItem('currentUser'),
  activeKey: null,
  userHandle: [
    {
      label: '退出登录',
      key: 1,
    },
  ],
})

const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'home',
          params: {
            lang: 'zh-CN',
          },
        },
      },
      { default: () => '首页' },
    ),
    key: 'go-back-home',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'model',
          params: {
            lang: 'zh-CN',
          },
        },
      },
      { default: () => '模板中心' },
    ),
    key: 'go-back-model',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'paper',
          params: {
            lang: 'zh-CN',
          },
        },
      },
      { default: () => '我的问卷' },
    ),
    key: 'go-back-paper',
  },
]

// 退出登录
const logout = () => {
  localStorage.removeItem('currentUser')
  localStorage.removeItem('userId')
  state.currentUser = null
  state.activeKey = null
  router.push({
    name: 'home',
  })
}

const handleSelect = (key) => {
  if (key === 1) {
    logout()
    message.success('退出成功')
  }
}
</script>

<template>
  <n-grid x-gap="12" :cols="10">
    <n-grid-item :span="2">
      <div class="logo111">
        <n-image class="logo2" fit="fill" :src="logo2" />
      </div>
    </n-grid-item>
    <n-grid-item :span="1">
      <div class="logo111">
        <n-image class="logo" fit="fill" :src="logo" />
      </div>
    </n-grid-item>
    <n-grid-item :span="4">
      <n-menu v-model:value="state.activeKey" style="font-size: 18px;" class="cen" mode="horizontal" :options="menuOptions" />
    </n-grid-item>
    <n-grid-item :span="3">
      <div v-if="state.currentUser" class="cen" style="padding-left: 70px">
        <n-dropdown trigger="click" :options="state.userHandle" @select="handleSelect">
          <a style="border: none; color: #fff; font-size: 18px;">欢迎您！{{ state.currentUser }}
          </a>
        </n-dropdown>
      </div>
      <div v-else class="cen" style="padding-left: 70px">
        <a @click="$router.push('/login')">登录 </a>
        <span style="padding: 0 5px;">|</span>
        <a @click="$router.push('/register')"> 注册</a>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style lang="scss" scoped>
.cen {
  // 让里面的文字居中展示
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;

  .n-menu-item {
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
a {
  // 变成手指
  cursor: pointer;
}
.logo111 {
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 90px;
}
.logo {
  // margin-left: 25px;
  height: 60px;
  width: 60px;
  // margin: 15px 30px;
}
.logo2 {
  // margin-left: 25px;
  height: 40px;
  width: 40px;
  margin: 8px 5px;
}

::v-deep .n-menu.n-menu--horizontal .n-menu-item-content .n-menu-item-content-header a {
  color: #fff;
}

::v-deep .n-menu.n-menu--horizontal .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header a {
  color: var(--n-item-text-color-active-horizontal);
}
</style>
