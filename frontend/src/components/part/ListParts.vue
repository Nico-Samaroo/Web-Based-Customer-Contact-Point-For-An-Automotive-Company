<template>
    <div class="container">
        <div class="row">
            <div class="row">
                <div v-if="loading" class="col-12">Loading...</div>
            </div>
            <div v-if="parts" class="list row">
                <div class="col-md-12">
                    <h4>Parts List</h4>
                    <div class="input-group mb-3" style="margin: 1em 0;">
                        <input type="text" class="form-control" placeholder="Search by Code." v-model="code" />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" @click="searchCode">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-3" v-for="(part, index) in parts" :key="index">
                            <div class="flex justify-center">
                                <div class="rounded-lg shadow-lg bg-white max-w-sm">
                                    <a href="#!">
                                        <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt=""/>
                                    </a>
                                    <div class="p-6" style="padding: 1em; margin-bottom: 2em;">
                                        <h5 class="text-gray-900 text-xl font-medium mb-2">{{ part.name }}</h5>
                                        <p class="text-gray-700 text-base mb-4">
                                            Code: [{{ part.code }}]
                                            Amount: {{ part.amount }}
                                            Price: {{ part.price }}
                                        </p>
                                        <a class="btn btn-warning" :href="'/part/update/' + part.id">Edit</a>
                                        <button class="btn btn-danger mx-2" @click="deletePart(part.id)">Delete</button>

                    <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllParts">
                Remove All
            </button> -->
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PartDataService from "../../services/PartDataService";
import swal from "sweetalert";

export default {
    name: "list-parts",
    data() {
        return {
            loading: false,
            parts: [],
            currentPart: null,
            currentIndex: -1,
            code: ""
        };
    },
    methods: {
        retrieveParts() {
            this.loading = true;
            PartDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.parts = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveParts();
            this.currentPart = null;
            this.currentIndex = -1;
        },

        setActivePart(part, index) {
            console.log(part);
            this.currentPart = part;
            this.currentIndex = index;
        },

        deletePart(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    PartDataService.delete(id)
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

        removeAllParts() {
            PartDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchCode() {
            PartDataService.findByCode(this.code)
                .then(response => {
                    this.parts = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveParts();
    },
};
</script>