import React from "react";
import ReactDOM from "react-dom";
import moment from 'moment'
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

import "./style.css";

const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function Reviews({ Review }) {
    return (
        <Paper style={{ padding: "22px 10px", background: 'rgb(255 255 255 / 35%)' }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src={Review.avatar_url || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h5 style={{ margin: 0, textAlign: "left" }}>{Review.full_name}</h5>
                    <p style={{ textAlign: "left" }}>
                        {Review.content}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {moment(Review.create_at, "YYYYMMDD").fromNow()}
                    </p>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
        </Paper>

    );
}
export default Reviews;