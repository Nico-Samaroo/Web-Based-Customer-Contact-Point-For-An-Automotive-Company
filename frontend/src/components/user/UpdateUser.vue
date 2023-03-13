<template>
    <div class="container">
        <div class="row">
            <div v-if="user" class="edit-form">
                <h4>Editing: {{ user.first_name }} {{ user.last_name }}</h4>

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

                <button class="btn btn-danger" @click="deleteUser">
                    Delete
                </button>

                <button type="submit" class="btn btn-success mx-4" @click="updateUser">
                    Update
                </button>
                <p>{{ message }}</p>
            </div>

            <div v-else>
                <br />
                <p>Please click on a User...</p>
            </div>
        </div>
    </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
import swal from "sweetalert";

export default {
    name: "update-user",
    data() {
        return {
            user: null,
            message: ''
        };
    },
    methods: {
        getUser(id) {
            UserDataService.get(id)
                .then(response => {
                    this.user = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateUser() {
            UserDataService.update(this.user.id, this.user)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'list-users' })
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteUser() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    UserDataService.delete(this.user.id)
                        .then(response => {
                            console.log(response.data);
                            this.$router.push({ name: 'list-users'})
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
        }
    },
    mounted() {
        this.message = '';
        this.getUser(this.$route.params.id);
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>
