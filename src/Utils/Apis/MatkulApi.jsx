// src/Utils/Apis/MatkulApi.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/matkul"; // Ganti sesuai endpoint server kamu

export const getAllMatkul = () => axios.get(API_URL);
export const storeMatkul = (data) => axios.post(API_URL, data);
export const updateMatkul = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMatkul = (id) => axios.delete(`${API_URL}/${id}`);
