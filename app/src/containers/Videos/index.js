import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './SubVideo/video_list';
import VideoDetail from './SubVideo/video_detail';

const API_KEY = 'AIzaSyCvchGhGdg1zZYciEFkRrWcKpCZ3CSdTZs';

//  Create a new component.
const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [se, SetSe] = useState('Cyberpunk 2077 Teaser Trailer');
    useEffect(() => {
      //  videoSearch('dcsdc');
    }, [])
    const videoSearch = (term) => {
        YTSearch({ key: API_KEY, term: term }, (vid) => {
            setVideos(vid)
            setSelectedVideo(vid[0]);
        });
    }

    return (
        <div>
            <VideoDetail video={selectedVideo} />
            <VideoList
                onVideoSelect={selectedVideo => setSelectedVideo(selectedVideo)}
                videos={videos} />
        </div>
    )

}
export default Videos;
// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player'
// const Videos = () => {

//   return (
//     <div className="online-courses container">
//    okviews
//    <video width={320} height={240} controls>
//         <source src="https://drive.google.com/uc?id=0B4fU5__VXkIkOUdyNUpta1ZEYnM" type="video/mp4" />
//         <source src="https://drive.google.com/uc?id=0B4fU5__VXkIkOUdyNUpta1ZEYnM" type="video/ogg" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   )
// };

// export default Videos;
