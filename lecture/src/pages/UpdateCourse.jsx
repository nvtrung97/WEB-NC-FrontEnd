
import React, { createContext, useContext, useEffect, useState } from 'react';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import UpdateCourse from '../components/UpdateCourse/update-course'
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Courses = () => {

    return (
        <div>
            <UpdateCourse />

        </div>
    )
}

export default Courses


