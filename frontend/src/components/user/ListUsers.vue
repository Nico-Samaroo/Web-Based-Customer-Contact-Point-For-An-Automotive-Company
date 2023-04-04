<template>
    <div class="container">
    <div class="row">
        <div v-if="loading" class="col-12">Loading...</div>
    </div>
    <div v-if="users" class="list row">
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
            <h4>Users List</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }"
                    v-for="(user, index) in users" :key="index" @click="setActiveUser(user, index)">
                    {{ user.first_name + ' ' + user.last_name }}
                </li>
            </ul>

            <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
                Remove All
            </button> -->
        </div>
        <div class="col-md-6">
            <div v-if="currentUser">
                <h4>Users</h4>
                <div>
                    <label><strong>First Name:</strong></label> {{ currentUser.first_name }}
                </div>
                <div>
                    <label><strong>Last Name:</strong></label> {{ currentUser.last_name }}
                </div>
                <div>
                    <label><strong>Email:</strong></label> {{ currentUser.email }}
                </div>
                <div>
                    <label><strong>Role:</strong></label> {{ currentUserRole }}
                </div>

                <!-- <a class="btn btn-warning" :href="'/user/update/' + currentUser.id">
                    Edit
                </a> -->

                <router-link :to="'/user/update/' + currentUser.id" class="btn btn-secondary">Edit</router-link>
                <router-link :to="'/user/email/' + currentUser.id" v-if="!currentUser.admin" class="btn btn-warning mx-2">Email</router-link>

                <a class="btn btn-danger mx-2" @click="deleteUser(currentUser.id)">
                    Delete
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a User...</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
import swal from 'sweetalert';

export default {
    name: "list-users",
    data() {
        return {
            loading: false,
            users: [],
            currentUser: null,
            currentIndex: -1,
            currentUserRole: null,
            first_name: ""
        };
    },
    methods: {
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

        refreshList() {
            this.retrieveUsers();
            this.currentUser = null;
            this.currentIndex = -1;
            this.currentUserRole = null;
        },

        setActiveUser(user, index) {
            this.currentUser = user;
            this.currentIndex = index;
            this.getUserRole(user);
        },

        getUserRole(user) {
            if(user.admin) {
                this.currentUserRole = "Admin";
            } else if(user.technician) {
                this.currentUserRole = "Technician";
            } else if(user.customer) {
                this.currentUserRole = "Customer";
            }
        },

        deleteUser(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    UserDataService.delete(id)
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

        removeAllUsers() {
            UserDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchFirstName() {
            UserDataService.findByFirstName(this.first_name)
                .then(response => {
                    this.users = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveUsers();
    },
};
</script>