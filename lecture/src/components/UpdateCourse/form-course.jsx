import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import draftToHtml from 'draftjs-to-html';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { useCategory } from '../../contexts/category';
import { useCourse } from '../../contexts/courses';
import { map } from 'lodash';
import { store } from 'react-notifications-component';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { BoxLoading } from 'react-loadingg';
import { useParams } from 'react-router';
const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));
export default function AddressForm() {
    const classes = useStyles();
    const [choose, setChoose] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [fullDescription, setFullDescription] = useState('');
    const conCategory = useCategory();
    const [cate, setCate] = useState([]);
    const [title, setTitle] = useState('');
    const [url_image, setUrl_image] = useState('');
    const [short_description, setShortDescription] = useState('');
    const [changeEditer, setChangeEditer] = useState('');
    const [detaiPro, setDetaiPro] = useState('');
    const [Loading, setLoading] = useState(true);
    let conCourse = useCourse();
    const { id } = useParams();
    useEffect(() => {
        setTimeout(() => {
            conCategory.getCategory().then((res) => {
                console.log(res);
                setCate(res);
            })
            conCourse.getDetailOfProduct(id).then((res) => {
                setLoading(false);
                console.log(res);
                setTitle(res.name);
                setChoose(res.category_id);
                setUrl_image(res.url_image);
                setShortDescription(res.short_description);
                setChangeEditer(EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(res.full_description)
                    )));
            })
        }, 0)
    }, [])
    const handleChange = (event) => {
        setChoose(event.target.value);

    };
    const handleCreateCourse = () => {
        let entity = {
            category_id: choose || 1,
            name: title,
            url_image: url_image,
            short_description: short_description,
            full_description: fullDescription.replaceAll('rgb(255,255,255)', '')
        }
        console.log(entity);
        if (!title || !url_image || !short_description) {
            alert('Bạn phải nhập đầy đủ thông tin mới được đăng');
            return;
        }
        conCourse.UpdateCourse(entity, id).then((res) => {
            addNoti('Bạn đã cập khóa học thành công', 'success', 'Update');
        }).catch((err) => {
            addNoti('Bạn cập khóa học thất bại', 'danger', 'Update');
        })

    }
    const updateInputValue = async (event) => {
        if (event.target.name == 'name') setTitle(event.target.value);
        if (event.target.name == 'url_image') setUrl_image(event.target.value);
        if (event.target.name == 'short_description') setShortDescription(event.target.value);
    }
    const onContentStateChange = (contentState) => {
        setFullDescription(draftToHtml(contentState));
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
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
            {Loading ? <BoxLoading className='indexcss' /> : ''}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="name"
                        label="Course name"
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={evt => updateInputValue(evt)}
                        value={title}
                    />
                </Grid>
                <FormControl className={classes.formControl} style={{ minWidth: '200px' }}>
                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={() => { setOpen(false); }}
                        onOpen={() => { setOpen(true); }}
                        value={choose}
                        onChange={handleChange}
                    >
                        {cate.map((item) => (
                            <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="url_image"
                        label="Link the course's photo"
                        fullWidth
                        onChange={evt => updateInputValue(evt)}
                        autoComplete="shipping address-line2"
                        value={url_image}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="short_description"
                        label="Short description"
                        value={short_description}
                        fullWidth
                        autoComplete="shipping address-line2"
                        onChange={evt => updateInputValue(evt)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <p style={{ fontsSize: '17px', opacity: '0.6', marginBottom: '10px' }}>Full description</p>
                    <p style={{ border: '1px solid rgb(132 132 132 / 52%)', padding: '10px', minHeight: 300 }}>
                        <Editor
                            editorState={changeEditer}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={setChangeEditer}
                            onContentStateChange={onContentStateChange}
                        />  </p>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="I have read the terms"
                    />
                    <Button variant="contained" color="primary" style={{ opacity: 0.8 }} onClick={handleCreateCourse}>Update Course</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
