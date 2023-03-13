import http from "../http-common";

class FileUploadService {

  upload(formData) {
    return (
        http.post('/parts/upload-image', formData)
            // get data
            .then((x) => x.data)
            // add url field
            .then((x) =>
                x.map((img) => Object.assign({}, img, { url: `./images/${img.id}` }))
            )
    );
  }

}
/*
-The code starts by importing the http library.
Then it defines a function called upload, which takes in an object of form data and returns an HTTP request to post to the URL /parts/upload-image.
The code then gets the response from that request and assigns it to x, where x is a variable
.then((x) => x.data), The next line adds another field with the value "url" on top of each image's existing fields (id).
This is done using Object.assign().*/

export default new FileUploadService();
