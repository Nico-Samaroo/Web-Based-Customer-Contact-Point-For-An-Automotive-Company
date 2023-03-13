<template>
    <div class="container">
        <div class="row">
            <div class="edit-form">

                <div class="mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" required v-model="part.name" name="name" />
                </div>

                <div class="mb-3">
                    <label for="code">Code</label>
                    <input type="text" class="form-control" id="code" required v-model="part.code" name="code" />
                </div>

                <div class="mb-3">
                    <label for="amount">Amount</label>
                    <input type="number" class="form-control" id="amount" required v-model="part.amount"
                        name="amount" />
                </div>

                <div class="mb-3">
                    <label for="price">Price</label>
                    <input class="form-control" id="price" required v-model="part.price" name="price" />
                </div>

                <button type="submit" class="btn btn-success" @click="createPart">
                    Create
                </button>

            </div>
        </div>
    </div>

</template>

<script>
import PartDataService from "../../services/PartDataService";

export default {
    name: "create-part",
    data() {
        return {
            part: {
                code: '',
                name: '',
                amount: '',
            },
            parts: []
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

        createPart() {
            PartDataService.create(this.part)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "list-parts" });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deletePart() {
            PartDataService.delete(this.part.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "parts" });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        let part = this.$route.params.id;
        if(part) {
            this.getPart(part);
        } else {
            this.retrieveParts();
        }
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>