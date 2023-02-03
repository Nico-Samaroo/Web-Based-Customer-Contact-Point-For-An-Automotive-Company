import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/",
      alias: "/customers",
      name: "customers",
      component: () => import("./components/CustomerList")
    },
    {
      path: "/Customers/:id",
      name: "Customer-details",
      component: () => import("./components/Customer")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCustomer")
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;