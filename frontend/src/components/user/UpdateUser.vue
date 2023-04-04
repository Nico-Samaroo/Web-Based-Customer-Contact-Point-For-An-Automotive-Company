<template>
    <div class="container">
        <div class="row">
            <div v-if="user" class="col-12">
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
                    <label for="role">Role</label>

                    <Select2 
                        v-model="userRole"
                        :options="roleOptions" 
                        :settings="{ width: '100%' }"
                        @select="selectedRole($event)"
                        class="mb-3">
                    </Select2>
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
                <p>No user found with that ID.</p>
            </div>
        </div>
    </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
import swal from "sweetalert";
import Select2 from "vue3-select2-component";

export default {
    name: "update-user",
    components: {
        Select2
    },
    data() {
        return {
            roleOptions: [
                {text: "Admin", id: "Admin"},
                {text: "Technician", id: "Technician"},
                {text: "Customer", id: "Customer"},
            ],
            user: null,
            message: '',
            userRole: null,
        };
    },
    methods: {
        getUser(id) {
            UserDataService.get(id)
                .then(response => {
                    this.user = response.data;
                    // console.log(response.data);  
                    this.getUserRole();
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

        getUserRole() {
            if(this.user.admin) {
                this.userRole = "Admin";
            } else if(this.user.technician) {
                this.userRole = "Technician";
            } else if(this.user.customer) {
                this.userRole = "Customer";
            }
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
        },

        selectedRole(selectedRole) {
            const role = selectedRole.text;
            switch (role) {
                case "Admin":
                    this.user.admin = true;
                    this.user.customer = false;
                    this.user.technician = false;
                    break;
                case "Technician":
                    this.user.technician = true;
                    this.user.customer = false;
                    this.user.admin = false;
                    break;
                case "Customer":
                    this.user.customer = true;
                    this.user.technician = false;
                    this.user.admin = false;
                    break;
            
                default:
                    this.user.customer = true;
                    break;
            }
        },
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
