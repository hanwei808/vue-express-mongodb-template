<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
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
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            v-model="ruleForm.imgcode"
            placeholder="请输入验证码"
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { getCaptcha, login as aLogin } from '@/api/user'
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router/index';
import { ElMessage } from 'element-plus';

const captcha = ref('')

onMounted(() => {
  loadCaptcha()
})

const loadCaptcha = async () => {
  const res = await getCaptcha()
  if (res.code === 0) captcha.value = URL.createObjectURL(new Blob([res.data], { type: 'image/svg+xml' }))
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

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
      if (valid) {
          console.log('submit!')
          login()
      } else {
          console.log('error submit!', fields)
      }
  })
}

const login = async () => {

  let res = await aLogin({user: { username: ruleForm.username, password: ruleForm.password, imgcode: ruleForm.imgcode}})
  if (res.code === 0) {
    ElMessage.success('登录成功')
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.imgcode-wrap {
  display: flex;
  align-items: center;
  .imgcode {
    height: 37px;
  }
}
</style>
