<template>
    <div class="container">
    <div class="row">
        <div v-if="loading" class="col-12">Loading...</div>
    </div>
    <div v-if="customers" class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by First Name" v-model="first_name" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchFirstName">
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Customers List</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }"
                    v-for="(customer, index) in customers" :key="index" @click="setActiveCustomer(customer, index)">
                    {{ customer.first_name + ' ' + customer.last_name }}
                </li>
            </ul>

            <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllCustomers">
                Remove All
            </button> -->
        </div>
        <div class="col-md-6">
            <div v-if="currentCustomer">
                <h4>Customers</h4>
                <div>
                    <label><strong>First Name:</strong></label> {{ currentCustomer.first_name }}
                </div>
                <div>
                    <label><strong>Last Name:</strong></label> {{ currentCustomer.last_name }}
                </div>
                <div>
                    <label><strong>Email:</strong></label> {{ currentCustomer.email }}
                </div>
                <div>
                    <label><strong>Contact No.:</strong></label> {{ currentCustomer.contact_no }}
                </div>

                <a class="btn btn-warning" :href="'/customer/update/' + currentCustomer.id">
                    Edit
                </a>

                <a class="btn btn-secondary" :href="'/customer/update/' + currentCustomer.id">
                    Email
                </a>

                <a class="btn btn-danger mx-2" @click="deleteCustomer(currentCustomer.id)">
                    Delete
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Customer...</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import CustomerDataService from "../../services/CustomerDataService";
import swal from 'sweetalert';

export default {
    name: "list-customers",
    data() {
        return {
            loading: false,
            customers: [],
            currentCustomer: null,
            currentIndex: -1,
            first_name: ""
        };
    },
    methods: {
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

        refreshList() {
            this.retrieveCustomers();
            this.currentCustomer = null;
            this.currentIndex = -1;
        },

        setActiveCustomer(customer, index) {
            this.currentCustomer = customer;
            this.currentIndex = index;
        },

        deleteCustomer(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    CustomerDataService.delete(id)
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

        removeAllCustomers() {
            CustomerDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchFirstName() {
            CustomerDataService.findByFirstName(this.first_name)
                .then(response => {
                    this.customers = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveCustomers();
    },
};
</script>