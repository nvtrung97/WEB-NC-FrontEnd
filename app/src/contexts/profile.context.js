import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.service';

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
    async function createProfile(entity) {
        const response = await api.post('/profiles/registered-lists', entity);
        return response;
    }
    async function getProfile() {
        const response = await api.get('/profiles/registered-lists');
        return response;
    }

    return (
        <ProfileContext.Provider value={{ createProfile, getProfile }}>
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
