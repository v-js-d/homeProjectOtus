<template>
  <teleport to="body">
    <el-dialog
      v-model="setProp"
      :show-close="false"
      :close-on-click-modal="false"
      title="Новый заказ"
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
        @submit.prevent="submitForm(ruleFormRef)"
      >
        <el-form-item label="Имя:" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Фамилия:" prop="surname">
          <el-input v-model="ruleForm.surname" />
        </el-form-item>
        <el-form-item label="E-mail:" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="Телефон:" prop="telephone">
          <el-input v-model="ruleForm.telephone" />
          <span class="text-xs">Пример: +7XXXXXXXXXX</span>
        </el-form-item>
        <el-form-item label="Город:" prop="city">
          <el-input v-model="ruleForm.city" />
        </el-form-item>
        <el-form-item label="Адрес:" prop="address">
          <el-input v-model="ruleForm.address" />
        </el-form-item>
        <el-form-item label="Дата:" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleForm.date1"
                type="date"
                placeholder="Дата"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="ruleForm.date2"
                placeholder="Время"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-checkbox
            v-model="ruleForm.agreement"
            label="Cогласие с правилами обработки заказа"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="!ruleForm.agreement"
            native-type="submit"
          >
            Заказать
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
  name: string;
  surname: string;
  email: string;
  telephone: string;
  city: string;
  address: string;
  date1: string;
  date2: string;
  agreement: boolean;
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
  name: "",
  surname: "",
  email: "",
  telephone: "",
  city: "",
  address: "",
  date1: "",
  date2: "",
  agreement: false,
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
  ],
  surname: [
    {
      required: true,
      message: "Please input Activity surname",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Please input Activity surname",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Enter the correct e-mail",
      trigger: "blur",
    },
  ],
  telephone: [
    {
      required: true,
      message: "Please input Activity telephone",
      trigger: "blur",
      pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    },
  ],
  city: [
    {
      required: true,
      message: "Please input Activity city",
      trigger: "blur",
    },
  ],
  address: [
    {
      required: true,
      message: "Please input Activity address",
      trigger: "blur",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const { name, surname, telephone, city, address, date1, date2 } =
        ruleForm;
      try {
        await axios.post("https://httpbin.org/anything", {
          name,
          surname,
          telephone,
          city,
          address,
          date1,
          date2,
        });
        emit("update:modelValue", false);
        ElMessage({
          message: "Заказ оформлен",
          type: "success",
        });
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
