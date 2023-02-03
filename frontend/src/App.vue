<template>

    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Automotive</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item"><router-link to="/customers" class="nav-link">Customers</router-link></li>
        <li class="nav-item"><router-link to="/add" class="nav-link">Add</router-link></li>
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
  margin-top: 60px;
}
</style>
