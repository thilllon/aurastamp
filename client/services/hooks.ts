import { client, _QueryOptions } from '@/services/client';
import { useQuery } from 'react-query';

export {};

// ******************************
// get tasks
// ******************************
// type GetTaskListInput = {
//   jobId: string;
//   skip?: number;
//   take?: number;
//   status?: string;
// };

// type Task = {
//   id: string;
//   selected: boolean; // 작업완료했는지
//   order: number;
//   title: string;
// };

// export type GetTaskListOutput = {
//   tasks: Task[];
// };

// export const useGetTaskList = (
//   input: GetTaskListInput,
//   options?: _QueryOptions<GetTaskListInput, GetTaskListOutput>
// ) => {
//   const [session] = useCustomSession();
//   const query = useQuery(
//     ['TASKS', input],
//     async ({ queryKey }) => {
//       client.defaults.headers.common.authorization = session?.user.accessToken as string;
//       const { jobId, ...params } = queryKey[1];
//       const response = await client.get<GetTaskListOutput>(`/jobs/${jobId}/tasks`, { params });
//       return response.data;
//     },
//     options
//   );
//   return query;
// };
