import axios, { AxiosError } from 'axios';
import { UseMutationOptions, UseQueryOptions } from 'react-query';

export type MutationOptions<Output, Input, Context = unknown> =
  | Omit<UseMutationOptions<Output, AxiosError, Input, Context>, 'mutationFn'>
  | undefined;

export type QueryOptions<Output, Input> = Omit<
  UseQueryOptions<Output, AxiosError, Output, [string, Input]>,
  'queryKey' | 'queryFn'
>;

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
});
