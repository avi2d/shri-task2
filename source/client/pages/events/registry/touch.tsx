import { Registry } from '@bem-react/di';

import {
  cnEventCard,
  EventCard
} from '../components/event-card/event-card@touch';

export const touch = new Registry({ id: 'platform' });

touch.set(cnEventCard(), EventCard);
