<template>
    <div class="container">
        <div class="row">
            <div class="col-12">

                <div class="mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" required v-model="service.name" name="name" />
                </div>

                <button type="submit" class="btn btn-success" @click="createService">
                    Create
                </button>

            </div>
        </div>
    </div>
</template>

<script>
import ServiceDataService from "../../services/ServiceDataService";

export default {
    name: "create-service",
    data() {
        return {
            service: {
                name: '',
            },
        };
    },
    methods: {

        createService() {
            ServiceDataService.create(this.service)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "list-services" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
    mounted() {
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>