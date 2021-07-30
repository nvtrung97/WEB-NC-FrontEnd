import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {

  async function getCategory() {
    const response = await api.get('/categories');
    return response;
  }
  async function createCategory(entity) {
    const response = await api.post('admin/categories', entity);
    return response;
  }
  async function updateCategory(id, entity) {
    const response = await api.put(`admin/categories/${id}`, entity);
    return response;
  }
  async function deleteCategory(id) {
    const response = await api.delete(`admin/categories/${id}`);
    return response;
  }
  return (
    <CategoryContext.Provider value={{ getCategory, createCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within an CategoryProvider.');
  }
  return context;
}

export default CategoryContext;
