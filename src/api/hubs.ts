import axios, { AxiosResponse } from "axios";
import { Hub } from "../types";

const API_URL = 'https://marketplace-demo.cleanhub.com/api/public/hubs';

export function getAllHubs(): Promise<AxiosResponse<Hub[]>> {
    return axios.get<Hub[]>(API_URL);
}