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

// client.interceptors.request.use(
//   async (config) => {
//     // const value = await redisClient.get(rediskey);
//     // const keys = JSON.parse(value);

//     config.headers = {
//       // Authorization: `Bearer ${keys.access_token}`,
//       // Accept: 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     };
//     return config;
//   },
//   (err) => {
//     Promise.reject(err);
//   }
// );

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
    }

    //     const originalConfig = error.config;
    //     if (error.response.status === 403 && !originalConfig._retry) {
    //       originalConfig._retry = true;
    //       axios.defaults.headers.common['Authorization'] = accessToken;
    //       return client(originalConfig);
    //     }
    return Promise.reject(error);
  }
);

// TODO: queryKey: (string | TInput)[]; 현재 패키지에 이렇게 정의되어있음. 첫번째 항은 항상 string이고 두번째 항은 항상 input param object 이므로 조금 더 specific한 타입을 사용하는 것이 좋음. 향후 react-query PR할 것.

export type _MutationOptions<TInput, TOutput, Context = unknown> =
  | Omit<UseMutationOptions<TOutput, AxiosError, TInput, Context>, 'mutationFn'>
  | undefined;

export type _QueryOptions<TInput, TOutput> = Omit<
  UseQueryOptions<TOutput, AxiosError, TOutput, [string, TInput]>,
  'queryKey' | 'queryFn'
>;

// 샘플
// useQuery<
//   GetTaskListOutput,
//   AxiosError,
//   GetTaskListOutput,
//   [string, GetTaskListInput]
// >();

// type TQueryFn<TInput, TOutput> = ({ queryKey }: { queryKey: [string, TInput] }) => Promise<TOutput>;

// const makeQueryHook = <TInput, TOutput>(queryKey: string, queryFn: TQueryFn<TInput, TOutput>) => {
//   return (input: TInput, options?: QueryOptions<TInput, TOutput>) => {
//     const { data: session } = useSessionTmp();
//     client.defaults.headers.common.Authorization = session?.user.accessToken as string;
//     return useQuery<TOutput, AxiosError, TOutput, [string, TInput]>([queryKey, input], queryFn, {
//       retry: (failureCount, error) => {
//         if (error?.response?.status === 403) {
//           return true;
//         }
//         return true;
//       },
//       onError: async (err: AxiosError) => {
//       },둣
//       ...options,
//     });
//   };
// };

export const makeMutationHook = <TInput, TOutput>(
  callback: (input: TInput) => Promise<TOutput>
) => {
  return (options?: _MutationOptions<TInput, TOutput>) => {
    return useMutation<TOutput, AxiosError, TInput>(callback, options);
  };
};
