import { type OnDbEvent } from '~/generated/graphql';

export type DbEventsByQueryId = Record<string, OnDbEvent[]>;
