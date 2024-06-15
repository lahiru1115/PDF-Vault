import AxiosInstance from "../utils/AxiosInstance";

export const uploadPdf = (formData, config) => AxiosInstance.post('/pdf/uploadPdf', formData, config);
export const listPdfs = () => AxiosInstance.get('/pdf/listPdfs');
export const getPdf = (id) => AxiosInstance.get(`/pdf/getPdf/${id}`, { responseType: 'arraybuffer' });