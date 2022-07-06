import axios from "axios";
import {API_BASE_URL} from "../../utils/constants";

const DataProvider = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImxvZ2luIjoiNDU4MjU2MDAxMCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1MzM0Njg1MywiZXhwIjoxNjUzMzc1NjUzfQ.hjD9mNyVG0d74ejTKhVOFflJK5rM2n_355LPULhgvaI',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
});

export default DataProvider;