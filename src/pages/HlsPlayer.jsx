import {React, memo} from "react";
import ReactHlsPlayer from "react-hls-player";

const HlsPlayer = memo(function HlsPlayer({channelUrl}) {
    return (
        <ReactHlsPlayer
            src={channelUrl}
            hlsConfig={{
                maxLoadingDelay: 6,
                minAutoBitrate: 2,
                lowLatencyMode: true,
            }}
            autoPlay={false}
            controls={true}
            width='80%'
            height='50%'
        />
    );
});

export default HlsPlayer