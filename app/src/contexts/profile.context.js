import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.service';

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
    async function registerCourese(entity) {
        const response = await api.post('/profiles/registered-lists', entity);
        return response;
    }
    async function getProfile() {
        const response = await api.get('/profiles/registered-lists');
        return response;
    }
    async function createWishList(entity) {
        const response = await api.post('/profiles/watch-lists', entity);
        return response;
    }
    async function deleteWishList(productId) {
        let params = { product_id: productId }
        const response = await api.delete('/profiles/watch-lists', { params });
        return response;
    }
    async function updateProfile(entity) {
        const response = await api.put('/profiles', entity);
        return response;
    }
    async function changePassword(entity) {
        const response = await api.put('/profiles/password', entity);
        return response;
    }
    async function getWishList() {
        const response = await api.get('/profiles/watch-lists');
        return response;
    }
    return (
        <ProfileContext.Provider value={{ updateProfile, changePassword, registerCourese, getProfile, createWishList, deleteWishList, getWishList }}>
            {children}
        </ProfileContext.Provider>
    );
};

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within an ProfileProvider.');
    }
    return context;
}
export default ProfileContext;
