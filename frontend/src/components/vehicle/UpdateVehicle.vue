<template>
    <div class="container">
        <div class="row">
            <div v-if="vehicle" class="edit-form">
                <h4>Editing: {{ vehicle.license_no }}</h4>

                <div class="mb-3">
                    <select name="customer" id="customer" class="form-control" v-model="vehicle.customer"
                        :value="vehicle.customer" required>
                        <option value="">Please select a customer</option>
                        <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{
                            customer.first_name
                        }} {{ customer.last_name }}</option>
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
import CustomerDataService from "../../services/CustomerDataService";
import swal from "sweetalert";

export default {
    name: "update-vehicle",
    data() {
        return {
            vehicle: null,
            customers: [],
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

        retrieveCustomers() {
            this.loading = true;
            CustomerDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.customers = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.getVehicle(this.$route.params.id);
        this.retrieveCustomers();
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>
