import AxiosInstance from "../utils/AxiosInstance";

export const login = (values) => AxiosInstance.post('/auth/login', values);
export const signup = (values) => AxiosInstance.post('/auth/signup', values);
export const getUser = () => AxiosInstance.get('/auth/getUser');