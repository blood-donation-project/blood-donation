// src/services/locationService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL_PROVINCES;

const getProvinces = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/province`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getDistrictsByProvinceId = async (provinceId) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/district/?idProvince=${provinceId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getWardsByDistrictId = async (districtId) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/commune/?idDistrict=${districtId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getProvinces, getDistrictsByProvinceId, getWardsByDistrictId };
