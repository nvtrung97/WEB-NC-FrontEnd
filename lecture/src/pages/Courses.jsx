
import React, { createContext, useContext, useEffect, useState } from 'react';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import CreateCourse from '../components/post-course/create-course'
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Courses = () => {

    return (
        <div>
            <CreateCourse />

        </div>
    )
}

export default Courses


