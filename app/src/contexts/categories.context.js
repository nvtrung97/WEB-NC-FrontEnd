import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.service';

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      const response = await api.get('/categories');
      setCategoryList(response.data);
    }
    fetchCategory();
  }, []);

  async function mostRegisted() {
    const response = await api.get('/categories/most-registed');
    return response;
  }
  async function getCategoryList() {
    const response = await api.get('/categories');
    return response;
  }
  return (
    <CategoryContext.Provider value={{ categories: categoryList, mostRegisted, getCategoryList }}>
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
