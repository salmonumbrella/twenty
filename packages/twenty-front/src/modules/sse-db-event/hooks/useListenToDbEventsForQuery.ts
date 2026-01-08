import { type RecordGqlOperationSignature } from '@/object-record/graphql/types/RecordGqlOperationSignature';
import { ADD_LISTENER_FOR_DB_EVENTS_RELATED_TO_QUERIES } from '@/sse-db-event/graphql/mutations/AddListenerForDbEventsRelatedToQueriesMutation';
import { REMOVE_LISTENER_FOR_DB_EVENTS_RELATED_TO_QUERIES } from '@/sse-db-event/graphql/mutations/RemoveListenerForDbEventsRelatedToQueriesMutation';
import { sseEventStreamIdState } from '@/sse-db-event/states/sseEventStreamIdState';
import { getEventNameForDbEventsRelatedToQuery } from '@/sse-db-event/utils/getEventNameForDbEventsRelatedToQuery';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { type OnDbEvent } from '~/generated/graphql';

export const useListenToDbEventsForQuery = ({
  queryId,
  operationSignature,
  onDbEvents,
}: {
  queryId: string;
  operationSignature: RecordGqlOperationSignature;
  onDbEvents: (dbEvents: OnDbEvent[]) => void;
}) => {
  const sseEventStreamId = useRecoilValue(sseEventStreamIdState);

  const [addListenerForDbEventsRelatedToQueries] = useLazyQuery(
    ADD_LISTENER_FOR_DB_EVENTS_RELATED_TO_QUERIES,
  );

  const [removeListenerForDbEventsRelatedToQueries] = useLazyQuery(
    REMOVE_LISTENER_FOR_DB_EVENTS_RELATED_TO_QUERIES,
  );

  useEffect(() => {
    const eventName = getEventNameForDbEventsRelatedToQuery(queryId);

    const handleOnDbEventsForQuery = (event: Event) => {
      const dbEvents = (event as CustomEvent<OnDbEvent[]>).detail;

      onDbEvents(dbEvents);
    };

    window.addEventListener(eventName, handleOnDbEventsForQuery);

    return () => {
      window.removeEventListener(eventName, handleOnDbEventsForQuery);
    };
  }, [onDbEvents, queryId]);

  useEffect(() => {
    addListenerForDbEventsRelatedToQueries({
      variables: {
        eventStreamId: sseEventStreamId,
        queryId,
        operationSignature,
      },
    });

    return () => {
      removeListenerForDbEventsRelatedToQueries({
        variables: {
          eventStreamId: sseEventStreamId,
          queryId,
        },
      });
    };
  }, [
    addListenerForDbEventsRelatedToQueries,
    sseEventStreamId,
    queryId,
    removeListenerForDbEventsRelatedToQueries,
    operationSignature,
  ]);
};
