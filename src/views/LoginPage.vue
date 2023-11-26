<template>
  <div class="flex items-center justify-center">
    <el-card class="w-[500px]">
      <h1>login</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        size="large"
        label-position="top"
        status-icon
        @submit.prevent="submitForm(ruleFormRef)"
      >
        <el-form-item label="Name" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="success" native-type="submit">
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

interface RuleForm {
  username: string;
  password: string;
}

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  username: "mor_2314",
  password: "83r5^_",
});

const rules = reactive<FormRules<RuleForm>>({
  username: [
    {
      required: true,
      message: "Обязательное поле для заполнения",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Обязательное поле для заполнения",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      console.log("submit!");
      const { username, password } = ruleForm;
      try {
        const res = await axios.post("https://fakestoreapi.com/auth/login", {
          username,
          password,
        });
        localStorage.setItem("login", "true");
        localStorage.setItem("token", res.data.token);
        await router.push("/products");
      } catch (e) {
        ElMessage({
          message: "Что то пошло не так",
          type: "error",
        });
      }
    }
  });
};
</script>

<style scoped lang="scss" />
