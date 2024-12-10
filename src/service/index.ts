import { AxiosRequest } from "./request";

const baseURL = import.meta.env.VITE_BASE_API_URL;
const TIME_OUT = 6000;

export const request = new AxiosRequest({
  baseURL,
  timeout: TIME_OUT,
});
