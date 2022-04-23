export declare module 'react-query' {
  // TODO: PR 날리기
  type QueryKey = string | readonly unknown[] | readonly [string, Record<string, unknown>];

  interface QueryConfig<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> {
    cache: QueryCache;
    queryKey: TQueryKey;
    queryHash: string;
    options?: QueryOptions<TQueryFnData, TError, TData, TQueryKey>;
    defaultOptions?: QueryOptions<TQueryFnData, TError, TData, TQueryKey>;
    state?: QueryState<TData, TError>;
    meta: QueryMeta | undefined;
  }
}
