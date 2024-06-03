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

// Função para adicionar um filme à lista de favoritos
export async function addToFavorites(userId, profileId, movieId) {
  try {
    const response = await api.post(`/profiles/${profileId}/favorites`, { movieId });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Função para selecionar um perfil
export async function selectProfile(userId, profileId) {
  try {
    const response = await api.post(`/users/${userId}/select-profile`, { profileId });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const updateProfile = async (userId, profileId, updatedProfile) => {
  try {
    // Verifica se o usuário tem permissão para atualizar o perfil (lógica de permissão)

    // Encontra o perfil no banco de dados
    const response = await api.get(`/profiles/${profileId}`);
    const existingProfile = response.data;

    // Verifica se o perfil foi encontrado
    if (!existingProfile) {
      throw new Error('Profile not found');
    }

    // Verifica se o perfil pertence ao usuário
    if (existingProfile.userId !== userId) {
      throw new Error('You do not have permission to update this profile');
    }

    // Atualiza os campos do perfil com os novos valores fornecidos
    const updatedFields = { ...existingProfile, ...updatedProfile };

    // Salva as mudanças no banco de dados
    await api.put(`/profiles/${profileId}`, updatedFields);

    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    throw new Error('Error updating profile: ' + error.message);
  }
};