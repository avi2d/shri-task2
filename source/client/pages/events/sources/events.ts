import { API_URL } from 'constants/api-constants';

export default {
  getEvents() {
    return window
      .fetch(`${API_URL}/events`)
      .then(response => response.json())
      .then(data => data);
  }
};
