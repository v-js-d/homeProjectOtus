import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./views/LoginPage.vue";
import ProductsPage from "./views/ProductsPage.vue";
import CreateProductPage from "./views/CreateProductPage.vue";
import BasketPage from "./views/BasketPage.vue";
import ProductPage from "./views/ProductPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "LoginPage",
      component: LoginPage,
    },
    {
      path: "/products",
      name: "ProductsPage",
      component: ProductsPage,
    },
    {
      path: "/product/:id",
      name: "ProductPage",
      component: ProductPage,
    },
    {
      path: "/create-product",
      name: "CreateProductPage",
      component: CreateProductPage,
    },
    {
      path: "/basket-page",
      name: "BasketPage",
      component: BasketPage,
    },
  ],
});
