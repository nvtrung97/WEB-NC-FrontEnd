import React from 'react';

const VideoDetail = ({video}) => {
  if (!video) {
    return <div className="loading-video">.</div>;
  }

  //const videoId = video.id.videoId;
  // const url = 'https://www.youtube.com/embed/' + videoId;
  const url =`https://www.youtube.com/embed/${'Uwib2Kf9bBo'}`;

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9 video-detail-animation">
      <iframe className="embed-responsive-item" src={url}>
        </iframe>
      </div>
      <div className="details">
        <div className="details-title">
          {'sdcdfsjdkfnsdkfjnsdckv sdc sdc sc sd fs f sdf'}
        </div>
        <div className="details-channel-title">
        {'sdcdfsjdkfnsdkfjnsdckv sdc sdc sc sd fs f sdf'}
        </div>
        <div>
        {'sdcdfsjdkfnsdkfjnsdckv sdc sdc sc sd fs f sdf'}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;