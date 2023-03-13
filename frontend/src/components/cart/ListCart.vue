<template>
    <div class="container">
        <div class="row">
            <div class="row">
                <div v-if="loading" class="col-12">Loading...</div>
            </div>
            <div v-if="cart" class="list row">
                <div class="col-md-12">
                    <h4>Cart</h4>
                    <ul>
                        <li class="list-group-item"
                            v-for="(list, index) in cart" :key="index">
                            {{ list.part || json }}
                        </li>
                    </ul>
                    {{ cart || json }}

                    <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllCarts">
                Remove All
            </button> -->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import CartDataService from "../../services/CartDataService";
import VueJwtDecode from "vue-jwt-decode";
import swal from "sweetalert";

export default {
    name: "list-carts",
    data() {
        return {
            loading: false,
            cart: {},
        };
    },
    methods: {
        retrieveCart() {
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            this.loading = true;
            CartDataService.getByCustomer(decoded._id)
                .then(response => {
                    this.loading = false;
                    this.cart = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveCarts();
            this.currentCart = null;
            this.currentIndex = -1;
        },

        setActiveCart(cart, index) {
            console.log(cart);
            this.currentCart = cart;
            this.currentIndex = index;
        },

        deleteCart(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    CartDataService.delete(id)
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

        removeAllCarts() {
            CartDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchCode() {
            CartDataService.findByCode(this.code)
                .then(response => {
                    this.carts = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveCart();
    },
};
</script>