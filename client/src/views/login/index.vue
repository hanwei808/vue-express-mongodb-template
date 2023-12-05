<template>
  <el-container class="login-container">
    <el-form
      class="login-main"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      :size="formSize"
      status-icon
      @keyup.enter="submitForm(ruleFormRef)"
    >
      <h3 class="title">
        登录
      </h3>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        prop="imgcode"
        ref="imgcodeRef"
      >
        <div class="imgcode-wrap">
          <el-input
            v-model="ruleForm.imgcode"
            placeholder="请输入验证码"
            @input="imgcodeInput(ruleFormRef)"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-key" />
            </template>
          </el-input>
          <img
            alt="验证码"
            :src="captcha"
            @click="loadCaptcha"
          >
        </div>
      </el-form-item>
  
      <el-form-item>
        <div style="display: flex;align-items: center;justify-content: space-around;width: 100%;">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
          <el-button
            @click="router.push('/register')"
            type="primary"
            link
          >
            注册
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script setup lang="ts">
import { getCaptcha, login as aLogin } from '@/api/user'
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router/index';
import { ElMessage, ElFormItem } from 'element-plus';
import type { InternalRuleItem } from 'async-validator'
import { useStore } from '@/store'
import { setAccessToken, setRefreshToken } from '@/utils/storage'

const store = useStore()


const imgcodeRef = ref<InstanceType<typeof ElFormItem> | null>(null)

const captcha = ref('')
const imgcode_err = ref('')

onMounted(() => {
  loadCaptcha()
})

const loadCaptcha = async () => {
  const { response } = await getCaptcha()
  captcha.value = URL.createObjectURL(new Blob([response as unknown as Blob], { type: 'image/svg+xml' }))
}

interface RuleForm {
  username: string
  password: string
  imgcode: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  imgcode: ''
})

const customValidator = (
  _rule: InternalRuleItem,
  _value: string,
  callback: (error?: string | Error) => void
) => {
  if (imgcode_err.value) {
    callback(new Error(imgcode_err.value))
  } else {
    callback()
  }
};

const imgcodeInput = (formEl: FormInstance | undefined) => {
  imgcode_err.value = ''
  if (formEl) {
    formEl.clearValidate('imgcode')
  }
}

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: customValidator }
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
      if (valid) {
          login(formEl)
      } else {
          console.log('error submit!', fields)
      }
  })
}

const login = async (formEl: FormInstance | undefined) => {

  const { error, response } = await aLogin({user: { username: ruleForm.username, password: ruleForm.password, imgcode: ruleForm.imgcode}})
  if (error) {
    if (error?.code === 401) {
      imgcode_err.value = error.message
      if (formEl) {
        formEl.validateField('imgcode', () => {
          loadCaptcha()
        })
      }
    }
  } else {
    ElMessage.success('登录成功')
    setAccessToken(response?.accessToken)
    setRefreshToken(response?.refreshToken)
    store.commit('setUser', response?.user)
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-main {
  width: 500px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.imgcode-wrap {
  display: flex;
  align-items: center;
  .imgcode {
    height: 37px;
  }
}

</style>
