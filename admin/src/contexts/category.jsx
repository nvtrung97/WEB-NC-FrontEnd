import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      const response = await api.get('/categories');
      setCategoryList(response);
    }
    fetchCategory();
  }, []);
  async function createCategory(entity) {
    const response = await api.post('/categories', entity);
    return response;
  }
  return (
    <CategoryContext.Provider value={{ categories: categoryList, createCategory }}>
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
