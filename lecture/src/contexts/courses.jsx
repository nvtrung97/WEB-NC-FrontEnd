import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const courseContext = createContext({});
export const CourseProvider = ({ children }) => {

    async function createCourse(data) {
        const response = await api.post('/teacher/products', data);
        return response;
    }
    async function UpdateCourse(data, id) {
        const response = await api.put(`/teacher/products/${id}`, data);
        console.log(response);
        return response;
    }
    async function allCourses() {
        const response = await api.get('/teacher/products');
        return response;
    }
    async function getVideoOfProduct(id) {
        const response = await api.get(`/teacher/products/${id}/videos`);
        return response;
    }
    async function getDetailOfProduct(id) {
        const response = await api.get(`/products/${id}`);
        return response;
    }
    async function addVideo(id, data) {
        const response = await api.post(`/teacher/products/${id}/videos`, data);
        return response;
    }
    async function FinalCourses(id) {
        const response = await api.get(`/teacher/products/${id}/final`);
        return response;
    }
    async function DeleteVideo(id, videoId) {
        const response = await api.delete(`/teacher/products/${id}/videos/${videoId}`);
        return response;
    }
    async function DeleteCourse(id) {
        const response = await api.delete(`/teacher/products/${id}`);
        return response;
    }
    return (
        <courseContext.Provider value={{ UpdateCourse,DeleteCourse, createCourse, allCourses, getVideoOfProduct, getDetailOfProduct, addVideo, FinalCourses, DeleteVideo }}>
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
