import { Registry } from '@bem-react/di';

import {
  cnEventCard,
  EventCard
} from '../components/event-card/event-card@desktop';

export const desktop = new Registry({ id: 'platform' });

desktop.set(cnEventCard(), EventCard);
