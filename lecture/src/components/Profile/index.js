import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import { useAuth } from '../../contexts/auth';
import moment from 'moment';
import UpdateProfile from './UpdateProfile';
const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));


let mainFeaturedPost = {
    title: 'No information',
    description:
        "temp@email.com",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Edit',
};

let featuredPosts = [
    {
        title: 'Information',
        attended: 'Nov 12',
        address:
            'This is your address if you haven"t filled it out yet, you can fill it out later',
        image: 'https://source.unsplash.com/random',
        phone: '0967****',
        password: '************'
    },
];
export default function Profile() {
    let context = useAuth();
    let [user, setUser] = useState({});
    let [selectedView, setSelectedView] = useState(0);
    useEffect(() => {
        setTimeout(function () {
            if (context.user.user) {

                context.getUser(context.user.user.user_id).then((re) => {
                    console.log('ok',re);
                    setUser(re);
                    mainFeaturedPost.title = re.full_name;
                    mainFeaturedPost.description = re.email;
                    featuredPosts[0].attended = moment(re.create_at).format("hh:mm DD/MM/YYYY");
                    featuredPosts[0].address = re.address ? re.address : featuredPosts[0].address;
                    featuredPosts[0].phone = re.phone ? re.phone : featuredPosts[0].phone;
                    featuredPosts[0].image = re.avatar_url ? re.avatar_url : featuredPosts[0].image;
                }).catch((er=>{
                    console.log('oksdcsc');
                }))
            }

        }, 0);
    },[]);
    const classes = useStyles();

    return (
        <React.Fragment>


            {selectedView ? <UpdateProfile handleChangeView = {setSelectedView} user = {user} /> :
                <div>
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <main style={{ marginTop: '50px', marginBottom: '70px' }}>
                            <MainFeaturedPost post={mainFeaturedPost} handleChangeView = {setSelectedView} />
                            <Grid container spacing={4}>
                                {featuredPosts.map((post) => (
                                    <FeaturedPost key={post.title} post={post} />
                                ))}
                            </Grid>
                            <Grid container spacing={5} className={classes.mainGrid}>

                            </Grid>
                        </main>
                    </Container>
                </div>
            }
        </React.Fragment>
    );
}