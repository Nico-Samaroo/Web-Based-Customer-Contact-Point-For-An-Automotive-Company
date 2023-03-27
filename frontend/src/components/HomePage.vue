<template>
    
    <!-- Rental Hero Section Begin -->
    <section class="hero spad set-bg" style="background-image: url('assets/img/hero-bg.jpg');">
        <div class="container">
            <div class="row">
                <div class="col-lg-7">
                    <div class="hero__text" style="padding-top: 0;">
                        <div class="hero__text__title">
                            <span>RENT YOUR DREAM CAR</span>
                            <h2>Porsche Cayenne S</h2>
                        </div>
                        <div class="hero__text__price">
                            <div class="car-model">Model 2019</div>
                            <h2>$399<span>/Day</span></h2>
                        </div>
                        <!-- <a href="#" class="primary-btn"><img src="assets/img/wheel.png" alt=""> Test Drive</a> -->
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="hero__tab">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Car Rental</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                <div class="hero__tab__form">
                                    <div v-if="rentalStep1" id="rentalStep1">
                                        <h4 class="mb-3">Please choose vehicle:</h4>
                                            <Select2 
                                                v-model="rental.vehicle" 
                                                :options="vehicleOptions" 
                                                :settings="{ width: '100%' }"
                                                @select="selectedVehicle($event)"
                                                class="mb-3">
                                            </Select2>
                                            <!-- <pre v-if="vehicleOptions">{{ vehicleOptions || json }}</pre> -->
                                    </div>
                                    <div v-if="rentalStep2" id="rentalStep1">
                                        <h4 class="mb-3">Please choose Pick-up and Return dates/times</h4>
                                        <div v-if="selectedVehicleInfo" class="panel mb-2">
                                            <div class="panel-body"><strong>Vehicle: </strong>{{ selectedVehicleInfo }}</div>
                                        </div>

                                        <label for="begin">Pick-Up Date/Time</label>
                                        <input type="date" v-model="beginDate" @change="makeTime" class="form-control mb-3" name="begin" id="begin">
                                        <input type="time" v-model="beginTime" @change="makeTime" class="form-control mb-3" name="begin_time" id="beginTime">

                                        <div class="text-center mb-3">----to----</div>

                                        <label for="end">Return Date/Time</label>
                                        <input type="date" v-model="endDate" @change="makeTime" class="form-control mb-3" name="end" id="end">
                                        <input type="time" v-model="endTime" @change="makeTime" class="form-control mb-3" name="end_time" id="endTime">

                                        <!-- <pre>{{ rental || json }}</pre> -->
                                        <button @click="createRental" class="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Rental Hero Section End -->

    <!-- Services Section Begin -->
    <section class="services spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <span>Our Services</span>
                        <h2>Auto Repair</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-1.png" alt=""> -->
                        <h5>Oil Change - $100</h5>
                        <p>Over time, the fast-moving parts breakdown the oil and lessen its ability to absorb heat and lubricate the engine. Skipping an oil change leads to the vehicle's oil thinning over time and catching a build-up of metal, dirt, and other particles. Get your oil changed at N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-2.png" alt=""> -->
                        <h5>Brake Repair - $120</h5>
                        <p>Regular brake checks give you the chance to fix small problems before they become bigger. However, too much time between services, can cause brake pads to wear away completely, damaging your brake disks every time you come to a stop. Get your brakes checked and repaired at N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-3.png" alt=""> -->
                        <h5>Alignment - $110</h5>
                        <p>Tire alignment, also known as wheel alignment, can help your tires perform properly and help them last longer. It can also improve handling and keep your vehicle from pulling in one direction or vibrating strangely on the road.  Get your tires aligned at N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <h2>Car Wash</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-1.png" alt=""> -->
                        <h5>Buff and Polish - $1000</h5>
                        <p>Buffing or polishing a vehicle correctly allows you to take away or remove a number of defects, such as small scratches, etching and oxidation. Get your car buffed and polished at N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-2.png" alt=""> -->
                        <h5>Inside and Outside Wash - $400</h5>
                        <p>Keeping your vehicle clean and shiny with regular carwashes is an investment for the future. Regular carwashes help protect your vehicle from grime, mud, and other corrosive debris that can lead to rust, faded paint and more. Get a complete car wash N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-3.png" alt=""> -->
                        <h5>Shampoo Upholstery - $500</h5>
                        <p>Give your regular car interior cleaning as this can help you avoid health issues and other issues associated with low indoor air quality. Get an interior car wash/shampoo at N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <h2>Body Shop</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-1.png" alt=""> -->
                        <h5>Rim Repair - $250</h5>
                        <p>Repairing your alloy wheels is generally cheaper than having to replace them, especially if there's only a few small scratches or dents that can be repaired with ease. Get your rims repaired at N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-2.png" alt=""> -->
                        <h5>Polish Headlights - $100</h5>
                        <p>Plastic lenses can become dull, scratched and yellow over time. Polishing headlights will clear the haze and save money on replacements lights. Get your headlights polished at N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-3.png" alt=""> -->
                        <h5>Ceramic coating - $2000</h5>
                        <p>Ceramic coating will protect your car's paint from oxidizing, preventing it from fading and wearing a dull look. Get your car ceramic coated at N Auto Today!</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="services__item">
                        <!-- <img src="assets/img/services/services-3.png" alt=""> -->
                        <h5>Collision Repairs</h5>
                        <p>Price based on uploading picture(s) to get a quote.</p>
                        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Services Section End -->

    <!-- Appointment Hero Section Begin -->
    <section class="hero spad set-bg" style="background-image: url('assets/img/hero-bg-2.jpg');">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="hero__text" style="padding-top: 0;">
                        <div class="hero__text__title">
                            <span>NEED A SERVICE?</span>
                            <h2>We are at your service</h2>
                        </div>
                        <div class="mb-2">
                            <h2 style="color: #FFFFD8;">Create an appointment today!</h2>
                        </div>
                        <router-link class="primary-btn mt-4" to="/appointment/create">Create Appointment</router-link>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
    <!-- Appointment Hero Section End -->

    <!-- Feature Section Begin -->
    <section class="feature spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="feature__text">
                        <div class="section-title">
                            <span>About Us</span>
                            <h2>We Are a Trusted Name In Auto</h2>
                        </div>
                        <div class="feature__text__desc">
                            <p>‘N Auto’ is an automotive repair, wash bay and body repair provider. </p>
                            <p>The complete satisfaction of our valued customers is our highest priority. Contact us, Visit us or Book an appointment online Today!</p>
                        </div>
                        <!-- <div class="feature__text__btn">
                            <a href="#" class="primary-btn">About Us</a>
                            <a href="#" class="primary-btn partner-btn">Our Partners</a>
                        </div> -->
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-4">
                    <div class="row">
                        <div class="col-lg-6 col-md-4 col-6">
                            <div class="feature__item">
                                <div class="feature__item__icon">
                                    <img src="assets/img/feature/feature-1.png" alt="">
                                </div>
                                <h6>Engine</h6>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-4 col-6">
                            <div class="feature__item">
                                <div class="feature__item__icon">
                                    <img src="assets/img/feature/feature-2.png" alt="">
                                </div>
                                <h6>Turbo</h6>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-4 col-6">
                            <div class="feature__item">
                                <div class="feature__item__icon">
                                    <img src="assets/img/feature/feature-3.png" alt="">
                                </div>
                                <h6>Cooling</h6>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-4 col-6">
                            <div class="feature__item">
                                <div class="feature__item__icon">
                                    <img src="assets/img/feature/feature-4.png" alt="">
                                </div>
                                <h6>Suspension</h6>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-4 col-6">
                            <div class="feature__item">
                                <div class="feature__item__icon">
                                    <img src="assets/img/feature/feature-5.png" alt="">
                                </div>
                                <h6>Electrical</h6>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-4 col-6">
                            <div class="feature__item">
                                <div class="feature__item__icon">
                                    <img src="assets/img/feature/feature-6.png" alt="">
                                </div>
                                <h6>Brakes</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Feature Section End -->

    <!-- Car Section Begin -->
    <section class="car spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <span>Parts available</span>
                        <h2>Best Prices In The Region</h2>
                    </div>
                    <!-- <ul class="filter__controls">
                        <li class="active" data-filter="*">Most Researched</li>
                        <li data-filter=".sale">Latest on sale</li>
                    </ul> -->
                </div>
            </div>
            <div class="row car-filter">
                <div v-for="(part, index) in parts" :key="index" class="col-lg-3 col-md-4 col-sm-6 mix">
                    <div class="car__item">
                        <div class="car__item__pic__slider">
                            <img src="assets/img/cars/car-1.jpg" alt="">
                        </div>
                        <div class="car__item__text">
                            <div class="car__item__text__inner">
                                <div class="label-date">Code: {{ part.code }}</div>
                                <h5>{{ part.name }}</h5>
                            </div>
                            <div class="car__item__price">
                                <button class="car-option" @click="addToCart(part)">Add to cart</button>
                                <h6 class="text-right">${{ part.price.toFixed(2) }}&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Car Section End -->

    <!-- Footer Section Begin -->
    <footer class="footer set-bg" style="background-image: url('assets/img/footer-bg.jpg');">
        <div class="container">
            <div class="footer__contact">
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="footer__contact__title">
                            <h2>Contact Us Now!</h2>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="footer__contact__option">
                            <div class="option__item"><i class="fa fa-phone"></i> (+1 868) 555 6789</div>
                            <div class="option__item email"><i class="fa fa-envelope-o"></i> n_auto_business@gmail.com</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-4">
                    <div class="footer__about">
                        <div class="footer__logo">
                            <a href="#"><img src="assets/img/footer-logo.png" alt=""></a>
                        </div>
                        <p>Visit Us in store at 25 Engine Road, San Fernando </p>
                        <p>or at 12 Turbo Street, Port of Spain </p>
                        <div class="footer__social">
                            <a href="https://www.facebook.com/ronstt/" class="facebook"><i class="fa fa-facebook"></i></a>
                            <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                            <a href="#" class="google"><i class="fa fa-google"></i></a>
                            <a href="#" class="skype"><i class="fa fa-skype"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 offset-lg-1 col-md-3">
                    <div class="footer__widget">
                        <h5>Directions</h5>
                        <ul>
                            <li><a href="https://www.google.com/maps/place/RONS/@10.2584428,-61.4642624,17z/data=!3m1!4b1!4m6!3m5!1s0x8c358c4a2fae4917:0x98af7064dd240247!8m2!3d10.2584375!4d-61.4616875!16s%2Fg%2F11g6ns23lv"><i class="fa fa-angle-right"></i> San Fernando Location</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Port of Spain Location</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3">
                    <div class="footer__widget">
                        <h5>Infomation</h5>
                        <ul>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Rentals</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Services</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Quotes</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="footer__brand">
                        <h5>Top Brands</h5>
                        <ul>
                            <li><a href="#"><i class="fa fa-angle-right"></i> 555</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> NGK</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Bosch</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Lucas</a></li>
                        </ul>
                        <ul>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Wagner</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Rain-X</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Castrol</a></li>
                            <li><a href="#"><i class="fa fa-angle-right"></i> Shell</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            <div class="footer__copyright__text">
                <p>Copyright &copy; {{ date }} All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
             </div>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
        </div>
    </footer>
    <!-- Footer Section End -->

    <!-- Search Begin -->
    <div class="search-model">
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div class="search-close-switch">+</div>
            <form class="search-model-form">
                <input type="text" id="search-input" placeholder="Search here.....">
            </form>
        </div>
    </div>
    <!-- Search End -->
