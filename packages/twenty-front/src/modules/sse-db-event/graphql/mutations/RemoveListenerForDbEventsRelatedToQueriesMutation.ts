import { gql } from '@apollo/client';

export const REMOVE_LISTENER_FOR_DB_EVENTS_RELATED_TO_QUERIES = gql`
  mutation RemoveListenerForDbEventsRelatedToQueries(
    $parameters: RemoveListenerForDbEventsRelatedToQueriesInput!
  ) {
    removeListenerForDbEventsRelatedToQueries(parameters: $parameters)
  }

  input RemoveListenerForDbEventsRelatedToQueriesInput {
    eventStreamId: String
    queryId: String
  }
`;
