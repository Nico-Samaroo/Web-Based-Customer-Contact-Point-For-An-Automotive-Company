<template>
    <div class="container">
    <div class="row">
        <div v-if="loading" class="col-12">Loading...</div>
    </div>
    <div v-if="rentals" class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by Start Date" v-model="begin" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchBegin">
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Rentals List</h4>
            <table class="table table-sm">
                <tr class="list-group-item" :class="{ active: index == currentIndex }"
                    v-for="(rental, index) in rentals" :key="index" @click="setActiveRental(rental, index)">
                    {{ rental.vehicle.license_no + " - " + rental.vehicle.make +" "+ rental.vehicle.model}} | <strong>From</strong>: {{ rental.start }} - <strong>To</strong>: {{ rental.end }}
                </tr>
            </table>

            <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllRentals">
                Remove All
            </button> -->
        </div>
        <div class="col-md-6">
            <div v-if="currentRental">
                <h4 class="mb-2">Rentals</h4>
                <div>
                    <label><strong>Start:</strong></label> {{ currentRental.start }}
                </div>
                <div>
                    <label><strong>End:</strong></label> {{ currentRental.end }}
                </div>
                <div>
                    <label><strong>Vehicle:</strong></label> {{ currentRental.vehicle.license_no }}
                </div>
                <div>
                    <label><strong>Make:</strong></label> {{ currentRental.vehicle.make }}
                </div>
                <div>
                    <label><strong>Model:</strong></label> {{ currentRental.vehicle.model }}
                </div>
                <div>
                    <label><strong>Price:</strong></label> ${{ currentRental.vehicle.rental_price }}
                </div>

                <!-- <a class="btn btn-warning" :href="'/rental/update/' + currentRental.id">
                    Edit
                </a> -->

                <a class="btn btn-danger mx-2" @click="deleteRental(currentRental.id)">
                    Delete
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Rental...</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import RentalDataService from "../../services/RentalDataService";
import swal from 'sweetalert';

export default {
    name: "list-rentals",
    data() {
        return {
            loading: false,
            rentals: [],
            currentRental: null,
            currentIndex: -1,
            begin: ""
        };
    },
    methods: {
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
        },

        refreshList() {
            this.retrieveRentals();
            this.currentRental = null;
            this.currentIndex = -1;
        },

        setActiveRental(rental, index) {
            this.currentRental = rental;
            this.currentIndex = index;
        },

        deleteRental(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    RentalDataService.delete(id)
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

        removeAllRentals() {
            RentalDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchBegin() {
            RentalDataService.findByFirstName(this.begin)
                .then(response => {
                    this.rentals = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveRentals();
    },
};
</script>