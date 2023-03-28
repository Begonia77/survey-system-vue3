<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { clone, cloneDeep } from 'lodash-es'

const props = defineProps(['qsIndex', 'qsTitle', 'qsOptions', 'qsValue', 'qsId', 'qsLength', 'isNewQs'])

const emit = defineEmits(['delete-qs', 'move-up-qs', 'move-down-qs'])

const message = useMessage()

const state = reactive({ // 是否处于编辑模式
  isEdit: false,
  handle: false,
  isNew: props.isNewQs,
})
// 最终数据
const qsData = reactive({
  qsIndex: props.qsIndex,
  qsTitle: props.qsTitle,
  qsOptions: props.qsOptions,
  qsValue: props.qsValue,
  qsId: props.qsId,
  qsLength: props.qsLength,
})

const qsRef = ref<FormInst | null>(null)

const topicInfo = reactive({
  name: clone(qsData.qsTitle),
  options: cloneDeep(qsData.qsOptions),
})

const removeItem = (index: number) => {
  if (topicInfo.options.length > 2)
    return topicInfo.options.splice(index, 1)
  else message.warning('多选题至少有两个选项')
}

const addItem = (index: number) => {
  topicInfo.options.push({ option_id: index, content: '' })
}

// 完成编辑
const finishEdit = () => {
  qsRef.value?.validate((errors) => {
    if (!errors) {
      qsData.qsTitle = clone(topicInfo.name)
      qsData.qsOptions = cloneDeep(topicInfo.options)
      state.isEdit = !state.isEdit
    }
    else {
      // console.log(errors)
    }
  })
}

// 取消编辑
const cancelEdit = () => {
  topicInfo.name = clone(qsData.qsTitle)
  topicInfo.options = cloneDeep(qsData.qsOptions)
  state.isEdit = !state.isEdit
}

// 切换编辑模式
const switchEdit = () => {
  state.isEdit = !state.isEdit
}
// 删除题目
const deleteQs = () => {
  emit('delete-qs')
}

// 上移题目
const moveUpQs = () => {
  if (props.qsIndex === 1) {
    message.warning('到头了~')
  }
  else {
    qsData.qsIndex = qsData.qsIndex - 1
    emit('move-up-qs')
  }
}

// 下移题目
const moveDownQs = () => {
  if (props.qsIndex === props.qsLength) {
    message.warning('到底了~')
  }
  else {
    qsData.qsIndex = qsData.qsIndex + 1
    emit('move-down-qs')
  }
}

// 切换操作显示状态
const handleShow = () => {
  state.handle = true
}

defineExpose({ state })
const value = ref('')
</script>

<template>
  <div v-if="!state.isEdit && !state.isNew">
    <n-grid :x-gap="6" :cols="3" @mouseenter="handleShow" @mouseleave="state.handle = false">
      <n-grid-item :span="2">
        {{ qsIndex }}、{{ topicInfo.name }}
        <n-checkbox-group v-model:value="value" :name="qsId">
          <n-space>
            <n-checkbox
              v-for="option in qsData.qsOptions" :key="option.option_id" class="option"
              :value="option.option_id"
            >
              {{ option.content }}
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-grid-item>
      <n-grid-item :span="1" class="handle">
        <div v-show="state.handle">
          <n-button strong secondary round type="success" @click="switchEdit()">
            编辑
          </n-button>
          <n-button strong secondary round type="error" @click="deleteQs()">
            删除
          </n-button>
        </div>
        <div v-show="state.handle">
          <n-button strong secondary round type="info" @click="moveUpQs()">
            上移
          </n-button>
          <n-button strong secondary round type="info" @click="moveDownQs()">
            下移
          </n-button>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
  <div v-else>
    <n-divider />
    <n-form
      ref="qsRef" :model="topicInfo" :style="{ width: '500px', padding: '20px 0 0 0' }" label-placement="left"
      label-width="auto"
    >
      <n-form-item
        label="题目[多选]" path="name" :rule="{
          required: true,
          message: '请输入题目',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input v-model:value="topicInfo.name" placeholder="请输入题目" clearable />
      </n-form-item>

      <n-form-item
        v-for="(item, index) in topicInfo.options" :key="index" :label="`选项${index + 1}`"
        :path="`options[${index}].content`" :rule="{
          required: true,
          message: `请输入选项${index + 1}`,
          trigger: ['input', 'blur'],
        }"
      >
        <n-input v-model:value="item.content" clearable placeholder="请输入选项内容" />
        <n-button style="margin-left: 12px" @click="removeItem(index)">
          删除
        </n-button>
      </n-form-item>

      <n-form-item class="editHandel">
        <n-space>
          <n-button type="success" @click="finishEdit">
            完成编辑
          </n-button>
          <n-button type="info" @click="addItem(topicInfo.options.length + 1)">
            增加选项
          </n-button>
          <n-button v-show="!state.isNew" type="error" @click="cancelEdit()">
            取消编辑
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
    <n-divider />
  </div>
</template>

<style lang="scss" scoped>
.option {
  // display: block;
  margin: 5px 0 0px 10px;
  width: 500px;
}

.handle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  .n-button {
    margin-left: 18px;
    margin-bottom: 10px;
  }
}
.editHandel {
  display: flex;
  justify-content: center;
}
.n-grid {
  min-height: 90px;
}
</style>
