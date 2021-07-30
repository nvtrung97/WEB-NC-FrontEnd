
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCategory } from '../contexts/category';
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
    const classes = useStyles();
    let { categories } = useCategory();
    let context = useCategory();
    const [CateGo, setCateGo] = useState([]);
    useEffect(() => {
       
    });
    const [idUpdate, setIdUpdate] = useState(0);
    const [valueUpdate, setValueUpdate] = useState('');
    const handleEdit = ((e) => {
        setIdUpdate(e.target.getAttribute('data-item'));
  
        let newdata = CateGo.filter(function (element) { return element._id == e.target.getAttribute('data-item') });
        setValueUpdate(newdata[0].name);
    })
    const handleDelete = ((e) => {
        let id_cate = e.target.getAttribute('data-item');
        // TODO process delete with api
        context.deleteCategory(id_cate).then((res) => {
            let newdata = CateGo.filter(function (element) { return element._id != id_cate });
            setCateGo(newdata);
        }).catch((err) => {
            alert("This category cannot be deleted because there is a course");
        })

    })
    const handleUpdate = (() => {
        let entity = {
            name: valueUpdate
        }
        context.updateCategory(idUpdate, entity).then((res) => {
            window.location.reload(false);
            return;
        }).catch((err) => {
            alert("This category cannot be updated because there is a course");
        })
        console.log(entity);
        // TODO
    })
    return (
        <div>
            <h2 className="page-header">
                All your courses
            </h2>

            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">Category name</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {CateGo.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="right" data-item={row._id} className="pointer" onClick={handleEdit}> Edit</TableCell>
                                <TableCell align="right" data-item={row._id} className="pointer" onClick={handleDelete}> Delete</TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Categories
