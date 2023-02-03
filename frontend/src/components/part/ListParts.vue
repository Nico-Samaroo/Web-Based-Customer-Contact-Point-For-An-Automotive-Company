<template>
    <div class="row">
        <div v-if="loading" class="col-12">Loading...</div>
    </div>
    <div v-if="parts" class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by Code." v-model="code" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchCode">
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Parts List</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }"
                    v-for="(part, index) in parts" :key="index" @click="setActivePart(part, index)">
                    {{ part.name }} [{{ part.code }}] 
                </li>
            </ul>

            <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllParts">
                Remove All
            </button> -->
        </div>
        <div class="col-md-6">
            <div v-if="currentPart">
                <h4>Parts</h4>
                <div>
                    <label><strong>Name:</strong></label> {{ currentPart.name }}
                </div>
                <div>
                    <label><strong>Code:</strong></label> {{ currentPart.code }}
                </div>
                <div>
                    <label><strong>Amount:</strong></label> {{ currentPart.amount }}
                </div>

                <a class="btn btn-warning" :href="'/part/update/' + currentPart.id">Edit</a>

                <button class="btn btn-danger mx-2" @click="deletePart(currentPart.id)">Delete</button>

            </div>
            <div v-else>
                <br />
                <p>Please click on a Part...</p>
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
            license_no: ""
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

        searchLicenseNo() {
            PartDataService.findByLicenseNo(this.license_no)
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