<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <!-- <pre>
            First Name: {{ user.first_name }}
        </pre> -->
                <div class="mb-3">
                    <label for="first_name">First Name</label>
                    <input type="text" class="form-control" id="first_name" required v-model="user.first_name"
                        name="first_name" />
                </div>

                <div class="mb-3">
                    <label for="last_name">Last Name</label>
                    <input class="form-control" id="last_name" required v-model="user.last_name" name="last_name" />
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" required v-model="user.email"
                        name="email" />
                </div>

                <div class="mb-3">
                    <label for="contact_no">Contact No.</label>
                    <input type="tel" class="form-control" id="contact_no" required v-model="user.contact_no"
                        name="contact_no" />
                </div>

                <button @click="saveUser()" class="btn btn-success">Create</button>

            </div>
        </div>
    </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";

export default {
    name: "create-user",
    data() {
        return {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                contact_no: '',
            },
        };
    },
    methods: {
        saveUser() {
            var data = {
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                email: this.user.email,
                contact_no: this.user.contact_no,
            };

            UserDataService.create(data)
                .then(response => {
                    this.user.id = response.data.id;
                    // console.log(response.data);
                    this.$router.push({ name: "list-users" });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newUser() {
            this.user = {};
        }
    }
};
</script>

<style>
</style>
