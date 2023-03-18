import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, UseQueryOptions } from 'react-query';
// import { sleep } from '@/utils/common';

// const source = axios.CancelToken.source();

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 86400,
  },
  timeout: 5000,
  withCredentials: true,
  // cancelToken: source.token,
});

export const clientAux = axios.create({
  baseURL: 'https://server-nest-rest.azurewebsites.net',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 86400,
  },
  timeout: 5000,
  withCredentials: true,
  // cancelToken: source.token,
});

export const clientLocal = axios.create({
  baseURL: 'http://localhost:4444',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 86400,
  },
  timeout: 5000,
  withCredentials: true,
  // cancelToken: source.token,
});

export const vercelClient = axios.create({
  baseURL: 'https://api.vercel.com',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 86400,
  },
  timeout: 5000,
  withCredentials: true,
  // cancelToken: source.token,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    //     const originalConfig = error.config;
    //     if (error.response.status === 403 && !originalConfig._retry) {
    //       originalConfig._retry = true;
    //       axios.defaults.headers.common['Authorization'] = accessToken;
    //       return client(originalConfig);
    //     }
    return Promise.reject(error);
  }
);

export type _MutationOptions<TInput, TOutput, Context = unknown> =
  | Omit<UseMutationOptions<TOutput, AxiosError, TInput, Context>, 'mutationFn'>
  | undefined;

export type _QueryOptions<TInput, TOutput> = Omit<
  UseQueryOptions<TOutput, AxiosError, TOutput, [string, TInput]>,
  'queryKey' | 'queryFn'
>;

export const makeMutationHook = <TInput, TOutput>(
  callback: (input: TInput) => Promise<TOutput>
) => {
  return (options?: _MutationOptions<TInput, TOutput>) => {
    return useMutation<TOutput, AxiosError, TInput>(callback, options);
  };
};
