import React, { useState, useEffect } from 'react';
import Colors from '../../components/Colors'
import DetailsThumb from '../../components/DetailsThumb';
import './style.css'
import { useProduct } from '../../contexts/product.context';
import { useCategory } from '../../contexts/categories.context';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from "react-router";
import { FixedSizeList } from 'react-window';
import Rating from '@material-ui/lab/Rating';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CourseCard from 'components/CourseCard';
import { BoxLoading } from 'react-loadingg';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Player } from 'video-react';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    tmp: {
        width: '100%',
        maxWidth: 560,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    }
}));
let imagesThum = [
    "http://tiasang.com.vn/Portals/0/Images/Dao-tao-KHDL-anh-1.jpg",
    "https://cdn.vietnambiz.vn/2019/10/15/1nvhe7mchqmjbgyvx-uobra-15711056360651103109227.png",
    "https://duhocue.edu.vn/public/uploads/images/hinh-tin-tuc/Nganh-khoa-hoc-may-tinh-nam-2019-top-5-truong-dai-hoc-nen-lua-chon.jpg",
];
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];
const Videos = () => {
    const classes = useStyles();
    let contextProduct = useProduct();
    const { id } = useParams();
    const [products, setProducts] = useState({});
    const [videos, setVideos] = useState([]);
    const [videoSelected, setVideoSelected] = useState(0);
    const [imageThunal, setImageThunal] = useState(['https://thietkegame.com/wp-content/uploads/2020/03/loading-8bit.jpg']);
    useEffect(() => {
        let mounted = true;

        setTimeout(function () {
            contextProduct.getDetailProductById(id)
                .then(items => {
                    if (mounted) {
                        setProducts(items.data);
                        setImageThunal(items.data.url_image);
                        contextProduct.getVideosByProductId(id).then((res) => {
                            for (let item of res.data) {
                                item.url = item.url.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?id=");
                            }
                            setVideos(res.data);
                            res.data.map((vitemp, index) => {
                                if (vitemp._id == items.data.videoPause) {
                                    setVideoSelected(index);
                                }
                            });

                        })
                    }
                })
        }, 0);
        return () => mounted = false;
    }, []);
    let myRef = React.createRef();
    const handlChangeVideos = (videoId) => {
        contextProduct.VideoPause(id, videoId);
        videos.map((vitemp, index) => {
            if (vitemp._id == videoId) {
                setVideoSelected(index);
            }
        });
    }

    return (
        <div className="app123">
            {
                products ? (
                    <div className="details123" >
                        <div className="big-img123">

                            {
                                videos.map((vi, index) => (
                                    (index == videoSelected) ?
                                        // <video width={600} height={400} poster={imageThunal} controls >
                                        //     <source src={vi.url} type="video/mp4" /> : ''
                                        // </video> 

                                        // <Player width={600} height={400}>
                                        //     <source src={vi.url} />
                                        // </Player>
                                        <Player
                                            playsInline
                                            poster={imageThunal}
                                            src={vi.url}
                                            fluid={false}
                                            width={600}
                                            height={400}
                                        />
                                        : ''
                                ))
                            }
                            <Accordion style={{
                                background: 'none',
                                marginTop: '20px',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Video details</Typography>
                                </AccordionSummary>

                                {videos.map((video, index) => (
                                    <div>
                                        <AccordionDetails>
                                            <Typography>
                                                {index}: {video.name}
                                            </Typography>

                                        </AccordionDetails>
                                        <hr className="seperator" style={{ opacity: '0.5' }} />
                                    </div>
                                ))}
                                <AccordionDetails>
                                    <Typography>
                                        More ...
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="box">
                            <div className="row">
                                {videos.length > 0 && videos[videoSelected] ? <h3>{videos[videoSelected].name}</h3> : <h2>Not found videos</h2>}

                            </div>
                            <Colors colors={["red", "black", "crimson", "teal"]} />
                            <p><b>Author: </b> {products.full_name}</p>
                            <p><b>Course: </b> {products.name}</p>


                            <div style={{ marginBottom: '20px' }}><b>Course videos:</b></div>
                            <List className={classes.tmp} subheader={<li />} style={{ background: '#e8e8e840', borderRadius: '7px', padding: '10px' }}>

                                {videos.map((video) => (
                                    <li key={`section-${video._id}`} className={classes.listSection} style={{ cursor: 'pointer' }} >
                                        <ul className={classes.ul} style={{ marginBottom: '10px' }}>
                                            <ListItemText primary={`${video.name}`} onClick={() => { handlChangeVideos(video._id) }} data-item={video} />
                                            <hr className="seperator" style={{ opacity: '0.5', maxWidth: '350px', marginLeft: '50px' }} />
                                        </ul>
                                    </li>
                                ))}
                            </List>








                        </div>

                    </div>
                ) : <BoxLoading />

            }
        </div >
    );
}

export default Videos;
//<img src={item.src[index]} alt="" />
//
// <DetailsThumb images={item.src} tab={handleTab} myRef={myRef} />





// import _ from 'lodash';
// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import YTSearch from 'youtube-api-search';
// import VideoList from './SubVideo/video_list';
// import VideoDetail from './SubVideo/video_detail';
// import { useProduct } from '../../contexts/product.context';
// import { useCategory } from '../../contexts/categories.context';
// import { useParams } from "react-router";
// const API_KEY = 'AIzaSyCvchGhGdg1zZYciEFkRrWcKpCZ3CSdTZs';

// //  Create a new component.
// const Videos = () => {
//     const [videos, setVideos] = useState([]);
//     const [products, setProducts] = useState({});
//     const [selectedVideo, setSelectedVideo] = useState(null);
//     const [se, SetSe] = useState('Cyberpunk 2077 Teaser Trailer');
//     const { id } = useParams();
//     let contextProduct = useProduct()

//     useEffect(() => {
//         setTimeout(function () {
//             contextProduct.getVideosByProductId(id).then((res) => {
//                 setVideos(res.data);

//             })
//             contextProduct.getDetailProductById(id).then((res) => {
//                 setProducts(res.data);

//             })
//         }, 0);
//     }, [])


//     return (
//         <div>





//         </div>
//     )

// }
// export default Videos;
// // import React, { useState, useEffect } from 'react';
// // import ReactPlayer from 'react-player'
// // const Videos = () => {

// //   return (
// //     <div className="online-courses container">
// //    okviews
// //    <video width={320} height={240} controls>
// //         <source src="https://drive.google.com/uc?id=0B4fU5__VXkIkOUdyNUpta1ZEYnM" type="video/mp4" />
// //         <source src="https://drive.google.com/uc?id=0B4fU5__VXkIkOUdyNUpta1ZEYnM" type="video/ogg" />
// //         Your browser does not support the video tag.
// //       </video>
// //     </div>
// //   )
// // };

// // export default Videos;
