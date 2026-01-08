import { type DbEventsWithRelatedQueryIds } from '@/sse-db-event/components/SSEProviderEffect';
import { type DbEventsByQueryId } from '@/sse-db-event/types/DbEventsByQueryId';
import { getEventNameForDbEventsRelatedToQuery } from '@/sse-db-event/utils/getEventNameForDbEventsRelatedToQuery';
import { isDefined } from 'twenty-shared/utils';

export const dispatchDbEventsWithRelatedQueryIds = (
  dbEventsWithRelatedQueryIds: DbEventsWithRelatedQueryIds[],
) => {
  const dbEventsByQueryId: DbEventsByQueryId = {};

  for (const dbEventWithRelatedQueryIds of dbEventsWithRelatedQueryIds) {
    for (const queryId of dbEventWithRelatedQueryIds.queryIds) {
      if (!isDefined(dbEventsByQueryId[queryId])) {
        dbEventsByQueryId[queryId] = [];
      }

      dbEventsByQueryId[queryId].push(dbEventWithRelatedQueryIds.dbEvent);
    }
  }

  for (const queryId in dbEventsByQueryId) {
    window.dispatchEvent(
      new CustomEvent(getEventNameForDbEventsRelatedToQuery(queryId), {
        detail: dbEventsByQueryId[queryId],
      }),
    );
  }
};
