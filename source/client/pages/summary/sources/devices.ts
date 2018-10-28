import { API_URL } from 'constants/api-constants';

export default {
  getDevices() {
    return window
      .fetch(`${API_URL}/devices`)
      .then(response => response.json())
      .then(data => data);
  },

  getFilters() {
    return window
      .fetch(`${API_URL}/filters`)
      .then(response => response.json())
      .then(data => data);
  }
};
