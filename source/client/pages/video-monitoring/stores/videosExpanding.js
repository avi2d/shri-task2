import { types } from 'mobx-state-tree';

import { VIDEOS } from '../constants/data-constants';

const VideosExpanding = types
  .model('videosExpanding', {
    isVideoScaling: false,
    expandedVideoName: types.maybe(
      types.enumeration(VIDEOS.map(({ name }) => name))
    )
  })
  .volatile(self => ({
    expandedVideoAnalyzer: null
  }))
  .views(self => ({
    isExpanded(videoName) {
      return videoName === self.expandedVideoName;
    }
  }))
  .actions(self => ({
    setExpandedVideo(videoName, videoAnalyzer) {
      self.expandedVideoName =
        videoName === self.expandedVideoName ? null : videoName;
      self.expandedVideoAnalyzer =
        videoName === self.expandedVideoAnalyzer ? null : videoAnalyzer;
      self.isVideoScaling = true;
    },

    accountVideoScaling(isScaling) {
      self.isVideoScaling = isScaling;
    }
  }));

export default VideosExpanding.create();
