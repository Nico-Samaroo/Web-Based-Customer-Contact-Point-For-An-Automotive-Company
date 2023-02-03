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
  },

  {
    path: "/appointment/list",
    alias: "/appointments",
    name: "list-appointments",
    component: () => import("./components/appointment/ListAppointments")
  },
  // {
  //   path: "/appointment/update/:id",
  //   name: "update-appointment",
  //   component: () => import("./components/appointment/UpdateAppointment")
  // },
  // {
  //   path: "/appointment/view/:id",
  //   name: "view-appointment",
  //   component: () => import("./components/appointment/ViewAppointment")
  // },
  {
    path: "/appointment/create/:id?",
    name: "create-appointment",
    // component: () => import("./components/appointment/CreateAppointment")
  },

  {
    path: "/part/list",
    alias: "/parts",
    name: "list-parts",
    component: () => import("./components/part/ListParts")
  },
  {
    path: "/part/update/:id",
    name: "update-part",
    component: () => import("./components/part/UpdatePart")
  },
  {
    path: "/part/create/:id?",
    name: "create-part",
    component: () => import("./components/part/CreatePart")
  },

  {
    path: "/service/list",
    alias: "/services",
    name: "list-services",
    component: () => import("./components/service/ListServices")
  },
  {
    path: "/service/update/:id",
    name: "update-service",
    component: () => import("./components/service/UpdateService")
  },
  {
    path: "/service/create/:id?",
    name: "create-service",
    component: () => import("./components/service/CreateService")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;