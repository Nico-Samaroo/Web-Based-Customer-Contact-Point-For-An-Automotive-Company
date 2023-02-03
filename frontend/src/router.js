import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/customer/list",
    name: "list-customers",
    component: () => import("./components/customer/ListCustomers")
  },
  {
    path: "/customer/update/:id",
    name: "update-customer",
    component: () => import("./components/customer/UpdateCustomer")
  },
  {
    path: "/customer/view/:id",
    name: "view-customer",
    component: () => import("./components/customer/ViewCustomer")
  },
  {
    path: "/customer/create",
    name: "create-customer",
    component: () => import("./components/customer/CreateCustomer")
  },

  {
    path: "/vehicle/list",
    alias: "/vehicles",
    name: "list-vehicles",
    component: () => import("./components/vehicle/ListVehicles")
  },
  {
    path: "/vehicle/update/:id",
    name: "update-vehicle",
    component: () => import("./components/vehicle/UpdateVehicle")
  },
  {
    path: "/vehicle/view/:id",
    name: "view-vehicle",
    component: () => import("./components/vehicle/ViewVehicle")
  },
  {
    path: "/vehicle/create/:id?",
    name: "create-vehicle",
    component: () => import("./components/vehicle/CreateVehicle")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;