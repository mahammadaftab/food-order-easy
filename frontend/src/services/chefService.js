import API from '../config/api';

// Get all chefs
export const getChefs = async () => {
  try {
    const res = await API.get('/chefs');
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch chefs');
  }
};

// Get single chef
export const getChefById = async (id) => {
  try {
    const res = await API.get(`/chefs/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch chef');
  }
};

// Create a new chef (admin only)
export const createChef = async (chefData) => {
  try {
    const res = await API.post('/chefs', chefData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to create chef');
  }
};

// Update a chef (admin only)
export const updateChef = async (id, chefData) => {
  try {
    const res = await API.put(`/chefs/${id}`, chefData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to update chef');
  }
};

// Delete a chef (admin only)
export const deleteChef = async (id) => {
  try {
    const res = await API.delete(`/chefs/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to delete chef');
  }
};