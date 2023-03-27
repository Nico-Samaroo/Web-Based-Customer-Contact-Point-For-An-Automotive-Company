<template>
    <div class="container">
    <div class="row">
        <div v-if="loading" class="col-12">Loading...</div>
    </div>
    <div v-if="customer" class="list row">
        <div class="col-md-12">
            <h4>Email User: {{ customer.first_name }} {{ customer.last_name }}</h4>
        </div>
        <div class="col-md-12">
            <ul class="list-group">
                <li class="list-group-item">FROM: <strong>{{ email.from }}</strong></li>
                <li class="list-group-item">TO: <strong>{{ customer.email }}</strong></li>
                <li v-if="vehicle" class="list-group-item">SUBJECT: <strong>N Auto Reminder: Vehicle To Service Soon - {{ vehicle.license_no }}</strong></li>
                <li v-if="vehicleOptions" class="list-group-item">
                    PLEASE SELECT VEHICLE: 
                    <Select2 
                        v-model="email.vehicle" 
                        :options="vehicleOptions" 
                        :settings="{ width: '100%' }"
                        @select="selectedVehicle($event)"
                        class="mb-3">
                    </Select2>
                </li>
                <li v-if="vehicleOptions" class="list-group-item">
                    PLEASE SELECT A SERVICE: 
                    <Select2 
                        :options="serviceOptions" 
                        :settings="{ width: '100%' }"
                        @select="selectedService($event)"
                        class="mb-3">
                    </Select2>
                </li>

                <li v-if="vehicleOptions" class="list-group-item">
                    PLEASE ENTER A DATE AND TIME:
                    <div class="row">
                        <div class="col">
                            <input v-model="date" @change="updateContent" type="date" name="date" id="date">
                        </div>
                        <div class="col">
                            <input v-model="time" @change="updateContent" type="time" name="time" id="time">
                        </div>
                    </div>
                    

                </li>
                
            </ul>
            <!-- <pre>{{ email || json }}</pre> -->
            <div v-if="customer && vehicle && service && date && time" class="col-sm-6 offset-sm-3">
                <div class="card my-4">
                    <div class="card-body">
                        <div class="card-title">
                            How your email would look
                        </div>
                        <p class="card-text">"Hi {{ customer.first_name }},<br> Our system shows your vehicle, {{ vehicle?.license_no }}, is need of service. The service required is {{ service?.name }}. We recommend coming in on {{ date }} at {{ time }}, to complete this service and keep up your routine maintenance. Thank you and hope to see you soon!"</p>

                        <button @click="sendEmail" class="btn btn-block btn-primary">Send</button>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
    </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
import VehicleDataService from "../../services/VehicleDataService";
import ServiceDataService from "../../services/ServiceDataService";
import swal from 'sweetalert';
import Select2 from "vue3-select2-component";
// import nodemailer from "nodemailer";

export default {
    name: "email-user",
    components: {
        Select2
    },
    data() {
        return {
            loading: false, 
            customer: null,
            vehicle: null,
            service: null,
            date: null,
            time: null,
            vehicleOptions: [{
                text: null,
                id: null
            }],
            serviceOptions: [{
                text: null,
                id: null
            }],
            email: {
                from: 'n_auto_business@gmail.com',
                to: '',
                subject: '',
                content: '',
            }
        };
    },
    methods: {

        getCustomer(id) {
            this.loading = true;
            UserDataService.get(id)
                .then(response => {
                    let customer = response.data;
                    this.customer = customer;
                    this.email.to = customer.email;
                    this.loading = false;
                    // console.log(response.data);  
                    this.retrieveVehicles();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        
        selectedVehicle(vehicleInfo) {
            const numberPlate = vehicleInfo.text;
            this.updateSubject(numberPlate);

            this.vehicle = {
                license_no: numberPlate,
            }
        },
        
        selectedService(serviceInfo) {
            this.service = {
                name: serviceInfo.text,
            }
        },
        updateSubject(vehicleNumber) {
            this.email.subject = "N Auto Reminder: Vehicle To Service Soon - "+ vehicleNumber;
        },
        updateContent() {
            this.email.content = "Hi "+ this.customer?.first_name +" Our system shows your vehicle, "+ this.vehicle?.license_no +", is need of service. The service required is "+ this.service?.name +". We recommend coming in on "+ this.date +" at "+ this.time +", to complete this service and keep up your routine maintenance. Thank You and hope to see you soon!";
        },
        
        retrieveVehicles() {
            VehicleDataService.getByCustomerId(this.customer.id)
                .then(response => {
                    const vehicles = response.data;
                    this.vehicles = vehicles;
                    // console.log(response.data);

                    if(this.vehicles) {
                        // console.log(this.vehicles);
                        for (let index = 0; index < vehicles.length; index++) {
                            const vehicle = vehicles[index];
                            let option = {
                                text: vehicle.license_no,
                                id: vehicle.id
                            }
                            if(vehicles) {
                                this.vehicleOptions.push(option);
                            }                  
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        
        retrieveServices() {
            ServiceDataService.getAll()
                .then(response => {
                    const services = response.data;
                    this.services = services;
                    // console.log(response.data);

                    if(this.services) {
                        // console.log(this.vehicles);
                        for (let index = 0; index < services.length; index++) {
                            const service = services[index];
                            let option = {
                                text: service.name,
                                id: service.id
                            }
                            if(services) {
                                this.serviceOptions.push(option);
                            }                  
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },


        sendEmail() {
            UserDataService.sendEmail(this.email)
                .then(res => {
                    console.log(res);

                    swal({
                        title: "Customer Informed",
                        text: "They would receive their email momentarily!",
                        icon: "success",
                    })
                    .then(() => {
                        this.date = null;
                    });
                });
        }
    },
    mounted() {
        this.getCustomer(this.$route.params.id);
        this.retrieveServices();
    },
};
</script>