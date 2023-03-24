<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 class="mb-2">History</h2>
                <hr>
                <h4 class="mb-4">Jobs</h4>
                <!-- <pre>{{ vehicles || json }}</pre> -->
                <ul class="list-group">
                    <li v-for="(vehicle, index) in vehicles" :key="index" class="list-group-item">
                        <h5>{{ vehicle.license_no }}</h5>
                        <table class="table table-sm mb-4">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Vehicle</th>
                                    <th>Service(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(appointment, i) in vehicle.appointments" :key="i">
                                    <td>{{ appointment.start }}</td>
                                    <td>{{ appointment.vehicle.license_no }}</td>
                                    <td><span v-for="(service, index) in appointment.services" :key="index">{{ service.name }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                </ul>


                <!-- <hr>
                <h4>Rentals</h4> -->
            </div>
        </div>
    </div>
</template>

<script>
import AppointmentDataService from "../services/AppointmentDataService";
import VehicleDataService from "../services/VehicleDataService";
import RentalDataService from "../services/RentalDataService";
import VueJwtDecode from "vue-jwt-decode";

export default {
    name: "home-page",
    data() {
        return {
            loading: false,
            vehicles: [],
            rentals: [],
        }
    },
    methods: {
        retrieveVehicles() {
            this.loading = true;
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            const userId = decoded._id;
            VehicleDataService.getByCustomerId(userId)
                .then(response => {
                    this.loading = false;
                    const vehicles = response.data;
                    vehicles.forEach(vehicle => {
                        let appointments = [];
                        AppointmentDataService.getByVehicleId(vehicle.id)
                            .then(response => {
                                let vehicleAppointments = response.data;
                                vehicleAppointments.forEach(appointment => {
                                    appointments.push(appointment);
                                    vehicle.appointments = appointments
                                    this.vehicles.push(vehicle);
                                })
                            })
                    });
                    // this.vehicles = vehicles;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        retrieveRentals() {
            this.loading = true;
            RentalDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.rentals = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveVehicles();
        this.retrieveRentals();
    },
};


</script>