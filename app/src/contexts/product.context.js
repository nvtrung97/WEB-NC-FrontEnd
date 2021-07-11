import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.service';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
    async function getHighlightWeek() {
        const response = await api.post('/products/highlight-of-week');
        return response;
    }
    async function mostOfViews() {
        const response = await api.post('/products/most-of-view');
        return response;
    }
    async function getLastest() {
        const response = await api.post('/products/lastest');
        return response;
    }
    return (
        <ProductContext.Provider value={{ getHighlightWeek, mostOfViews, getLastest }}>
            {children}
        </ProductContext.Provider>
    );
};

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within an ProductProvider.');
    }
    return context;
}
export default ProductContext;