
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
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { BoxLoading } from 'react-loadingg';
import { useParams } from 'react-router';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditLocationSharpIcon from '@material-ui/icons/EditLocationSharp';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import ReactDOM from "react-dom";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useHistory } from 'react-router';
import 'animate.css';
const customerTableHead = [
    '',
    'Category name',
    'Update',
    'Delete',
]



const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 350,
    },
    overlay: {

    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3)
    },
}));
const VideoLecture = () => {
    let history = useHistory();
    const { id } = useParams();
    const classes = useStyles();
    let context = useCourse();
    let [videos, setVideos] = useState([]);
    let [detailProduct, setDetailProduct] = useState('');
    let [selectFile, setSelectFile] = useState('');
    let [nameVideoUpload, setNameVideoUpload] = useState('');
    let [Loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(function () {
            context.getVideoOfProduct(id).then((res) => {
                console.log(res);
                setVideos(res);
                setLoading(false);
            })
            context.getDetailOfProduct(id).then((res) => {
                setDetailProduct(res);
                setLoading(false);
            })
        }, 0);

    }, []);
    const onFileChange = event => {
        setSelectFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        setLoading(true);
        const data = new FormData();
        data.append('file', selectFile);
        data.append('upload_preset', 'webncupload');
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/taskmanagereaglob123/video/upload', {
            method: 'POST',
            body: data
        })

        const updated = await res.json();
        if (updated) {
            let entity = {
                name: nameVideoUpload,
                url: updated.secure_url,
                product_id: id
            }
            context.addVideo(id, entity).then((res) => {
                setLoading(false);
                addNoti('Tải video lên thành công', 'success', 'Upload');
                setSelectFile('');
                setNameVideoUpload('');
                let videotmep = videos;
                videotmep.push({
                    _id: res._id,
                    name: nameVideoUpload,
                    create_at: (new Date()).toISOString(),
                    product_id: id
                });

                setVideos([]);
                setVideos(videotmep);
                return;
            }).catch((err) => {
                setLoading(false);
                addNoti('Tải video lên không thành công', 'danger', 'Upload');
                setSelectFile('');
                setNameVideoUpload('');
                return;
            })
        }
    }
    const updateInputValue = async (event) => {
        if (event.target.name == 'videoNameUpload') setNameVideoUpload(event.target.value);
    }
    const DeleteVideo = async (Videoid) => {
        context.DeleteVideo(id, Videoid).then((res) => {
            const filteredPeople = videos.filter((item) => item._id !== Videoid);
            setVideos(filteredPeople);
            addNoti("Xóa video thành công", 'success', 'Delete');
        })
    }
    const MakeFinal = async () => {
        setLoading(true);
        context.FinalCourses(id).then((res) => {
            let temp = detailProduct;
            temp.status = 1;
            setDetailProduct('');
            setTimeout(function () { setDetailProduct(temp); setLoading(false); }, 1000);
            addNoti("Khóa học đã hoàn thành", 'success', 'Update')
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
            {detailProduct ?
                <div>
                    <h2 className="page-header">
                        All your videos of "{detailProduct.name}" course
                    </h2>
                    <div style={{ margin: '10px' }}>
                        <Button variant="contained" style={{ margin: '10px' }} onClick={()=>{history.push(`/update-courses/${id}/update`)}}>Update course</Button>
                        <Button variant="contained" style={{ margin: '10px', backgroundColor: '#069e49', color: 'white', opacity: detailProduct.status ? '0.3' : 1 }} disabled={detailProduct.status} onClick={MakeFinal}>Make completed</Button>
                    </div>
                    {detailProduct.status ? '' :
                        <Grid container spacing={3} style={{ maxWidth: '400px', padding: '20px', marginBottom: '10px' }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address1"
                                    name="videoNameUpload"
                                    label="Video name"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    onChange={evt => updateInputValue(evt)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="upload-photo">
                                    <input
                                        style={{ display: "none" }}
                                        id="upload-photo"
                                        name="upload-photo"
                                        type="file"
                                        onChange={onFileChange}
                                        accept="video/*"
                                    />
                                    <Fab
                                        color="secondary"
                                        size="small"
                                        component="span"
                                        aria-label="add"
                                        variant="extended"
                                    >
                                        {!selectFile ? <AddIcon /> : <p style={{ padding: '3px', fontSize: '8px' }}>{selectFile.name}</p>}

                                    </Fab>
                                </label>
                                <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleUpload} disabled={nameVideoUpload && selectFile ? false : true}>
                                    Upload
                                </Button>
                            </Grid>
                        </Grid>
                    }

                    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: '' }} style={{ marginBottom: '30px' }}>
                        <div className={classes.overlay} />
                        <Grid container>
                            <Grid item md={6}>
                                <div className={classes.mainFeaturedPostContent}>
                                    <Typography variant="h7" color="inherit" paragraph>
                                        Total videos:   {videos.length}
                                    </Typography>
                                    <Typography variant="h7" color="inherit" paragraph>
                                        <Rating name="read-only" value={detailProduct.number_reviews} readOnly />
                                    </Typography>
                                    <Typography variant="h7" color="inherit" paragraph>
                                        Total Reviews:  {detailProduct.number_reviews}
                                    </Typography>
                                    <Typography variant="h7" color="inherit" paragraph>
                                        Total students:  {detailProduct.number_students}
                                    </Typography>
                                    <Typography variant="h7" color="inherit" paragraph>
                                        {detailProduct.status ? <Button style={{ opacity: '0.7' }} variant="contained">Done</Button> : <Button style={{ opacity: '0.7' }} variant="contained" color="primary" href="#contained-buttons">Not completed</Button>}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                : ''}
            {Loading ? <BoxLoading className='indexcss' /> : ''}
            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="left">Video name</TableCell>
                            <TableCell align="left">Created at</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videos.map((row, index) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {(index + 1)}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" >{moment(row.create_at).format("YYYY-MM-DD HH:mm")}</TableCell>
                                <TableCell align="left" data-item={row._id} onClick={() => { DeleteVideo(row._id) }} className="pointer" ><DeleteForeverIcon style={{ color: 'red' }} /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default VideoLecture
