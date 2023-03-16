<script setup>
import logo from "../../assets/logo.png";
import { defineComponent, h, ref } from "vue";
import { RouterLink } from "vue-router";

const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "home",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "首页" }
    ),
    key: "go-back-home",
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "model",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "模板中心" }
    ),
    key: "go-back-model",
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "paper",
          params: {
            lang: "zh-CN"
          }
        }
      },
      { default: () => "我的问卷" }
    ),
    key: "go-back-paper",
  },
];
const activeKey = ref(null)

</script>

<template>
  <n-grid x-gap="12" :cols="10">
    <n-grid-item :span="1">
      <n-image class="logo" fit="fill" :src="logo" />
    </n-grid-item>
    <n-grid-item :span="8">
      <n-menu class="cen" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </n-grid-item>
    <n-grid-item :span="1">
      <div v-if="!getUserName" class="cen">
        <span @click="$router.push('/login')">登录 </span>
        <span>|</span>
        <span @click="$router.push('/register')"> 注册</span>
      </div>
    </n-grid-item>
    <!-- <n-grid-item :span="1">
          <el-dropdown v-else @command="handleCommand" class="admin">
            <span class="el-dropdown-link">
              {{ getUserName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </n-grid-item> -->

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

.logo {
  // margin-left: 25px;
  height: 30px;
  width: 30px;
  margin: 15px 30px;
}
::v-deep .n-menu.n-menu--horizontal .n-menu-item-content .n-menu-item-content-header a {
    color: #fff;
}
::v-deep .n-menu.n-menu--horizontal .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header a {
    color: var(--n-item-text-color-active-horizontal);
}
</style>
