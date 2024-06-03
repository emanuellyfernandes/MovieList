import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};


export const createProfile = async (userId, name, description) => {
  try {
    const response = await api.post('/profiles', { userId, name, description });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Ocorreu um erro desconhecido ao criar o perfil');
    }
  }
};


export const fetchProfiles = async (userId) => {
  try {
    const response = await api.get(`/profiles/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Retorne um array vazio se o erro for 404
      return [];
    } else {
      throw error;
    }
  }
};


export const deleteProfile = async (profileId) => {
  try {
    await api.delete(`/profiles/${profileId}`);
  } catch (error) {
    console.error('API Error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Ocorreu um erro desconhecido ao excluir o perfil');
    }
  }
};