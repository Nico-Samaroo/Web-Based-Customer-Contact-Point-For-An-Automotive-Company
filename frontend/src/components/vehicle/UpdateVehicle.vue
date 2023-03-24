<template>
    <div class="container">
        <div class="row">
            <div v-if="vehicle" class="edit-form">
                <h4>Editing: {{ vehicle.license_no }}</h4>

                <div class="mb-3">
                    <select name="user" id="user" class="form-control" v-model="vehicle.user"
                        :value="vehicle.user" required>
                        <option value="">Please select a user</option>
                        <option v-for="user in users" :key="user.id" :value="user.id">{{
                            user.first_name
                        }} {{ user.last_name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="license_no">License No.</label>
                    <input type="text" class="form-control" id="license_no" required v-model="vehicle.license_no"
                        name="license_no" />
                </div>

                <div class="mb-3">
                    <label for="chassis_no">Chassis No.</label>
                    <input class="form-control" id="chassis_no" required v-model="vehicle.chassis_no"
                        name="chassis_no" />
                </div>

                <div class="mb-3">
                    <label for="make">Make</label>
                    <input class="form-control" id="make" required v-model="vehicle.make" name="make" />
                </div>

                <div class="mb-3">
                    <label for="model">Model</label>
                    <input class="form-control" id="model" required v-model="vehicle.model" name="model" />
                </div>

                <div class="mb-3">
                    <label for="year">Year</label>
                    <input class="form-control" id="year" required v-model="vehicle.year" name="year" />
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

                <button class="btn btn-danger" @click="deleteVehicle">
                    Delete
                </button>

                <button type="submit" class="btn btn-success mx-4" @click="updateVehicle">
                    Update
                </button>

            </div>

            <div v-else>
                <br />
                <p>Please click on a Vehicle...</p>
            </div>
        </div>
    </div>
</template>

<script>
import VehicleDataService from "../../services/VehicleDataService";
import UserDataService from "../../services/UserDataService";
import swal from "sweetalert";

export default {
    name: "update-vehicle",
    data() {
        return {
            vehicle: null,
            users: [],
            message: ''
        };
    },
    methods: {
        getVehicle(id) {
            VehicleDataService.get(id)
                .then(response => {
                    this.vehicle = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateVehicle() {
            VehicleDataService.update(this.vehicle.id, this.vehicle)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'list-vehicles' })
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteVehicle() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    VehicleDataService.delete(this.vehicle.id)
                        .then(response => {
                            console.log(response.data);
                            this.$router.push({ name: 'list-vehicles'})
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
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
    },
    mounted() {
        this.getVehicle(this.$route.params.id);
        this.retrieveUsers();
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>
