<template>
    <div class="container">
        <div class="row">
            <div class="edit-form">

                <div v-if="customer">
                    <h4>Adding Vehicle to : {{ customer.first_name }} {{ customer.last_name }}</h4>
                    <input type="hidden" name="customer" value="{{ customer.id }}">
                </div>

                <div v-else class="mb-3">
                    <h4>Creating Vehicle</h4>
                    <select name="customer" id="customer" class="form-control" v-model="vehicle.customer" required>
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

                <button type="submit" class="btn btn-success" @click="createVehicle">
                    Create
                </button>

            </div>
        </div>
    </div>

</template>

<script>
import CustomerDataService from "../../services/CustomerDataService";
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
                customer: '',
            },
            customer: null,
            customers: []
        };
    },
    methods: {
        getCustomer(id) {
            CustomerDataService.get(id)
                .then(response => {
                    this.customer = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
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

        createVehicle() {
            VehicleDataService.create(this.vehicle)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "list-vehicles" });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteCustomer() {
            CustomerDataService.delete(this.customer.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "customers" });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        let customer = this.$route.params.id;
        if(customer) {
            this.getCustomer(customer);
        } else {
            this.retrieveCustomers();
        }
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>