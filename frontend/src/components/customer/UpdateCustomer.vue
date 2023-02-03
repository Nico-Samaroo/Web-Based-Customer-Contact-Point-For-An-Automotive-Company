<template>
    <div v-if="customer" class="edit-form">
        <h4>Editing: {{ customer.first_name }} {{ customer.last_name }}</h4>

        <div class="mb-3">
            <label for="first_name">First Name</label>
            <input type="text" class="form-control" id="first_name" required v-model="customer.first_name"
                name="first_name" />
        </div>

        <div class="mb-3">
            <label for="last_name">Last Name</label>
            <input class="form-control" id="last_name" required v-model="customer.last_name" name="last_name" />
        </div>

        <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" required v-model="customer.email" name="email" />
        </div>

        <div class="mb-3">
            <label for="contact_no">Contact No.</label>
            <input type="tel" class="form-control" id="contact_no" required v-model="customer.contact_no" name="contact_no" />
        </div>

        <button class="btn btn-danger" @click="deleteCustomer">
            Delete
        </button>

        <button type="submit" class="btn btn-success mx-4" @click="updateCustomer">
            Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a Customer...</p>
    </div>
</template>

<script>
import CustomerDataService from "../../services/CustomerDataService";
import swal from "sweetalert";

export default {
    name: "update-customer",
    data() {
        return {
            customer: null,
            message: ''
        };
    },
    methods: {
        getCustomer(id) {
            CustomerDataService.get(id)
                .then(response => {
                    this.customer = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateCustomer() {
            CustomerDataService.update(this.customer.id, this.customer)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'list-customers' })
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteCustomer() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    CustomerDataService.delete(this.customer.id)
                        .then(response => {
                            console.log(response.data);
                            this.$router.push({ name: 'list-customers'})
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
        }
    },
    mounted() {
        this.message = '';
        this.getCustomer(this.$route.params.id);
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>
