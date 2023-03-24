<template>
    <div class="container">
        <div class="row">
            <div v-if="loading" class="col-12">Loading...</div>
        </div>
        <div v-if="vehicles" class="list row">
            <div class="col-md-8">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Search by License No." v-model="license_no" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchLicenseNo">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h4>Vehicles List</h4>
                <ul class="list-group">
                    <li class="list-group-item" :class="{ active: index == currentIndex }"
                        v-for="(vehicle, index) in vehicles" :key="index" @click="setActiveVehicle(vehicle, index)">
                        {{ vehicle.license_no }}
                    </li>
                </ul>
                <!-- <pre>{{ vehicles || json }}</pre> -->

                <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllVehicles">
                Remove All
            </button> -->
            </div>
            <div class="col-md-6">
                <!-- <pre>{{ currentVehicle || json }}</pre> -->
                <div v-if="currentVehicle">
                    <h4>Vehicles</h4>
                    <div>
                        <label><strong>Customer Name:</strong></label> {{
                            currentVehicle.user.first_name + ' ' +
                                currentVehicle.user.last_name
                        }}
                    </div>
                    <div>
                        <label><strong>License No.:</strong></label> {{ currentVehicle.license_no }}
                    </div>
                    <div>
                        <label><strong>Chassis No.:</strong></label> {{ currentVehicle.chassis_no }}
                    </div>
                    <div>
                        <label><strong>Make:</strong></label> {{ currentVehicle.make }}
                    </div>
                    <div>
                        <label><strong>Model:</strong></label> {{ currentVehicle.model }}
                    </div>
                    <div>
                        <label><strong>Year:</strong></label> {{ currentVehicle.year }}
                    </div>
                    <div>
                        <label><strong>Rental:</strong></label> {{ currentVehicle.rental ? 'Yes' : 'No' }}
                    </div>
                    <div v-if="currentVehicle.rental">
                        <label><strong>Price:</strong></label> {{ currentVehicle.rental_price }}
                    </div>

                    <a class="btn btn-warning" :href="'/vehicle/update/' + currentVehicle.id">Edit</a>

                    <button class="btn btn-danger mx-2" @click="deleteVehicle(currentVehicle.id)">Delete</button>

                </div>
                <div v-else>
                    <br />
                    <p>Please click on a Vehicle...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VehicleDataService from "../../services/VehicleDataService";
import swal from "sweetalert";

export default {
    name: "list-vehicles",
    data() {
        return {
            loading: false,
            vehicles: [],
            currentVehicle: null,
            currentIndex: -1,
            license_no: ""
        };
    },
    methods: {
        retrieveVehicles() {
            this.loading = true;
            VehicleDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.vehicles = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveVehicles();
            this.currentVehicle = null;
            this.currentIndex = -1;
        },

        setActiveVehicle(vehicle, index) {
            console.log(vehicle);
            this.currentVehicle = vehicle;
            this.currentIndex = index;
        },

        deleteVehicle(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    VehicleDataService.delete(id)
                        .then(response => {
                            console.log(response.data);
                            this.refreshList();
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
        },

        removeAllVehicles() {
            VehicleDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchLicenseNo() {
            VehicleDataService.findByLicenseNo(this.license_no)
                .then(response => {
                    this.vehicles = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveVehicles();
    },
};
</script>