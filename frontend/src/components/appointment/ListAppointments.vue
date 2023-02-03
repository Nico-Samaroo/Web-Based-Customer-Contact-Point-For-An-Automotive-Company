<template>
    <div class="row">
        <div v-if="loading" class="col-12">Loading...</div>
    </div>
    <div class="row">
        <div class="col-12">
            
        </div>
    </div>
</template>

<script>
import AppointmentDataService from "../../services/AppointmentDataService";
import swal from "sweetalert";

export default {
    name: "list-appointments",
    data() {
        return {
            loading: false,
            appointments: [],
            currentAppointment: null,
            currentIndex: -1,
            license_no: ""
        };
    },
    methods: {
        retrieveAppointments() {
            this.loading = true;
            AppointmentDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.appointments = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveAppointments();
            this.currentAppointment = null;
            this.currentIndex = -1;
        },

        setActiveAppointment(appointment, index) {
            console.log(appointment);
            this.currentAppointment = appointment;
            this.currentIndex = index;
        },

        deleteAppointment(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    AppointmentDataService.delete(id)
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

        removeAllAppointments() {
            AppointmentDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchLicenseNo() {
            AppointmentDataService.findByLicenseNo(this.license_no)
                .then(response => {
                    this.appointments = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveAppointments();
    },
};
</script>