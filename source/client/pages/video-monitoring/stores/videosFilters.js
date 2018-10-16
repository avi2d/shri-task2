import _ from 'lodash';
import { types } from 'mobx-state-tree';

import {
  DEFAULT_BRIGHTNESS,
  DEFAULT_CONTRAST,
  VIDEOS
} from '../constants/data-constants';

const DEFAULT_VIDEOS = VIDEOS.map(({ name }) => ({
  videoName: name,
  currentBrightness: DEFAULT_BRIGHTNESS,
  currentContrast: DEFAULT_CONTRAST
}));

const VideoFilter = types.model({
  videoName: types.enumeration(VIDEOS.map(({ name }) => name)),
  currentBrightness: DEFAULT_BRIGHTNESS,
  currentContrast: DEFAULT_CONTRAST
});

const VideosFilters = types
  .model('videosFilters', {
    videos: types.optional(types.array(VideoFilter), DEFAULT_VIDEOS)
  })
  .views(self => ({
    getVideoBrightness(videoName) {
      return _.chain(self.videos)
        .find({ videoName })
        .get('currentBrightness', null)
        .value();
    },

    getVideoContrast(videoName) {
      return _.chain(self.videos)
        .find({ videoName })
        .get('currentContrast', null)
        .value();
    }
  }))
  .actions(self => ({
    setVideoBrightness(videoName, brightness) {
      const videoIndex = _.findIndex(self.videos, { videoName });

      if (videoIndex === -1) return;

      _.set(self.videos, `[${videoIndex}].currentBrightness`, brightness);
    },

    setVideoContrast(videoName, contrast) {
      const videoIndex = _.findIndex(self.videos, { videoName });

      if (videoIndex === -1) return;

      _.set(self.videos, `[${videoIndex}].currentContrast`, contrast);
    }
  }));

export default VideosFilters.create();
