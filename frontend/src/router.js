import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/homepage",
    name: "homepage",
    component: () => import("./components/HomePage.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/auth/LoginUser.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./components/auth/RegisterUser.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./components/AdminDashboard.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/customer/list",
    alias: "/customers",
    name: "list-customers",
    component: () => import("./components/customer/ListCustomers"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/customer/update/:id",
    name: "update-customer",
    component: () => import("./components/customer/UpdateCustomer"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/customer/view/:id",
    name: "view-customer",
    component: () => import("./components/customer/ViewCustomer"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/customer/create",
    name: "create-customer",
    component: () => import("./components/customer/CreateCustomer"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/vehicle/list",
    alias: "/vehicles",
    name: "list-vehicles",
    component: () => import("./components/vehicle/ListVehicles"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/vehicle/update/:id",
    name: "update-vehicle",
    component: () => import("./components/vehicle/UpdateVehicle"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/vehicle/view/:id",
    name: "view-vehicle",
    component: () => import("./components/vehicle/ViewVehicle")
  },
  {
    path: "/vehicle/create/:id?",
    name: "create-vehicle",
    component: () => import("./components/vehicle/CreateVehicle"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/appointment/list",
    alias: "/appointments",
    name: "list-appointments",
    component: () => import("./components/appointment/ListAppointments"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/appointment/update/:id",
    name: "update-appointment",
    component: () => import("./components/appointment/UpdateAppointment"),
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: "/appointment/view/:id",
  //   name: "view-appointment",
  //   component: () => import("./components/appointment/ViewAppointment")
  // },
  {
    path: "/appointment/create",
    name: "create-appointment",
    component: () => import("./components/appointment/CreateAppointment"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/part/list",
    alias: "/parts",
    name: "list-parts",
    component: () => import("./components/part/ListParts"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/part/update/:id",
    name: "update-part",
    component: () => import("./components/part/UpdatePart"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/part/create/:id?",
    name: "create-part",
    component: () => import("./components/part/CreatePart"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/service/list",
    alias: "/services",
    name: "list-services",
    component: () => import("./components/service/ListServices"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/service/update/:id",
    name: "update-service",
    component: () => import("./components/service/UpdateService"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/service/create/:id?",
    name: "create-service",
    component: () => import("./components/service/CreateService"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;