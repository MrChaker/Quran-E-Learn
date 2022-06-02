import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export const usePost = (url: string) => {
  const [uploadProgress, setUploadProgress] = useState({
    visible: false,
    progress: 0,
  });

  const uploadFile = async (formData: FormData) => {
    /* const formData = new FormData();
    formData.append('video', video ? video : ''); */
    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 50;
          setUploadProgress({ visible: true, progress: progress });
        },
      });

      setUploadProgress({ visible: false, progress: 100 });
      return res.data;
    } catch (error: any) {
      setUploadProgress({ visible: false, progress: 0 });
      return error.response.data;
    }
  };

  return { uploadProgress, uploadFile };
};
