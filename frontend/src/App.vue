<template>
  <div class="offcanvas-menu-overlay"></div>
  <div class="offcanvas-menu-wrapper">
    <div class="offcanvas__widget">
      <a href="#"><i class="fa fa-cart-plus"></i></a>
      <a href="#" class="search-switch"><i class="fa fa-search"></i></a>
      <a href="#" class="primary-btn">Add Car</a>
    </div>
    <div class="offcanvas__logo">
      <router-link to="/"><img src="assets/img/logo.png" alt=""></router-link>
    </div>
    <div id="mobile-menu-wrap"></div>
    <ul class="offcanvas__widget__add">
      <li><i class="fa fa-clock-o"></i> Week day: 08:00 am to 5:00 pm</li>
      <li><i class="fa fa-envelope-o"></i> n_auto_business@gmail.com</li>
    </ul>
    <div class="offcanvas__phone__num">
      <i class="fa fa-phone"></i>
      <span>(+1 868) 333 1870</span>
    </div>
    <div class="offcanvas__social">
      <a href="#"><i class="fa fa-facebook"></i></a>
      <a href="#"><i class="fa fa-twitter"></i></a>
      <a href="#"><i class="fa fa-google"></i></a>
      <a href="#"><i class="fa fa-instagram"></i></a>
    </div>
  </div>
  <!-- Offcanvas Menu End -->

  <!-- Header Section Begin -->
  <header class="header">
    <div v-if="!isLoggedIn" class="header__top">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <ul class="header__top__widget">
              <li><i class="fa fa-clock-o"></i> Week day: 08:00 am to 5:00 pm</li>
              <li><i class="fa fa-envelope-o"></i> n_auto_business@gmail.com</li>
            </ul>
          </div>
          <div class="col-lg-5">
            <div class="header__top__right">
              <div class="header__top__phone">
                <i class="fa fa-phone"></i>
                <span>(+1 868) 333 1870</span>
              </div>
              <div class="header__top__social">
                <a href="https://www.facebook.com/ronstt/"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-google"></i></a>
                <a href="#"><i class="fa fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="header__logo">
            <router-link to="/"><img src="assets/img/logo.png" alt=""></router-link>
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
                    <!-- <li><router-link to="/rental/create">Create Rental</router-link></li> -->
                    <li><router-link to="/rental/list">Rentals</router-link></li>
                  </ul>
                </li>
                <li><a>Appointments</a>
                  <ul class="dropdown">
                    <li><router-link to="/appointment/create">Create Appointment</router-link></li>
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
                <li><a>Quotes</a>
                  <ul class="dropdown">
                    <li><router-link to="/quote/create">Create Quote</router-link></li>
                    <li><router-link to="/quote/list">Quote List</router-link></li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div class="header__nav__widget">
              <div class="header__nav__widget__btn">
                <router-link to="/history"><i class="fa fa-history"></i></router-link>
              </div>
              <div class="header__nav__widget__btn">
                <a @click="getCart"><i class="fa fa-cart-plus"></i></a>
              </div>
              <!-- <span v-if="isLoggedIn" class="navbar-text">
                              {{ user.first_name +' '+ user.last_name }}
                            </span> -->
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

  <div v-if="isLoggedIn" class="container">
    <div class="row">
      <div class="col-12 text-center mb-4">
        Logged in as: <strong>{{ user.name }}</strong><br>
        {{ userRole }}
      </div>
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
      isAdmin: false,
      userRole: null,
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      
      if(token) {
        let decoded = VueJwtDecode.decode(token);

        this.isLoggedIn = true;
        this.user = decoded;
        // console.log(decoded);
        this.getUserRole();
      }
      
    },

    getCart(){
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.$router.push({ name: 'list-cart', params: { customerId: decoded._id }});
    },

    getUserRole() {
        if(this.user.admin) {
            this.userRole = "Admin";
        } else if(this.user.technician) {
            this.userRole = "Technician";
        } else if(this.user.customer) {
            this.userRole = "Customer";
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

<style>
/* #app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */
</style>