</template>

<script>
import PartDataService from "../services/PartDataService";
import CartDataService from "../services/CartDataService";
import VehicleDataService from "../services/VehicleDataService";
import RentalDataService from "../services/RentalDataService";
import VueJwtDecode from "vue-jwt-decode";
import swal from "sweetalert";
import Select2 from "vue3-select2-component";

export default {
    name: "home-page",
    components: {
        Select2
    },
    data() {
        return {
            loading: false,
            parts: [],
            vehicles: [],
            vehicleOptions: [{
                text: null,
                id: null
            }],
            date: new Date().getFullYear(),
            rentalStep1: true,
            rentalStep2: false,
            rental: {},
            selectedVehicleInfo: null,
            beginDate: null,
            beginTime: null,
            endDate: null,
            endTime: null
        }
    },
    methods: {
        selectedVehicle(vehicleInfo) {
            this.selectedVehicleInfo = vehicleInfo.text;
            this.rentalStep1 = false;
            this.rentalStep2 = true;
        },

        makeTime() {
            this.rental.begin = this.beginDate +'T'+ this.beginTime;
            this.rental.end = this.endDate +'T'+ this.endTime;
        },

        createRental() {
            RentalDataService.create(this.rental)
                .then(response => {
                    this.rental.id = response.data.id;
                    // console.log(response.data);
                    
                    //show alert
                    swal({
                        title: "Reservation Created!",
                        text: "Thank you for your reservation. Our team would be in touch.",
                        icon: "info",
                        buttons: {
                            cancel: false,
                            confirm: true,
                        },
                    });

                    //reset rental
                    this.rental = {};
                    this.rentalStep1 = true;
                    this.rentalStep2 = false;
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

        retrieveVehicles() {
            this.loading = true;
            VehicleDataService.getAll()
                .then(response => {
                    this.loading = false;
                    const vehicles = response.data;
                    this.vehicles = vehicles;
                    // console.log(response.data);

                    if(this.vehicles) {
                        // console.log(this.vehicles);
                        for (let index = 0; index < vehicles.length; index++) {
                            const vehicle = vehicles[index];
                            let option = {
                                text: vehicle.license_no + ' - ' + vehicle.make+ ' '+ vehicle.model + ' ' + vehicle.rental_price + ' /day',
                                id: vehicle.id
                            }
                            if(vehicle.rental) {
                                this.vehicleOptions.push(option);
                            }                  
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },

        addToCart(part) {
            swal({
                title: "Are you sure?",
                text: "Purchase Part",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmed) => {
                if(confirmed) {
                    let token = localStorage.getItem("jwt");
                    let decoded = VueJwtDecode.decode(token);
                    let cart = {
                        userId: decoded._id,
                        parts: {
                            partId: part.id,
                            quantity: 1,
                            name: part.name,
                            price: part.price
                        },
                    };

                    CartDataService.create(cart)
                        .then(response => {
                            swal({
                                title: "Cart Updated",
                                text: "Please check your cart",
                                buttons: true,
                                dangerMode: false,
                            })
                            console.log(response.data);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
        }
    },
    mounted() {
        this.retrieveParts();
        this.retrieveVehicles();
    },
};


</script>