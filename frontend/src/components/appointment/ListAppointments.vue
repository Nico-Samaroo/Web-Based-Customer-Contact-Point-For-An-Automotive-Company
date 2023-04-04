<template>
    <div class="container">
        <div class="row">
            <div v-if="loading" class="col-12">Loading...</div>
        </div>
        <div class="row">
            <div class="col-12">
                <!-- <pre>{{ appointments || json}}</pre> -->
                <vue-cal style="height: 800px" active-view="month" :events="appointments" :time-from="8 * 60" :time-to="19 * 60" :time-step="30" hide-weekends />
            </div>
        </div>
    </div>
</template>

<script>
import AppointmentDataService from "../../services/AppointmentDataService";
import swal from "sweetalert";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    name: "list-appointments",
    components: { VueCal },
    data() {
        return {
            loading: false,
            appointments: [],
        };
    },
    methods: {
        retrieveAppointments() {
            this.loading = true;
            AppointmentDataService.getAll()
                .then(response => {
                    this.loading = false;
                    this.appointments = response.data;
                    this.appointments.forEach(function (doc){
                        const beginDate = new Date(doc.begin);
                        const endMinutes = beginDate.getMinutes() + 40;
                        doc.start = beginDate.getFullYear()+"-"+(beginDate.getMonth()+1)+"-"+beginDate.getDate() + " " + beginDate.getHours() + ":" + beginDate.getMinutes() + ":" + beginDate.getSeconds();
                        doc.end = beginDate.getFullYear()+"-"+(beginDate.getMonth()+1)+"-"+beginDate.getDate() + " " + beginDate.getHours() + ":" + endMinutes + ":" + beginDate.getSeconds();
                        doc.title = doc.vehicle.license_no + " "+ doc.vehicle.make + " " + doc.vehicle.model;
                    });
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveAppointments();
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
    },
    mounted() {
        this.retrieveAppointments();
    },
};
</script>