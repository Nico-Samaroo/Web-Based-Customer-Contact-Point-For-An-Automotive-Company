<template>
    <div class="container">
        <div class="row">
            <div v-if="part" class="col-12">
                <h4>Editing: {{ part.name }}</h4>

                <div class="mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" required v-model="part.name" name="name" />
                </div>

                <div class="mb-3">
                    <label for="code">Code</label>
                    <input class="form-control" id="code" required v-model="part.code" name="code" />
                </div>

                <div class="mb-3">
                    <label for="amount">Amount</label>
                    <input class="form-control" id="amount" required v-model="part.amount" name="amount" />
                </div>

                <div class="mb-3">
                    <label for="price">Price</label>
                    <input class="form-control" id="price" required v-model="part.price" name="price" />
                </div>

                <button class="btn btn-danger" @click="deletePart">
                    Delete
                </button>

                <button type="submit" class="btn btn-success mx-4" @click="updatePart">
                    Update
                </button>

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
import CustomerDataService from "../../services/CustomerDataService";
import swal from "sweetalert";

export default {
    name: "update-part",
    data() {
        return {
            part: null,
            customers: [],
            message: ''
        };
    },
    methods: {
        getPart(id) {
            PartDataService.get(id)
                .then(response => {
                    this.part = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updatePart() {
            PartDataService.update(this.part.id, this.part)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'list-parts' })
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deletePart() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    PartDataService.delete(this.part.id)
                        .then(response => {
                            console.log(response.data);
                            this.$router.push({ name: 'list-parts'})
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
        },

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
    },
    mounted() {
        this.getPart(this.$route.params.id);
        this.retrieveCustomers();
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>
