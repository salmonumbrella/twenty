import { gql } from '@apollo/client';

export const ADD_LISTENER_FOR_DB_EVENTS_RELATED_TO_QUERIES = gql`
  mutation AddListenerForDbEventsRelatedToQueries(
    $parameters: AddListenerForDbEventsRelatedToQueriesInput!
  ) {
    addListenerForDbEventsRelatedToQueries(parameters: $parameters)
  }

  input AddListenerForDbEventsRelatedToQueriesInput {
    eventStreamId: String
    queryId: String
    query: String
  }
`;
