<template>
    <div v-if="currentCustomer" class="edit-form">
        <h4>Customer</h4>
        <form>
            
        <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" class="form-control" id="first_name" required v-model="customer.first_name"
                name="first_name" />
        </div>

        <div class="form-group">
            <label for="last_name">Last Name</label>
            <input class="form-control" id="last_name" required v-model="customer.last_name" name="last_name" />
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" id="email" required v-model="customer.email" name="email" />
        </div>

        <div class="form-group">
            <label for="contact_no">Contact No.</label>
            <input class="form-control" id="contact_no" required v-model="customer.contact_no" name="contact_no" />
        </div>

        </form>

        <button class="badge badge-danger mr-2" @click="deleteCustomer">
            Delete
        </button>

        <button type="submit" class="badge badge-success" @click="updateCustomer">
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
import CustomerDataService from "../services/CustomerDataService";

export default {
    name: "view-customer",
    data() {
        return {
            currentCustomer: null,
            message: ''
        };
    },
    methods: {
        getCustomer(id) {
            CustomerDataService.get(id)
                .then(response => {
                    this.currentCustomer = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updatePublished(status) {
            var data = {
                id: this.currentCustomer.id,
                title: this.currentCustomer.title,
                description: this.currentCustomer.description,
                published: status
            };

            CustomerDataService.update(this.currentCustomer.id, data)
                .then(response => {
                    this.currentCustomer.published = status;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateCustomer() {
            CustomerDataService.update(this.currentCustomer.id, this.currentCustomer)
                .then(response => {
                    console.log(response.data);
                    this.message = 'The customer was updated successfully!';
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteCustomer() {
            CustomerDataService.delete(this.currentCustomer.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "customers" });
                })
                .catch(e => {
                    console.log(e);
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
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>
