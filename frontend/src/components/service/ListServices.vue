<template>
    <div class="container">
        <div class="row">
            <div v-if="loading" class="col-12">Loading...</div>
        </div>
        <div v-if="services" class="list row">
            <div class="col-md-8">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Search by Name" v-model="name" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchName">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h4>Services List</h4>
                <ul class="list-group">
                    <li class="list-group-item" :class="{ active: index == currentIndex }"
                        v-for="(service, index) in services" :key="index" @click="setActiveService(service, index)">
                        {{ service.name }}
                    </li>
                </ul>

                <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllServices">
                Remove All
            </button> -->
            </div>
            <div class="col-md-6">
                <div v-if="currentService">
                    <h4>Services</h4>
                    <div>
                        <label><strong>Name:</strong></label> {{ currentService.name }}
                    </div>

                    <a class="btn btn-warning" :href="'/service/update/' + currentService.id">Edit</a>

                    <button class="btn btn-danger mx-2" @click="deleteService(currentService.id)">Delete</button>

                </div>
                <div v-else>
                    <br />
                    <p>Please click on a Service...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ServiceDataService from "../../services/ServiceDataService";
import swal from "sweetalert";

export default {
    name: "list-services",
    data() {
        return {
            loading: false,
            services: [],
            currentService: null,
            currentIndex: -1,
            name: ""
        };
    },
    methods: {
        retrieveServices() {
            this.loading = true;
            ServiceDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.services = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveServices();
            this.currentService = null;
            this.currentIndex = -1;
        },

        setActiveService(service, index) {
            console.log(service);
            this.currentService = service;
            this.currentIndex = index;
        },

        deleteService(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    ServiceDataService.delete(id)
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

        removeAllServices() {
            ServiceDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchName() {
            ServiceDataService.findByName(this.name)
                .then(response => {
                    this.services = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveServices();
    },
};
</script>