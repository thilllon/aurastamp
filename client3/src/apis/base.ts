import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { UseMutationOptions, UseQueryOptions } from 'react-query';
import * as Sentry from '@sentry/nextjs';

export type _MutationOptions<Output, Input, Context = unknown> =
  | Omit<UseMutationOptions<Output, AxiosError<Output, Input>, Input, Context>, 'mutationFn'>
  | undefined;

export type _QueryOptions<Output, Input> = Omit<
  UseQueryOptions<Output, AxiosError, Output, [string, Input]>,
  'queryKey' | 'queryFn'
>;

// // FIXME: infinite rendering bug
// export const useAxiosClient = <D = any>(config: AxiosRequestConfig<D> = {}) => {
//   throw new Error('not implemented');
//   const authorization = useAuthorization();
//   const [axiosClient, setAxiosClient] = useState<AxiosInstance>();
//   useEffect(() => {
//     console.log('useAxiosClient: ', authorization, config);
//     const axiosClient = axios.create({
//       baseURL: process.env.NEXT_PUBLIC_API_URL,
//       headers: { 'Content-type': 'application/json', authorization },
//       withCredentials: true,
//       ...config,
//     } as AxiosRequestConfig<D>);
//     setAxiosClient(axiosClient);
//   }, [authorization, config]);
//   return axiosClient;
// };

// retry logic은 여기가 아니라 react-query로 위임할 것.
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  async (config) => {
    // const authorization =typeof window==='undefined'? await getAuthorization();
    // config.headers.Authorization = `Bearer ${authorization}`;
    // return config;
    return config;
  },
  async (error) => {
    console.group('ERROR');
    console.error(error?.response?.data);
    console.groupEnd();
    Sentry.captureException(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.group('ERROR');
    console.error(error?.response?.data);
    console.groupEnd();
    Sentry.captureException(error);
    return Promise.reject(error);
  }
);
