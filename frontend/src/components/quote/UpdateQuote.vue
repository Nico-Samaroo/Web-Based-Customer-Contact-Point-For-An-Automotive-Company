<template>
    <div class="container">
        <div class="row">
            <div v-if="quote" class="col-12">
                <h4>Editing: {{ quote.name }}</h4>

                <div class="mb-3">
                    <label for="name">License No.</label>
                    <input type="text" class="form-control" id="name" required v-model="quote.name" name="name" />
                </div>

                <div class="mb-3">
                    <label for="code">Chassis No.</label>
                    <input class="form-control" id="code" required v-model="quote.code" name="code" />
                </div>

                <div class="mb-3">
                    <label for="amount">Make</label>
                    <input class="form-control" id="amount" required v-model="quote.amount" name="amount" />
                </div>

                <div class="mb-3">
                    <label for="price">Price</label>
                    <input class="form-control" id="price" required v-model="quote.price" name="price" />
                </div>

                <button class="btn btn-danger" @click="deleteQuote">
                    Delete
                </button>

                <button type="submit" class="btn btn-success mx-4" @click="updateQuote">
                    Update
                </button>

            </div>

            <div v-else>
                <br />
                <p>Please click on a Quote...</p>
            </div>
        </div>
    </div>
</template>

<script>
import QuoteDataService from "../../services/QuoteDataService";
import CustomerDataService from "../../services/CustomerDataService";
import swal from "sweetalert";

export default {
    name: "update-quote",
    data() {
        return {
            quote: null,
            customers: [],
            message: ''
        };
    },
    methods: {
        getQuote(id) {
            QuoteDataService.get(id)
                .then(response => {
                    this.quote = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateQuote() {
            QuoteDataService.update(this.quote.id, this.quote)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'list-quotes' })
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteQuote() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    QuoteDataService.delete(this.quote.id)
                        .then(response => {
                            console.log(response.data);
                            this.$router.push({ name: 'list-quotes'})
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
        this.getQuote(this.$route.params.id);
        this.retrieveCustomers();
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>
