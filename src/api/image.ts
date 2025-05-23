import axiosInstance from './axiosInstance';

interface ImageUploadResponse {
  url: string;
}

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await axiosInstance.post<ImageUploadResponse>('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error: any) {
    console.error('Upload Failed: ', error.response?.data || error.message);
    throw error;
  }
};
