import Hls from 'hls.js';
import { STREAM_URL, STREAM_HTTP_SERVER_URL } from 'constants/api-constants';

export default {
  defineVideoUrl(name: string) {
    return `${STREAM_HTTP_SERVER_URL}/master?url=${STREAM_URL}/streams/${name}/master.m3u8`;
  },

  initVideo(video: HTMLVideoElement, videoName: string) {
    const url = this.defineVideoUrl(videoName);

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, video.play);

      return;
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
      video.addEventListener('loadedmetadata', video.play);
    }
  }
};
