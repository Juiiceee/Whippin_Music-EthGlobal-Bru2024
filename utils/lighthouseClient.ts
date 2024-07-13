import axios from 'axios';

async function uploadFiles(songFile: File, imageFile: File, title: string, author: string, userId: string) {
  const formData = new FormData();
  formData.append('song', songFile);
  formData.append('image', imageFile);
  formData.append('title', title);
  formData.append('author', author);
  formData.append('userId', userId);

  try {
    const response = await axios.post('http://localhost:3001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
}

export { uploadFiles };
