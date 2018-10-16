import Hls from 'hls.js';

export default {
  defineVideoUrl(name) {
    return `http://localhost:9191/master?url=http://localhost:5000/streams/${name}/master.m3u8`;
  },

  initVideo(video, videoName) {
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
