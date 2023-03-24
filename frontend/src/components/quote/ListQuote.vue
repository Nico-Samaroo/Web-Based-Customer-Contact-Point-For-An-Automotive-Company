<template>
    <div class="container">
        <div class="row">
            <div class="row">
                <div v-if="loading" class="col-12">Loading...</div>
            </div>
            <div v-if="quotes" class="list row">
                <div class="col-md-12">
                    <h4>Quotes List</h4>
                    <div class="input-group mb-3" style="margin: 1em 0;">
                        <input type="text" class="form-control" placeholder="Search by Code." v-model="code" />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" @click="searchCode">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-3" v-for="(quote, index) in quotes" :key="index">
                            <div class="flex justify-center">
                                <div class="rounded-lg shadow-lg bg-white max-w-sm">
                                    <a href="#!">
                                        <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt=""/>
                                    </a>
                                    <div class="p-6" style="padding: 1em; margin-bottom: 2em;">
                                        <h5 class="text-gray-900 text-xl font-medium mb-2">{{ quote.name }}</h5>
                                        <p class="text-gray-700 text-base mb-4">
                                            Code: [{{ quote.code }}]
                                            Amount: {{ quote.amount }}
                                            Price: {{ quote.price }}
                                        </p>
                                        <a class="btn btn-warning" :href="'/quote/update/' + quote.id">Edit</a>
                                        <button class="btn btn-danger mx-2" @click="deleteQuote(quote.id)">Delete</button>

                    <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllQuotes">
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
import QuoteDataService from "../../services/QuoteDataService";
import swal from "sweetalert";

export default {
    name: "list-quotes",
    data() {
        return {
            loading: false,
            quotes: [],
            currentQuote: null,
            currentIndex: -1,
            code: ""
        };
    },
    methods: {
        retrieveQuotes() {
            this.loading = true;
            QuoteDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.quotes = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveQuotes();
            this.currentQuote = null;
            this.currentIndex = -1;
        },

        setActiveQuote(quote, index) {
            console.log(quote);
            this.currentQuote = quote;
            this.currentIndex = index;
        },

        deleteQuote(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    QuoteDataService.delete(id)
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

        removeAllQuotes() {
            QuoteDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchCode() {
            QuoteDataService.findByCode(this.code)
                .then(response => {
                    this.quotes = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveQuotes();
    },
};
</script>