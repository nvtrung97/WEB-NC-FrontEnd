import React, { useState ,useEffect} from "react";
import ReactDOM from "react-dom";
import moment from 'moment'
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import "./style.css";
const Reviews = ({reviews}) => {
 
    return (
        <div style={{ padding: 14 }} className="App">
            <Paper style={{ padding: "30px 10px", borderRadius: '5px', background: '#abc2d659' }}>
                {reviews.map((re, index) => (
                    <div>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src={re.avatar_url} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h5 style={{ margin: 0, textAlign: "left" }}> {re.full_name} <Rating name="disabled" value={re.score} disabled style={{ marginLeft: '40px' }} /></h5>
                                <p style={{ textAlign: "left", fontSize: 14 }}>
                                    {re.content}

                                </p>

                                <p style={{ textAlign: "left", color: "gray", fontSize: 11, fontStyle: 'oblique' }}>
                                    {moment(re.create_at).format("hh:mm DD/MM/YYYY")}
                                </p>
                            </Grid>
                        </Grid>
                        {(index != reviews.length - 1) ? <Divider variant="fullWidth" style={{ margin: "15px 0" }} /> : ''}

                    </div>
                ))}







            </Paper>



            <Paper style={{ padding: reviews.length <= 1 ? "40px 20px" : "40px 20px", marginTop: reviews.length <= 1 ? 100 : 100, opacity: '0' }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                        <p style={{ textAlign: "left" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                            {" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
export default Reviews;