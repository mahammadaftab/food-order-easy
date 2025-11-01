import API from '../config/api';

// Get all menu items
export const getMenuItems = async (params = {}) => {
  try {
    const res = await API.get('/menu', { params });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch menu items');
  }
};

// Get single menu item by ID
export const getMenuItemById = async (id) => {
  try {
    const res = await API.get(`/menu/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch menu item');
  }
};

// Create a new menu item (admin only)
export const createMenuItem = async (menuItemData) => {
  try {
    const res = await API.post('/menu', menuItemData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to create menu item');
  }
};

// Update a menu item (admin only)
export const updateMenuItem = async (id, menuItemData) => {
  try {
    const res = await API.put(`/menu/${id}`, menuItemData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to update menu item');
  }
};

// Delete a menu item (admin only)
export const deleteMenuItem = async (id) => {
  try {
    const res = await API.delete(`/menu/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to delete menu item');
  }
};