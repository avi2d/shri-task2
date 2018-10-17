import { EVENTS_API_URL } from 'constants/api-constants';

export default {
  getEvents() {
    return window.fetch(`${EVENTS_API_URL}/events`).then(response => {
      return response.json().then(data => data);
    });
  }
};
