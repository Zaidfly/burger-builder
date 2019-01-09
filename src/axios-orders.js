import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-react-burger-f3.firebaseio.com/'
});

export default instance;