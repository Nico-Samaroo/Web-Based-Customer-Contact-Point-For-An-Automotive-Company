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
                <!-- <div v-if="isSuccess">
                    <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
                    <p>
                        <a href="javascript:void(0)" @click="reset()">Upload again</a>
                    </p>
                    <ul class="list-unstyled">
                        <li v-for="(item, index) in uploadedFiles" :key="index">
                            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
                        </li>
                    </ul>
                </div> -->
                <!--FAILED-->
                <!-- <div v-if="isFailed">
                    <h2>Uploaded failed.</h2>
                    <p>
                        <a href="javascript:void(0)" @click="reset()">Try again</a>
                    </p>
                    <pre>{{ uploadError }}</pre>
                </div> -->
            </div>
            <div class="col-8">

                <div class="mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" required v-model="quote.name" name="name" />
                </div>

                <div class="mb-3">
                    <label for="code">Code</label>
                    <input type="text" class="form-control" id="code" required v-model="quote.code" name="code" />
                </div>

                <div class="mb-3">
                    <label for="amount">Amount</label>
                    <input type="number" class="form-control" id="amount" required v-model="quote.amount"
                        name="amount" />
                </div>

                <div class="mb-3">
                    <label for="price">Price</label>
                    <input class="form-control" id="price" required v-model="quote.price" name="price" />
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
import { upload } from '../../services/FileUploadServiceQuote';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
    name: "create-quote",
    data() {
        return {
            quote: {
                image: '',
                code: '',
                name: '',
                amount: '',
            },
            quotes: [],

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
                    // console.log(data);
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

        getQuote(id) {
            QuoteDataService.get(id)
                .then(response => {
                    this.quote = response.data;
                    // console.log(response.data);  
                })
                .catch(e => {
                    console.log(e);
                });
        },

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

        deleteQuote() {
            QuoteDataService.delete(this.quote.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "quotes" });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.reset();
        let quote = this.$route.params.id;
        if(quote) {
            this.getQuote(quote);
        } else {
            this.retrieveQuotes();
        }
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