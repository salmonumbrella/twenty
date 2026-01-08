import { type OrderBy } from './OrderBy';

export type RecordGqlOperationOrderBy = Array<{
  [fieldName: string]: OrderBy | { [subFieldName: string]: OrderBy };
}>;
