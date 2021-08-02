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
        const response = await api.get('/products', { params: Query });
        return response;
    }
    async function VideoPause(productId, VideoId) {
        let entity = { video_id: VideoId };
        const response = await api.put(`/products/${productId}/pause`, entity);
        return response;
    }
    async function getSearch(query) {
        console.log(query);
        let response;
        if (!query.keyword && query.category_id) {
            let params = { ...query }

            response = await api.get('/products', { params: params });
            return response;
        }
        response = await api.get('/products/search', { params: query });
        return response;
    }
    async function getDetailProductById(id) {
        const response = await api.get(`/products/${id}`);
        return response;
    }
    async function getVideosByProductId(id) {
        const response = await api.get(`/products/${id}/videos`);
        return response;
    }
    async function createReview(entity, productId) {
        let params = { product_id: productId }
        const response = await api.post('/reviews', entity, { params });
        return response;
    }
    async function getAllReviews(productId) {
        let params = { product_id: productId }
        const response = await api.get(`/reviews`, { params });
        return response;
    }
    return (
        <ProductContext.Provider value={{ VideoPause, createReview, getAllReviews, getVideosByProductId, getHighlightWeek, mostOfViews, getLastest, getProductByQuery, getSearch, getDetailProductById }}>
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
