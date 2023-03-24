<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <!-- <pre>{{ appointment || json }}</pre> -->
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="vehicle">Vehicle</label>
                            <select name="vehicle" id="vehicle" class="form-control" v-model="appointment.vehicle" required>
                                <option value="">Please select a vehicle</option>
                                <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">{{
                                    vehicle.license_no
                                }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                

                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="begin">Start Time</label>
                            <input type="datetime-local" class="form-control" id="begin" required
                                v-model="appointment.begin" name="begin" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="service">Service(s)</label>
                            <select name="services" id="service" class="form-control" v-model="appointment.services"
                                multiple>
                                <option value="">Please select a service</option>
                                <option v-for="service in services" :key="service.id" :value="service.id">{{
                                    service.name
                                }}</option>
                            </select>
                        </div>
                    </div>
                </div>


                <button type="submit" class="btn btn-success" @click="createAppointment">
                    Create
                </button>

            </div>
        </div>
    </div>

</template>

<script>
import AppointmentDataService from "../../services/AppointmentDataService";
import VehicleDataService from "../../services/VehicleDataService";
import ServiceDataService from "../../services/ServiceDataService";

export default {
    name: "create-appointment",
    data() {
        return {
            appointment: {
                begin: '',
                vehicle: '',
                services: '',
            },
            appointments: [],
            vehicles: [],
            services: [],
        };
    },
    methods: {
        getAppointment(id) {
            AppointmentDataService.get(id)
                .then(response => {
                    this.appointment = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },
        
        getVehicles() {
            VehicleDataService.getAll()
                .then(response => {
                    this.vehicles = response.data;
                });
        },
        
        getServices() {
            ServiceDataService.getAll()
                .then(response => {
                    this.services = response.data;
                });
        },

        retrieveAppointments() {
            this.loading = true;
            AppointmentDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.appointments = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        createAppointment() {
            AppointmentDataService.create(this.appointment)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "list-appointments" });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteAppointment() {
            AppointmentDataService.delete(this.appointment.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "appointments" });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        let appointment = this.$route.params.id;
        if(appointment) {
            this.getAppointment(appointment);
        } else {
            this.retrieveAppointments();
        }
        this.getVehicles();
        this.getServices();
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>