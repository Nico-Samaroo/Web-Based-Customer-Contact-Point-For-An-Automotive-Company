<template>
    <div v-if="appointment" class="edit-form">
        <!-- <pre>{{ appointment || json }}</pre> -->
        <h4>Editing appointment for: <strong>{{ appointment.vehicle.license_no }}</strong> on <strong>{{ appointment.start }}</strong></h4>

        <div class="mb-3">
            <label for="vehicle">Vehicle</label>
            <select name="vehicle" id="vehicle" class="form-control" v-model="appointment.vehicle._id" required>
                <option value="">Please select a vehicle</option>
                <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">{{ vehicle.license_no }}</option>
            </select>
        </div>

        <div class="row">
            <div class="col-6">
                <div class="mb-3">
                    <label for="start">Start</label>
                    <input type="datetime-local" class="form-control" id="start" required v-model="appointment.begin"
                        name="start" />
                        <pre>{{ appointment.begin }}</pre>
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3">
                    <label for="end">End</label>
                    <input type="datetime-local" class="form-control" id="end" required v-model="appointment.finish"
                        name="end" />
                        <pre>{{ appointment.finish }}</pre>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-6">
                <div class="mb-3">
                    <label for="part">Appointment(s)</label>
                    <select name="parts" id="part" class="form-control" v-model="appointment.parts" multiple>
                        <option value="">Please select a part</option>
                        <option v-for="part in parts" :key="part.id" :value="part.id">{{ part.name }} [{{ part.code }}]</option>
                    </select>
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3">
                    <label for="service">Service(s)</label>
                    <!-- <pre>{{ appointment.services }}</pre> -->
                    <select name="services" id="service" class="form-control" v-model="appointment.services" multiple>
                        <option value="">Please select a service</option>
                        <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
                    </select>
                </div>
            </div>
        </div>

        <button class="btn btn-danger" @click="deleteAppointment">
            Delete
        </button>

        <button type="submit" class="btn btn-success mx-4" @click="updateAppointment">
            Update
        </button>

    </div>

    <div v-else>
        <br />
        <p>Please click on a Appointment...</p>
    </div>
</template>

<script>
import AppointmentDataService from "../../services/AppointmentDataService";
import VehicleDataService from "../../services/VehicleDataService";
import ServiceDataService from "../../services/ServiceDataService";
import PartDataService from "../../services/PartDataService";
import swal from "sweetalert";

export default {
    name: "update-appointment",
    data() {
        return {
            appointment: null,
            vehicles: [],
            services: [],
            parts: []
        };
    },
    methods: {
        getAppointment(id) {
            AppointmentDataService.get(id)
                .then(response => {
                    this.appointment = response.data;
                    const beginDate = new Date(this.appointment.begin);
                    this.appointment.begin = beginDate.getFullYear()+"-"+(beginDate.getMonth()+1)+"-"+beginDate.getDate() + " " + beginDate.getHours() + ":" + beginDate.getMinutes() + ":" + beginDate.getSeconds();
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateAppointment() {
            AppointmentDataService.update(this.appointment.id, this.appointment)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'list-appointments' })
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteAppointment() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    AppointmentDataService.delete(this.appointment.id)
                        .then(response => {
                            console.log(response.data);
                            this.$router.push({ name: 'list-appointments'})
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
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
        
        getParts() {
            PartDataService.getAll()
                .then(response => {
                    this.parts = response.data;
                });
        },
    },
    mounted() {
        this.getAppointment(this.$route.params.id);
        this.getVehicles();
        this.getServices();
        this.getParts();
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>
