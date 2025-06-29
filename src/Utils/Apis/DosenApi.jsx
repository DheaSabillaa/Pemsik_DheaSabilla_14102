// src/Utils/Apis/DosenApi.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/dosen"; // Ganti sesuai server kamu

export const getAllDosen = () => axios.get(API_URL);
export const storeDosen = (data) => axios.post(API_URL, data);
export const updateDosen = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteDosen = (id) => axios.delete(`${API_URL}/${id}`);
