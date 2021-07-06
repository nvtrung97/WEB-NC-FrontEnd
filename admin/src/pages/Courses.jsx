
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAdmin } from '../contexts/admin';
import './style.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useCategory } from '../contexts/category';
import { BoxLoading } from 'react-loadingg';
import moment from 'moment'
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Courses = () => {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    let { categories } = useCategory();
    const [CateGo, setCateGo] = useState([]);
    useEffect(() => {
        if (CateGo.length == 0)
            setCateGo(categories);
    });
    let context = useAdmin();
    useEffect(() => {
        const fetchProduct = async () => {
            if (courses.length == 0) {

                try {
                    let res = await context.getCourses();

                    for (let temp of res) {
                        let resUser = await context.getUserById(temp.user_id);
                        temp.email = resUser.email;
                    }
                    console.log(res);
                    setCourses(res);
                } catch (error) {
                    console.log("Failed to fetch data product at: ", error);
                }
            };
        }
        fetchProduct();
    }, []);
    let getCategoryName = ((id) => {
        let newdata = CateGo.filter(function (element) { return element._id == id });
        if (newdata)
            return newdata[0].name;
    })
    let handleDelete = ((e) => {
        let id_courses = e.target.getAttribute('data-item');
        // TODO process delete with api\
        context.deleteById(id_courses).then((res) => {
            let newdata = courses.filter(function (element) { return element._id != id_courses });
            setCourses(newdata);
        }).catch((err) => { alert("Can't delete") });
    })
    return (
        <div>
            <h2 className="page-header">
                Courses
            </h2>
            {courses.length == 0 ? <BoxLoading /> : ''}

            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">Courses name</TableCell>
                            <TableCell align="left">Author</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Create at</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {courses.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left" > {row.email}</TableCell>
                                <TableCell align="left" > {getCategoryName(row.category_id)}</TableCell>
                                <TableCell align="left" > {moment(row.create_at).format('YYYY-MM-DD HH:mm')}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" onClick={handleDelete}>Delete</TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )
}

export default Courses


