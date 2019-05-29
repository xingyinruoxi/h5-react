import Axios from 'axios';
import queryString from 'querystringify';
export default  Axios.create({
    baseURL: "/jxtech-app",
    responseType: 'json',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
},
    transformRequest: [function (data) {
        return queryString.stringify(data);
    }]
});