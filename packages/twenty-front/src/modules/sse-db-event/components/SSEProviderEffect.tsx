import { SseClientContext } from '@/sse-db-event/contexts/SseClientContext';
import { ON_DB_EVENTS_RELATED_TO_QUERIES_SUBSCRIPTION } from '@/sse-db-event/graphql/subscriptions/OnDbEventsRelatedToQueriesSubscription';
import { sseEventStreamIdState } from '@/sse-db-event/states/sseEventStreamIdState';
import { dispatchDbEventsWithRelatedQueryIds } from '@/sse-db-event/utils/dispatchDbEventsWithRelatedQueryIds';
import { isNonEmptyString } from '@sniptt/guards';
import { print } from 'graphql';
import { useContext, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isDefined } from 'twenty-shared/utils';
import { v4 } from 'uuid';
import { type OnDbEvent } from '~/generated/graphql';

export type DbEventsWithRelatedQueryIds = {
  queryIds: string[];
  dbEvent: OnDbEvent;
};

type TemporarySubscriptionResult = {
  eventStreamId: string;
  dbEventsWithRelatedQueryIds: DbEventsWithRelatedQueryIds[];
};

export const SSEProviderEffect = () => {
  const sseClient = useContext(SseClientContext);

  const [sseEventStreamId, setSseEventStreamId] = useRecoilState(
    sseEventStreamIdState,
  );

  useEffect(() => {
    if (!isDefined(sseClient)) {
      return;
    }

    if (!isNonEmptyString(sseEventStreamId)) {
      setSseEventStreamId(v4());
    }

    const unsubscribe = sseClient.subscribe(
      {
        query: print(ON_DB_EVENTS_RELATED_TO_QUERIES_SUBSCRIPTION),
        variables: {
          eventStreamId: sseEventStreamId,
        },
      },
      {
        next: (value) => {
          const data = value.data as {
            onDbEventsRelatedToQueries: TemporarySubscriptionResult;
          } | null;

          const dbEventsWithRelatedQueryIds =
            data?.onDbEventsRelatedToQueries?.dbEventsWithRelatedQueryIds ?? [];

          dispatchDbEventsWithRelatedQueryIds(dbEventsWithRelatedQueryIds);
        },
        error: (error) => {
          // eslint-disable-next-line no-console
          console.error('Subscription error:', error);
        },
        complete: () => {},
      },
    );

    return () => {
      unsubscribe();
    };
  }, [sseClient, sseEventStreamId, setSseEventStreamId]);

  return null;
};
