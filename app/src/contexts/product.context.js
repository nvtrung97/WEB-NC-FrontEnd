import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.service';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
    async function getHighlightWeek() {
        const response = await api.get('/products/highlight-of-week');
        return response;
    }
    async function mostOfViews() {
        const response = await api.get('/products/most-of-view');
        return response;
    }
    async function getLastest() {
        const response = await api.get('/products/lastest');
        return response;
    }
    async function getProductByQuery(Query) {
        const response = await api.get('/products/lastest', Query);
        return response;
    }
    return (
        <ProductContext.Provider value={{ getHighlightWeek, mostOfViews, getLastest,getProductByQuery }}>
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
