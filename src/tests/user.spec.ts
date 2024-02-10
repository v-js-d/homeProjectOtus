import { describe, beforeEach, it, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useStoreUser } from "../store/user";
import axios from "axios";

describe("useStoreUser", () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
  });

  it("initial store is empty", () => {
    const store = useStoreUser()
    expect(store.user).toMatchObject({})
  })

  it("make a POST request to login user", async () => {
    const store = useStoreUser()

    const userLogin = {
      username: "mor_2314",
      password: "83r5^_",
    }

    const responseData = {
      config: {
        data: JSON.stringify({
          username: "mor_2314",
          password: "83r5^_",
        })
      },
      data: { token: "sometoken" },
    };

    axios.post = vi.fn().mockResolvedValue(responseData)

    const user = await store.login(userLogin.username, userLogin.password)
    expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}/auth/login`, userLogin)
    expect(user).toStrictEqual(responseData)
    expect(sessionStorage.getItem("token")).toEqual("sometoken")
    const token = sessionStorage.getItem("token");
    expect(token).toBeTruthy()
  })
})
