import axios from 'axios';
import {API_BASE_URL} from "../config";

const resource = {
    async getAll() {
        const { data } = await axios.get(`${API_BASE_URL}/transactions`);
        return data;
    },
    async getById(id) {
        const { data } = await axios.get(`${API_BASE_URL}/transactions/${id}`);
        return data;
    }
};

export default resource;
