import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export type User = {
  username: string;
  password: string;
};

export type loginResponse = {
  config: {
    data: string;
  };
  data: {
    token: string;
  };
};

export const useStoreUser = defineStore("user", () => {
  const user = ref<User>();

  const userName = computed(() => user.value?.username);

  const login = async (username: string, password: string) => {
    const res: loginResponse = await axios.post(
      "https://fakestoreapi.com/auth/login",
      {
        username,
        password,
      },
    );
    user.value = JSON.parse(res.config.data);
    sessionStorage.setItem("token", res.data.token);
  };

  return {
    user,
    userName,
    login,
  };
});
