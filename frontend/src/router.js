import { createWebHistory, createRouter } from "vue-router";
import VueJwtDecode from "vue-jwt-decode";
import swal from 'sweetalert';


const token = localStorage.getItem("jwt");

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
    component: () => import("./components/NotAuthorized.vue"),
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
      requiresAuth: true,
      
    }
  },
  {
    path: "/customer/view/:id",
    name: "view-customer",
    component: () => import("./components/customer/ViewCustomer"),
    meta: {
      requiresAuth: true,
      
    }
  },
  {
    path: "/customer/create",
    name: "create-customer",
    component: () => import("./components/customer/CreateCustomer"),
    meta: {
      requiresAuth: true,
      
    }
  },


  {
    path: "/cart/list",
    alias: "/cart",
    name: "list-cart",
    component: () => import("./components/cart/ListCart"),
    meta: {
      requiresAuth: true,
      
    }
  },
  
  {
    path: "/user/list",
    alias: "/users",
    name: "list-users",
    component: () => import("./components/user/ListUsers"),
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/user/update/:id",
    name: "update-user",
    component: () => import("./components/user/UpdateUser"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/user/view/:id",
    name: "view-user",
    component: () => import("./components/user/ViewUser"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/user/create",
    name: "create-user",
    component: () => import("./components/user/CreateUser"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/user/email/:id",
    name: "email-user",
    component: () => import("./components/user/EmailUser"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin || user.technician) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },

  {
    path: "/vehicle/list",
    alias: "/vehicles",
    name: "list-vehicles",
    component: () => import("./components/vehicle/ListVehicles"),
    meta: {
      requiresAuth: true,
      
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin || user.technician) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/vehicle/update/:id",
    name: "update-vehicle",
    component: () => import("./components/vehicle/UpdateVehicle"),
    meta: {
      requiresAuth: true,
      
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/vehicle/view/:id",
    name: "view-vehicle",
    component: () => import("./components/vehicle/ViewVehicle"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/vehicle/create/:id?",
    name: "create-vehicle",
    component: () => import("./components/vehicle/CreateVehicle"),
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: "/appointment/list",
    alias: "/appointments",
    name: "list-appointments",
    component: () => import("./components/appointment/ListAppointments"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin || user.technician) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/appointment/update/:id",
    name: "update-appointment",
    component: () => import("./components/appointment/UpdateAppointment"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
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
      requiresAuth: true,
    }
  },

  {
    path: "/part/list",
    alias: "/parts",
    name: "list-parts",
    component: () => import("./components/part/ListParts"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin || user.technician) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/part/update/:id",
    name: "update-part",
    component: () => import("./components/part/UpdatePart"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/part/create/:id?",
    name: "create-part",
    component: () => import("./components/part/CreatePart"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },

  {
    path: "/service/list",
    alias: "/services",
    name: "list-services",
    component: () => import("./components/service/ListServices"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/service/update/:id",
    name: "update-service",
    component: () => import("./components/service/UpdateService"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/service/create/:id?",
    name: "create-service",
    component: () => import("./components/service/CreateService"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },


  {
    path: "/rental/list",
    alias: "/rentals",
    name: "list-rentals",
    component: () => import("./components/rental/ListRentals"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/history",
    name: "history",
    component: () => import("./components/History"),
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: "/quote/list",
    alias: "/quotes",
    name: "list-quotes",
    component: () => import("./components/quote/ListQuotes"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {      
      if(token) {
        let user = VueJwtDecode.decode(token);

        if(user.admin || user.technician) {
          next();
        } else {
          swal({
            title: "Unauthorized",
            text: "Page restriction does't allow you to view it!",
            icon: "info",
          })
          next({
            name: 'dashboard'
          })
        }
      } else {
        next({
          name: "dashboard"
        })
      }
    }
  },
  {
    path: "/quote/create/:id?",
    name: "create-quote",
    component: () => import("./components/quote/CreateQuote"),
    meta: {
      requiresAuth: true,
    }
  },
  // {
  //   path: "/rental/update/:id",
  //   name: "update-rental",
  //   component: () => import("./components/rental/UpdateRental"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/rental/view/:id",
  //   name: "view-rental",
  //   component: () => import("./components/rental/ViewRental"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/rental/create",
  //   name: "create-rental",
  //   component: () => import("./components/rental/CreateRental"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/cart/update/:id",
  //   name: "update-cart",
  //   component: () => import("./components/cart/UpdateCart"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/cart/view/:id",
  //   name: "view-cart",
  //   component: () => import("./components/cart/ViewCart"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/cart/create",
  //   name: "create-cart",
  //   component: () => import("./components/cart/CreateCart"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

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