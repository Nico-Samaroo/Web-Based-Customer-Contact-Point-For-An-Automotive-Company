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
                    <label for="role">Role</label>

                    <Select2  
                        :options="roleOptions" 
                        :settings="{ width: '100%' }"
                        @select="selectedRole($event)"
                        class="mb-3">
                    </Select2>
                </div>

                <!-- <pre>{{ user || json }}</pre> -->

                <button @click="saveUser()" class="btn btn-success">Create</button>

            </div>
        </div>
    </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
import Select2 from "vue3-select2-component";

export default {
    name: "create-user",
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
            user: {
                first_name: '',
                last_name: '',
                password: 'password',
                email: '',
                contact_no: '',
                admin: false,
                technician: false,
                customer: true
            },
        };
    },
    methods: {
        saveUser() {
            var data = {
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                password: this.user.password,
                email: this.user.email,
                contact_no: this.user.contact_no,
                admin: this.user.admin,
                technician: this.user.technician,
                customer: this.user.customer
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

        newUser() {
            this.user = {};
        }
    }
};
</script>

<style>
</style>
