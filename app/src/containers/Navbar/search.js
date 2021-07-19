
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useRef } from 'react';
import { useProduct } from '../../contexts/product.context';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function Search() {
    const valueRef = useRef('')
    let history = useHistory();
    const classes = useStyles();
    let context = useProduct();
    let [data, setData] = useState([]);
    let [keyword, setKeyword] = useState('');
    const handleChange = (event) => {
        setKeyword(event.target.value);
        context.getSearch({ keyword: event.target.value }).then((res) => {
            setData(res.data.records);
        });
    }


    
    const handleOnclickSearch = () => {
        history.push(`/search?keyword=${valueRef.current.value}`);
        window.location.reload(false);

    }
    return (
        <div style={{ width: 300, marginLeft: '10px' }}>
            <Autocomplete
                style={{ width: 300 }}
                freeSolo
                id="free-solo-2-demo"
                disableClearable

                options={data.map((option) => option.name)}
                renderInput={(params) => (
                    <TextField
                        inputRef={valueRef}
                        {...params}
                        onChange={handleChange}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
            <Button
                variant="contained"
                color="none"
                size="large"
                className={classes.button}
                style={{ marginTop: '23px', height: '40px' }}
                onClick={handleOnclickSearch}
            >
                Search
            </Button>
        </div>
    );
}
