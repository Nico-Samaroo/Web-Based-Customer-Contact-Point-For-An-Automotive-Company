<template>
  <!-- Header Section Begin -->
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="header__logo">
            <a href="./index.html"><img src="assets/img/logo.png" alt=""></a>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="header__nav">
            <nav class="header__menu">
              <ul v-if="isLoggedIn">
                <li><router-link to="/">Home</router-link></li>
                <li><a>Users</a>
                  <ul class="dropdown">
                    <li><router-link to="/user/create">Create User</router-link></li>
                    <li><router-link to="/user/list">User List</router-link></li>
                  </ul>
                </li>
                <li><a>Vehicles</a>
                  <ul class="dropdown">
                    <li><router-link to="/vehicle/create">Create Vehicle</router-link></li>
                    <li><router-link to="/vehicle/list">Vehicle List</router-link></li>
                  </ul>
                </li>
                <li><a>Appointments</a>
                  <ul class="dropdown">
                    <li><router-link to="/appointment/create">Create Appointment</router-link>
                    </li>
                    <li><router-link to="/appointment/list">Appointments</router-link></li>
                  </ul>
                </li>
                <li><a>Parts</a>
                  <ul class="dropdown">
                    <li><router-link to="/part/create">Create Part</router-link></li>
                    <li><router-link to="/part/list">Part List</router-link></li>
                  </ul>
                </li>
                <li><a>Services</a>
                  <ul class="dropdown">
                    <li><router-link to="/service/create">Create Service</router-link></li>
                    <li><router-link to="/service/list">Service List</router-link></li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div class="header__nav__widget">
              <div class="header__nav__widget__btn">
                <a href="#"><i class="fa fa-cart-plus"></i></a>
              </div>
              <router-link v-if="!isLoggedIn" to="/login" class="primary-btn">Login</router-link>
              <button v-if="isLoggedIn" class="primary-btn" @click="logUserOut">Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div class="canvas__open">
        <span class="fa fa-bars"></span>
      </div>
    </div>
  </header>
  <!-- Header Section End -->

  <div class="container">
    <div class="row">
      <div class="col-12">logged in as: </div>
    </div>
  </div>

  <router-view></router-view>

</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: 'app',
  data() {
    return {
      user: {},
      isLoggedIn: false,
      isAdmin: false
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      
      if(token) {
        let decoded = VueJwtDecode.decode(token);

        this.isLoggedIn = true;
        this.user = decoded;
        console.log(decoded);
      }
      
    },

    logUserOut() {
      localStorage.removeItem("jwt");
      this.isLoggedIn = false;
      this.$router.push({ name: "homepage" });
    }
  },
  mounted() {
    this.getUserDetails();
  }
}
</script>


