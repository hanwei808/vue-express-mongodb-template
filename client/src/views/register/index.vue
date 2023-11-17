<template>
  <el-container class="register-container">
    <el-form
      class="register-main"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      :size="formSize"
      status-icon
      @keyup.enter="submitForm(ruleFormRef)"
    >
      <h3 class="title">
        注册
      </h3>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input v-model="ruleForm.email" />
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
        <div style="width: 100%;">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            确认
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">
            重置
          </el-button>
          <el-link
            :underline="false"
            type="primary"
            @click="gotoLogin"
            style="float: right;"
          >
            登录
          </el-link>
        </div>
      </el-form-item>
    </el-form>
  </el-container>
</template>
  
  <script setup lang="ts">
  import { getCaptcha, register as apiRegister } from '@/api/user'
  import { onMounted, reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import router from '@/router/index';
  import { ElMessage } from 'element-plus';
  import type { InternalRuleItem } from 'async-validator'
  
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
    email: string
    password: string
    imgcode: string
  }
  
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    username: '',
    email: '',
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
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
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
            console.log('submit!')
            register(formEl)
        } else {
            console.log('error submit!', fields)
        }
    })
  }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }

    const gotoLogin = () => {
        router.push('/login')
    }
  
  const register = async (formEl: FormInstance | undefined) => {
  
    const { error } = await apiRegister({user: { username: ruleForm.username, email: ruleForm.email, password: ruleForm.password, imgcode: ruleForm.imgcode}})
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
      router.push('/')
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .register-container {
    background-color: white;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register-main {
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
  