import axios, { AxiosError } from 'axios';
import { UseMutationOptions } from 'react-query';

export type MutationOptions<Output, Input, Context = unknown> =
  | Omit<UseMutationOptions<Output, AxiosError, Input, Context>, 'mutationFn'>
  | undefined;

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
});
