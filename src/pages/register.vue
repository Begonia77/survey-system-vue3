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
    password1: '',
    password2: '',
  },
})
const onClickRegister = () => {
  if (state.user.password1 !== state.user.password2) {
    message.error('注册失败，两次密码不一致')
  }
  else {
    User.postRegisterUser(state.user.name, state.user.password1).then((res) => {
      if (res.data.data) {
        localStorage.setItem('currentUser', state.user.name)
        localStorage.setItem('userId', res.data.data.userId)
        router.push({
          name: 'home',
        })
        message.success('注册成功')
      }
      else {
        message.error('注册失败')
      }
    })
  }
}
</script>

<template>
  <div class="login-background">
    <div class="body">
      <h1 style="text-align: center;">
        问卷调查系统注册
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
        <n-form-item path="user.password1">
          <n-input v-model:value="state.user.password1" :maxlength="15" size="large" placeholder="密码" type="password" show-password-on="mousedown" />
        </n-form-item>
        <n-form-item path="user.password2">
          <n-input v-model:value="state.user.password2" :maxlength="15" size="large" placeholder="确认密码" type="password" show-password-on="mousedown" />
        </n-form-item>
        <n-form-item>
          <div class="login">
            <a @click="$router.push({ name: 'login' })">
              前去登录
            </a>
            <div>
              <n-button type="info" size="large" @click="onClickRegister">
                注&nbsp;&nbsp;册
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
