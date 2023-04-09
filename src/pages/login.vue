<script setup>
import { defineComponent, reactive, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { User } from '../api/user'

const router = useRouter()
const formRef = ref(null)
const message = useMessage()
const state = reactive({
  user: {
    name: '',
    password: '',
  },
})
const onClickLogin = () => {
  User.postLoginUser(state.user.name, state.user.password).then((res) => {
    if (res.data.data) {
      localStorage.setItem('currentUser', state.user.name)
      localStorage.setItem('userId', res.data.data.userId)
      router.push({
        name: 'home',
      })
      message.success('登录成功')
    }
    else {
      message.error('登录失败')
    }
  })
}
</script>

<template>
  <div class="login-background">
    <div class="body">
      <h1 style="text-align: center;">
        问卷调查系统登录
      </h1>
      <n-form
        ref="formRef"
        :label-width="80"
        :model="state"
        :rules="rules"
        :size="size"
      >
        <n-form-item path="user.name">
          <n-input v-model:value="state.user.name" placeholder="用户名" size="large" />
        </n-form-item>
        <n-form-item path="user.password">
          <n-input v-model:value="state.user.password" :maxlength="15" size="large" placeholder="密码" type="password" show-password-on="mousedown" />
        </n-form-item>
        <n-form-item>
          <div class="login">
            <a @click="$router.push({ name: 'register' })">
              前去注册
            </a>
            <div>
              <n-button type="success" size="large" @click="onClickLogin">
                登&nbsp;&nbsp;录
              </n-button>
            </div>
          </div>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-background {
  background: linear-gradient(-180deg, #dcf2e6 0%, #ffffff 100%);
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  .body {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    padding: 40px;
    background-color: #fdfdfd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .login {
      width: 450px;
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      a {
        color: #1890ff;
        text-decoration: none;
        cursor: pointer;
        font-size: 17px;
      }
    }
  }
}
</style>
