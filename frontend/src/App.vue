<template>
  
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Automotive</router-link>
      <div class="navbar-nav mr-auto">

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
export default {
  name: 'app',
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
