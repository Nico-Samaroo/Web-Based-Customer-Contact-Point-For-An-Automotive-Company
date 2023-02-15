<template>
  
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Automotive</router-link>
      <div v-if="isLoggedIn" class="navbar-nav mr-auto">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Customers
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/customer/create" class="dropdown-item">Create Customer</router-link></li>
            <li><router-link to="/customer/list" class="dropdown-item">Customer List</router-link></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Vehicles
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/vehicle/create" class="dropdown-item">Create Vehicle</router-link></li>
            <li><router-link to="/vehicle/list" class="dropdown-item">Vehicle List</router-link></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Appointments
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/appointment/create" class="dropdown-item">Create Appointment</router-link></li>
            <li><router-link to="/appointment/list" class="dropdown-item">Appointments</router-link></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Parts
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/part/create" class="dropdown-item">Create Part</router-link></li>
            <li><router-link to="/part/list" class="dropdown-item">Part List</router-link></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Services
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/service/create" class="dropdown-item">Create Service</router-link></li>
            <li><router-link to="/service/list" class="dropdown-item">Service List</router-link></li>
          </ul>
        </li>

      </div>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <span v-if="isLoggedIn" class="navbar-text">
            {{ user.first_name +' '+ user.last_name }}
          </span>
          <li class="nav-item active">
            <button class="nav-link btn btn-secondary mr-2" @click="logUserOut">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col mt-4">
          <router-view></router-view>
        </div>
      </div>
    </div>
    
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: 'app',
  data() {
    return {
      user: {},
      isLoggedIn: false
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.isLoggedIn = true;
      this.user = decoded;
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
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
