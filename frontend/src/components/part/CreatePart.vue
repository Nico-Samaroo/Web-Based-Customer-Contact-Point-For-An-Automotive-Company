<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
                <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                    <h6>Upload image</h6>
                    <div class="dropbox">
                    <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/*" class="input-file">
                        <p v-if="isInitial">
                        Drag your file(s) here to begin<br> or click to browse
                        </p>
                        <p v-if="isSaving">
                        Uploading {{ fileCount }} files...
                        </p>
 <!--  
 -The code starts with an input field for a file.
 -The type of the file is set to "file" and multiple is set to true, which means that there can be more than one file selected at a time.
 -Next, the name of the input field is specified as "uploadFieldName".
 -Then, in order to disable this button from being clicked on by accident, it has been given an attribute called disabled="isSaving".
 -This will prevent any click events from occurring when this button is active.
 -Next comes a change event listener that listens for changes made to the text inside of the input field.
 -When something happens (such as someone clicking on it), then filesChange($event.target.name, $event.target) will execute and update whatever was changed in both variables ($event and $target).
 -After updating these two variables with what happened during the event listener's execution, they are passed into another function called fileCount = $event.target .
 -This function simply counts how many files were selected by using JavaScript's built-in length property on each element in its argument list 
-->
                    </div>
                </form>
            </div>
            <div class="col-8">

                <div class="mb-3">
                </div>
                
                <div class="select-list-item">
                    <p>Which one of your cars is damaged? (Pulls data from Vehicles of customer that is logged in)</p>
                    <select>
                        <option data-display=" ">Select Car</option>
                        <option value="">PBB 1234</option>
                        <option value="">PCD 369</option>
                    </select>
                </div>
             
                    <div class="select-list-item">
                        <p>Select Body Shop Service Required</p>
                        <select>
                            <option data-display=" ">Select Service</option>
                            <option value="">Rim Repair</option>
                            <option value="">Polish Headlights</option>
                            <option value="">Ceramic Coating</option>
                        </select>
                    </div>

                <div class="mb-3">
                    <label for="code">Description of Body Damage</label>
                    <input type="text" class="form-control" id="code" required v-model="part.code" name="code" />
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
import FileUploadService from '../../services/FileUploadService';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
    name: "create-part",
    data() {
        return {
            part: {
                image: '',
                code: '',
                name: '',
                amount: '',
            },
            parts: [],

            //upload
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
        save(formData) {                            //saving the  data to a variable called formData.
            this.currentStatus = STATUS_SAVING;     
            FileUploadService.upload(formData)      // upload data to the server
                .then(x => {
                    this.uploadedFiles = [].concat(x);   
                    this.currentStatus = STATUS_SUCCESS;   //uploads the form data to the server and then displays a success message.
                })
                .catch(err => {
                    this.uploadError = err.response;  //check for errors
                    this.currentStatus = STATUS_FAILED;
                });
        },
        filesChange(fieldName, fileList) {
            // handle file changes
            const formData = new FormData();

            if (!fileList.length) return;  //checks to see if the fileList is empty

            // append the files to FormData
            Array
                .from(Array(fileList.length).keys())
                .map(x => {
                    formData.append(fieldName, fileList[x], fileList[x].name);   //append each of the files in fileList to formData with their name as key-value pairs 
                });

            // save it
            this.save(formData);
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
        this.reset();
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