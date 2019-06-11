//load 3rd party url fetch
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000/api'
});

