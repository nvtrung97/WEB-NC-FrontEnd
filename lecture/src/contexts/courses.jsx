import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const courseContext = createContext({});
export const CourseProvider = ({ children }) => {

    async function createCourse(data) {
        const response = await api.post('/teacher/products', data);
        return response;
    }

    return (
        <courseContext.Provider value={{ createCourse }}>
            {children}
        </courseContext.Provider>
    );
};

export function useCourse() {
    const context = useContext(courseContext);
    if (!context) {
        throw new Error('useCategory must be used within an CourseProvider.');
    }
    return context;
}

export default courseContext;
