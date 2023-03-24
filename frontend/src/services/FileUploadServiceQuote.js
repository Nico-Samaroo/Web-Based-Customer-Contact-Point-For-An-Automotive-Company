import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api';

function upload(formData) {
    const url = `${BASE_URL}/quotes/upload-image`;
    
    return axios.post(url, formData)
        .then(response => response.data);
}

export { upload }