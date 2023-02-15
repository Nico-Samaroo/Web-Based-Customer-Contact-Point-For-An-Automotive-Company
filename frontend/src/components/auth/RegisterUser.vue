<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form class="text-center border border-secondary p-5"
                    style="margin-top:70px;height:auto;padding-top:100px !important;" @submit.prevent="registerUser">
                    <input type="text" id="name" class="form-control mb-5" placeholder="First Name" v-model="register.first_name"
                        required />
                    <input type="text" id="name" class="form-control mb-5" placeholder="Last Name" v-model="register.last_name"
                        required />
                    <input type="email" id="email" class="form-control mb-5" placeholder="Email"
                        v-model="register.email" required />
                    <!-- Password -->
                    <input type="password" id="password" class="form-control mb-5" placeholder="Password"
                        v-model="register.password" />
                    <p>
                        Already have an account??<router-link to="/">click here</router-link>
                        <!-- Sign in button -->
                        <center>
                            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                                Sign in
                            </button>
                        </center>
                    </p>
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
            register: {
                first_name: "",
                last_name: "",
                email: "",
                password: ""
            }
        };
    },
    methods: {
        async registerUser() {
            try {
                let response = await UserDataService.register(this.register);
                console.log(response);
                let token = response.data.token;
                if (token) {
                    localStorage.setItem("jwt", token);
                    this.$router.push({ name: "dashboard"});
                    swal("Success", "Registration Was successful", "success");
                } else {
                    swal("Error", "Something Went Wrong", "error");
                }
            } catch (err) {
                let error = err.response;
                if (error.status == 409) {
                    swal("Error", error.data.message, "error");
                } else {
                    swal("Error", error.data.err.message, "error");
                }
            }
        }
    }
};
</script>