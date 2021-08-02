
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCourse } from '../contexts/courses';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { BoxLoading } from 'react-loadingg';
import VideoLecturer from '../pages/VideoLecturer'
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
const customerTableHead = [
    '',
    'Category name',
    'Update',
    'Delete',
]



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Categories = () => {
    let history = useHistory();
    const classes = useStyles();
    let context = useCourse();
    let [leCourse, setLeCourse] = useState([]);
    let [Loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(function () {

            context.allCourses().then((res) => {
                setLoading(false);
                setLeCourse(res);
            })
        }, 0);

    }, []);
    const HandleDeleteCourse = async (c_id) => {
        //  DeleteCourse
        context.DeleteCourse(c_id).then(() => {
            const filteredPeople = leCourse.filter((item) => item._id !== c_id);
            setLeCourse(filteredPeople);
            addNoti("Xóa thành công khóa học", 'success', 'Delete');
        }).catch((err) => {
            addNoti("Xóa không thành công khóa học", 'danger', 'Delete');
        })
    }
    const addNoti = (mes, type, title) => {
        store.addNotification({
            title: title,
            message: mes,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }
    return (
        <div>
            <h2 className="page-header">
                All your courses
            </h2>
            {Loading ? <BoxLoading className='indexcss' /> : ''}
            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Course name</TableCell>
                            <TableCell align="left">Category name</TableCell>
                            <TableCell align="left">Video posting status</TableCell>
                            <TableCell align="left">Total video</TableCell>
                            <TableCell align="left">Created at</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leCourse.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.category_name}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" > {row.status ? <Button style={{ opacity: '0.7' }} variant="contained">Done</Button> : <Button style={{ opacity: '0.7' }} variant="contained" color="primary" href="#contained-buttons">Not completed</Button>}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" >{row.sum_video}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" >{moment(row.create_at).format("YYYY-MM-DD HH:mm")}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" onClick={() => { history.push(`/update-courses/${row._id}/videos`) }} ><EditIcon /></TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" onClick={() => { HandleDeleteCourse(row._id) }} style={{ color: 'red' }}><DeleteForeverIcon /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Categories
