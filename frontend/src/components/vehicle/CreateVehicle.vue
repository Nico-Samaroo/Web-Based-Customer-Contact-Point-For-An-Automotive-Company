<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <!-- <pre>{{ vehicle || json }}</pre> -->
                <div v-if="user">
                    <h4>Adding Vehicle to : {{ user.first_name }} {{ user.last_name }}</h4>
                    <input type="hidden" name="user" value="{{ user.id }}">
                </div>

                <div v-else class="mb-3">
                    <h4 class="mb-4">Creating Vehicle</h4>
                    <select name="customer" id="customer" class="form-control" v-model="vehicle.user" required>
                        <option value="">Please select a customer</option>
                        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.first_name }} {{ user.last_name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="license_no">License No.</label>
                    <input type="text" class="form-control" id="license_no" required v-model="vehicle.license_no"
                        name="license_no" />
                </div>

                <div class="mb-3">
                    <label for="chassis_no">Chassis No.</label>
                    <input type="text" class="form-control" id="chassis_no" required v-model="vehicle.chassis_no"
                        name="chassis_no" />
                </div>

                <div class="mb-3">
                    <label for="make">Make</label>
                    <input type="text" class="form-control" id="make" required v-model="vehicle.make" name="make" />
                </div>

                <div class="mb-3">
                    <label for="model">Model</label>
                    <input type="text" class="form-control" id="model" required v-model="vehicle.model" name="model" />
                </div>

                <div class="mb-3">
                    <label for="year">Year</label>
                    <input type="text" class="form-control" id="year" required v-model="vehicle.year" name="year" />
                </div>

                <div class="mb-3">
                    <!-- <pre>{{ vehicle.rental || json}}</pre> -->
                    <label for="rental" style="font-weight: bold;">Rental?: </label>&nbsp;&nbsp;

                    <input type="radio" id="yes" value="true" v-model="vehicle.rental">
                    <label for="yes">Yes</label>
                    &nbsp;
                    <input type="radio" id="no" value="false" v-model="vehicle.rental">
                    <label for="no">No</label>
                </div>

                <div v-if="vehicle.rental" class="mb-3">
                    <label for="rental_price">Rental Price (Daily)</label>
                    <input type="text" class="form-control" id="rental_price" required v-model="vehicle.rental_price" name="rental_price" />
                </div>

                <button type="submit" class="btn btn-success" @click="createVehicle">
                    Create
                </button>

            </div>
        </div>
    </div>

</template>

<script>
import UserDataService from "../../services/UserDataService";
import VehicleDataService from "../../services/VehicleDataService";

export default {
    name: "create-vehicle",
    data() {
        return {
            vehicle: {
                license_no: '',
                chassis_no: '',
                make: '',
                model: '',
                year: '',
                user: '',
            },
            user: null,
            users: []
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

        retrieveUsers() {
            this.loading = true;
            UserDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.users = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        createVehicle() {
            VehicleDataService.create(this.vehicle)
                .then(response => {
                    this.vehicle.id = response.data.id;
                    // console.log(response.data);
                    this.$router.push({ name: "list-vehicles" });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        // deleteCustomer() {
        //     UserDataService.delete(this.customer.id)
        //         .then(response => {
        //             console.log(response.data);
        //             this.$router.push({ name: "customers" });
        //         })
        //         .catch(e => {
        //             console.log(e);
        //         });
        // }
    },
    mounted() {
        let userId = this.$route.params.id;
        if(userId) {
            this.getUser(userId);
        } else {
            this.retrieveUsers();
        }
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>