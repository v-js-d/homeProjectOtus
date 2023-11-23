<template>
  <teleport to="body">
    <el-dialog
      v-model="setProp"
      :show-close="false"
      :close-on-click-modal="false"
      title="Создать новый продукт"
      style="border-radius: 15px"
      align-center
      width="500"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="90px"
        status-icon
      >
        <div class="rounded mb-5">
          <img class="rounded" :src="ruleForm.image" alt="img" />
        </div>
        <el-form-item label="Название:" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="Категория:" prop="category">
          <el-input v-model="ruleForm.category" />
        </el-form-item>
        <el-form-item label="Цена:" prop="price">
          <el-input-number v-model="ruleForm.price" :min="0" />
        </el-form-item>
        <el-form-item label="Описание:" prop="description">
          <el-input
            v-model="ruleForm.description"
            :autosize="{ minRows: 3, maxRows: 4 }"
            type="textarea"
            resize="none"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Создать
          </el-button>
          <el-button @click="closeForm(ruleFormRef)">Отменить</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </teleport>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import axios from "axios";

const props = defineProps<{
  modelValue: boolean;
}>();

interface RuleForm {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const emit = defineEmits(["update:modelValue"]);

const setProp = computed({
  get() {
    return props.modelValue;
  },
  set(mv: boolean) {
    return emit("update:modelValue", mv);
  },
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  title: "",
  price: 0,
  description: "",
  image: "https://i.pravatar.cc",
  category: "",
});

const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
  ],
  price: [
    {
      required: true,
      message: "Please input Activity surname",
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: "Please input Activity description",
      trigger: "blur",
    },
  ],
  category: [
    {
      required: true,
      message: "Please input Activity category",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const { title, price, description, image, category } = ruleForm;
      try {
        await axios.post("https://fakestoreapi.com/products", {
          title,
          price,
          description,
          image,
          category,
        });
        ElMessage({
          message: "Вы создали новый продукт",
          type: "success",
        });
        emit("update:modelValue", false);
      } catch (e) {
        ElMessage({
          message: "Что то пошло не так",
          type: "error",
        });
      }
    }
  });
};

const closeForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("update:modelValue", false);
};
</script>

<style scoped lang="scss" />
