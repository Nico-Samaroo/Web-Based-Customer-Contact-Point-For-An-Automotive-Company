<template>
    <div class="container">
        <div class="row">
            <div v-if="service" class="edit-form">
                <h4>Editing: {{ service.name }}</h4>
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" required v-model="service.name" name="name" />
                </div>

                <button class="btn btn-danger" @click="deleteService">
                    Delete
                </button>

                <button type="submit" class="btn btn-success mx-4" @click="updateService">
                    Update
                </button>

            </div>

            <div v-else>
                <br />
                <p>Please click on a Service...</p>
            </div>
        </div>
    </div>
</template>

<script>
import ServiceDataService from "../../services/ServiceDataService";
import swal from "sweetalert";

export default {
    name: "update-service",
    data() {
        return {
            service: null,
        };
    },
    methods: {
        getService(id) {
            ServiceDataService.get(id)
                .then(response => {
                    this.service = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateService() {
            ServiceDataService.update(this.service.id, this.service)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'list-services' })
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteService() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    ServiceDataService.delete(this.service.id)
                        .then(response => {
                            console.log(response.data);
                            this.$router.push({ name: 'list-services'})
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
        },
    },
    mounted() {
        this.getService(this.$route.params.id);
    }
};
</script>

<style>
input {
    margin-bottom: 2rem;
}
</style>
