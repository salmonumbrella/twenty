import { gql } from '@apollo/client';

export const ON_DB_EVENTS_RELATED_TO_QUERIES_SUBSCRIPTION = gql`
  subscription OnDbEventsRelatedToQueries(
    $parameters: OnDbEventsRelatedToQueriesInput!
  ) {
    onDbEventsRelatedToQueries(parameters: $parameters) {
      eventStreamId
      dbEventsWithRelatedQueryIds {
        queryIds
        dbEvent {
          action
          objectNameSingular
          eventDate
          record
          updatedFields
        }
      }
    }
  }

  input OnDbEventsRelatedToQueriesInput {
    eventStreamId: String
  }
`;
