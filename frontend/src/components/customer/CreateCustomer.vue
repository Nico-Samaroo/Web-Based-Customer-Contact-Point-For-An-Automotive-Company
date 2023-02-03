<template>
    <div class="submit-form">
        <!-- <pre>
            First Name: {{ customer.first_name }}
        </pre> -->
        <div class="mb-3">
            <label for="first_name">First Name</label>
            <input type="text" class="form-control" id="first_name" required v-model="customer.first_name" name="first_name" />
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

        <button @click="saveCustomer()" class="btn btn-success">Create</button>

    </div>
</template>

<script>
import CustomerDataService from "../../services/CustomerDataService";

export default {
    name: "create-customer",
    data() {
        return {
            customer: {
                first_name: '',
                last_name: '',
                email: '',
                contact_no: '',
            },
        };
    },
    methods: {
        saveCustomer() {
            var data = {
                first_name: this.customer.first_name,
                last_name: this.customer.last_name,
                email: this.customer.email,
                contact_no: this.customer.contact_no,
            };

            CustomerDataService.create(data)
                .then(response => {
                    this.customer.id = response.data.id;
                    // console.log(response.data);
                    this.$router.push({ name: "list-customers" });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newCustomer() {
            this.customer = {};
        }
    }
};
</script>

<style>
</style>
