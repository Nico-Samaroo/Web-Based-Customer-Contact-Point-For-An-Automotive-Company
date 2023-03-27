<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
                <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                    <h6>Upload image</h6>
                    <div class="dropbox">
                    <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/*" class="input-file">
                        <p v-if="isInitial">
                        Drag your file(s) here to begin<br> or click to browse
                        </p>
                        <p v-if="isSaving">
                        Uploading {{ fileCount }} files...
                        </p>
                    </div>
                </form>

                <img v-if="quoteImage" :src="quoteImage" alt="image">

                <!--SUCCESS-->
                <div v-if="isSuccess">
                    <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
                    <p>
                        <a href="javascript:void(0)" @click="reset()">Upload again</a>
                    </p>
                    <ul class="list-unstyled">
                        <li v-for="(item, index) in uploadedFiles" :key="index">
                            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
                        </li>
                    </ul>
                </div>
                <!--FAILED-->
                <div v-if="isFailed">
                    <h2>Uploaded failed.</h2>
                    <p>
                        <a href="javascript:void(0)" @click="reset()">Try again</a>
                    </p>
                    <pre>{{ uploadError }}</pre>
                </div>
            </div>
            <div class="col-8">

                <div class="mb-3">
                    <label for="name">Which one of your vehicles is damaged?</label>
                    <Select2 
                        v-model="quote.vehicle" 
                        :options="vehicleOptions" 
                        :settings="{ width: '100%' }"
                        class="mb-3">
                    </Select2>
                </div>

                <div class="mb-3">
                    <label for="code">Select body shop service required</label>
                    <Select2 
                        v-model="quote.service" 
                        :options="serviceOptions" 
                        :settings="{ width: '100%' }"
                        class="mb-3">
                    </Select2>
                </div>

                <div class="mb-3">
                    <label for="description">Description of body damage</label>
                    <input type="text" class="form-control" id="description" required v-model="quote.description"
                        name="description" />
                </div>

                <button type="submit" class="btn btn-success" @click="createQuote">
                    Create
                </button>

            </div>
        </div>
    </div>

</template>

<script>
import QuoteDataService from "../../services/QuoteDataService";
import VehicleDataService from "../../services/VehicleDataService";
import ServiceDataService from "../../services/ServiceDataService";
import { upload } from '../../services/FileUploadService';
// import VueJwtDecode from "vue-jwt-decode";
// import swal from "sweetalert";
import Select2 from "vue3-select2-component";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
    name: "create-quote",
    components: {
        Select2
    },
    data() {
        return {
            quote: {
                image: '',
                vehicle: '',
                service: '',
                description: '',
            },
            vehicleOptions: [{
                text: null,
                id: null
            }],
            serviceOptions: [{
                text: null,
                id: null
            }],

            //upload
            quoteImage: null,
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'file'
        };
    },
    computed: {
        isInitial() {
            return this.currentStatus === STATUS_INITIAL;
        },
        isSaving() {
            return this.currentStatus === STATUS_SAVING;
        },
        isSuccess() {
            return this.currentStatus === STATUS_SUCCESS;
        },
        isFailed() {
            return this.currentStatus === STATUS_FAILED;
        }
    },
    methods: {
        reset() {
            // reset form to initial state
            this.currentStatus = STATUS_INITIAL;
            this.uploadedFiles = [];
            this.uploadError = null;
        },

        save(formData) {
            // upload data to the server
            this.currentStatus = STATUS_SAVING;

            upload(formData)
                .then(data => {
                    console.log(data);
                    this.quote.image = data.file.filename;
                    var image = this.downloadImage('http://localhost:8082/api/quotes/download-image/' + data.file.filename);
                    console.log(image.width);

                    // this.uploadedFiles = [].concat(x);
                    this.currentStatus = STATUS_SUCCESS;
                })
                .catch(err => {
                    this.uploadError = err.response;
                    this.currentStatus = STATUS_FAILED;
                });
        },

        async downloadImage(url) {
            try {
                const response = await fetch(url, {
                    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                        'Content-Type': 'image/jpeg'
                    }
                })
                const blob = await response.blob()
                return [URL.createObjectURL(blob), null];
            }
            catch (error) {
                console.error(`get: error occurred ${error}`);
                return [null, error]
            }
        },

        retrieveVehicles() {
            this.loading = true;
            VehicleDataService.getAll()
                .then(response => {
                    this.loading = false;
                    const vehicles = response.data;
                    // console.log(response.data);

                    if(vehicles) {
                        // console.log(this.vehicles);
                        for (let index = 0; index < vehicles.length; index++) {
                            const vehicle = vehicles[index];
                            let option = {
                                text: vehicle.license_no,
                                id: vehicle.id
                            }
                            this.vehicleOptions.push(option);     
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },

        retrieveServices() {
            this.loading = true;
            ServiceDataService.getAll()
                .then(response => {
                    this.loading = false;
                    const services = response.data;
                    // console.log(response.data);

                    for (let index = 0; index < services.length; index++) {
                        const service = services[index];
                        let option = {
                            text: service.name,
                            id: service.id
                        }
                        this.serviceOptions.push(option);                
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },

        filesChange(fieldName, fileList) {
            // handle file changes
            const formData = new FormData();

            if (!fileList.length) return;

            // append the files to FormData
            Array
                .from(Array(fileList.length).keys())
                .map(x => {
                    formData.append(fieldName, fileList[x], fileList[x].name);
                });

            // save it
            this.save(formData);
        },

        createQuote() {
            QuoteDataService.create(this.quote)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "list-quotes" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.reset();
        this.retrieveVehicles();
        this.retrieveServices();
    }
};
</script>


<style>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>