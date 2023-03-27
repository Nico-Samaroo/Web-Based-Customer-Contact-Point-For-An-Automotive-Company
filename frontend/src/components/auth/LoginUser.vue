<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;" @submit.prevent="loginUser">
          <input type="text" id="email" class="form-control mb-5" placeholder="Email" v-model="login.email" />
          <!-- Password -->
          <input type="password" id="password" class="form-control mb-5" placeholder="Password"
            v-model="login.password" />
          <p>
            Don't have an account? <router-link to="/register">Click Here</router-link>
          </p>
          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
import swal from 'sweetalert';

export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await UserDataService.login(this.login);
        console.log(response);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login Successful", "success");
          this.$router.push({ name: "dashboard" });
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.message);
      }
    }
  }
};
</script>