import { default as axios } from 'axios';

export interface FileUploadResponse {
    status: boolean
    image: string
}
const cloudinaryCloud = 'YOUR_CLOUD_KEY';

export const fileUpload = async (file: File): Promise<FileUploadResponse> => {
    try {
      if (!file) {
        return {
          status: false,
          image: '',
        };
      }
  
      const cloudURL = `https://api.cloudinary.com/v1_1/${cloudinaryCloud}/upload`;
      const formData = new FormData();
      formData.append('upload_preset', 'react-journal');
      formData.append('file', file);
  
      const response = await axios.post(cloudURL, formData);
  
      if (response.status >= 200 && response.status < 300) {
        return {
          status: true,
          image: response.data.url,
        };
      } else {
        console.error('Error en respuesta de Cloudinary:', response.data);
        return {
          status: false,
          image: '',
        };
      }
    } catch (error: any) {
      console.error('Error al subir archivo:', error.response?.data || error.message);
      return {
        status: false,
        image: '',
      };
    }
  };
  