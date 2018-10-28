import { Instance, types } from 'mobx-state-tree';

import { VIDEOS } from '../constants/data-constants';

const VideosExpanding = types
  .model('videosExpanding', {
    isVideoScaling: false,
    expandedVideoName: types.maybeNull(
      types.enumeration(VIDEOS.map(({ name }) => name))
    )
  })
  .views(self => ({
    isExpanded(videoName: string) {
      return videoName === self.expandedVideoName;
    }
  }))
  .actions(self => ({
    setExpandedVideo(videoName: string) {
      self.expandedVideoName =
        videoName === self.expandedVideoName ? null : videoName;
      self.isVideoScaling = true;
    },

    accountVideoScaling(isScaling: boolean) {
      self.isVideoScaling = isScaling;
    }
  }));

export default VideosExpanding.create();

export type IVideosExpanding = Instance<typeof VideosExpanding>;
