import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import type { loginResponse, User } from "../types/typesUser.ts";

export const useStoreUser = defineStore("user", () => {
  const user = ref(<User>{});

  const userName = computed(() => user.value?.username);

  const login = async (username: string, password: string) => {
    const res: loginResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/login`,
      {
        username,
        password,
      },
    );
    user.value = JSON.parse(res.config.data);
    sessionStorage.setItem("token", res.data.token);
    return res
  };

  return {
    user,
    userName,
    login,
  };
});
