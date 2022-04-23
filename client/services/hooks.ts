// import { sleep } from '@/utils/common';
import {
  client,
  clientAux,
  makeMutationHook,
  _MutationOptions,
  _QueryOptions,
} from '@/services/client';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { SamplingMethod } from '@/utils/validators';
import { Role } from 'next-auth';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

// ******************************
// get projects
// ******************************
type Project = {
  id: string;
  name: string;
};

type GetProjectsInput = {
  status?: string;
  skip?: number;
  take?: number;
};

type GetProjectsOutput = {
  projects: Project[];
};

export const useGetProjects = (
  input: GetProjectsInput,
  options?: _QueryOptions<GetProjectsInput, GetProjectsOutput>
) => {
  const [session] = useCustomSession();
  const query = useQuery(
    ['PROJECTS', input],
    async ({ queryKey }) => {
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      const params = queryKey[1];
      const response = await client.get<GetProjectsOutput>('/projects', {
        params,
      });
      return response.data;
    },

    {
      // onError: async (err: AxiosError) => {
      //   console.error('get project error', err);
      //   console.info(session);
      //   if (err.isAxiosError && err.response?.status === 403) {
      //     router.push('/api/auth/signin?error=SessionExpired');
      //     console.info('onError', err);
      //   }
      // },
      ...options,
    }
  );
  return query;
};

// export const useGetProjectsOriginal = makeQueryHook<GetProjectsInput, GetProjectsOutput>(
//   'projects',
//   async ({ queryKey }) => {
//     console.info(queryKey[1]);
//     const response = await client.get<GetProjectsOutput>('/projects', { params: queryKey[1] });
//     return response.data;
//   }
// );

// ******************************
// get tasks
// ******************************
type GetTaskListInput = {
  jobId: string;
  skip?: number;
  take?: number;
  status?: string;
};

type Task = {
  id: string;
  selected: boolean; // 작업완료했는지
  order: number;
  title: string;
};

export type GetTaskListOutput = {
  tasks: Task[];
};

export const useGetTaskList = (
  input: GetTaskListInput,
  options?: _QueryOptions<GetTaskListInput, GetTaskListOutput>
) => {
  const [session] = useCustomSession();
  const query = useQuery(
    ['TASKS', input],
    async ({ queryKey }) => {
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      const { jobId, ...params } = queryKey[1];
      const response = await client.get<GetTaskListOutput>(`/jobs/${jobId}/tasks`, { params });
      return response.data;
    },
    options
  );
  return query;
};

// ******************************
// get task
// ******************************
type GetTaskInput = {
  jobId: string;
  taskId: string;
};

export type GetTaskOutput = {
  data: { id: string; boardType: string; title: string; content: string };
  job: { id: string; name: string };
  task: { id: string; selected: true };
  count: { total: number; finished: number };
  labels: { name: string; label: number }[];
  currentLabels: { name: string; label: number }[];
};

export const useGetTask = (
  input: GetTaskInput,
  options?: _QueryOptions<GetTaskInput, GetTaskOutput>
) => {
  const router = useRouter();
  const [session] = useCustomSession();
  const query = useQuery(
    ['TASK', input],
    async ({ queryKey }) => {
      const { jobId, taskId } = queryKey[1];
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      const response = await client.get<GetTaskOutput>(`/jobs/${jobId}/tasks/${taskId}`);
      return response.data;
      //   if (axios.isAxiosError(err) && err?.response?.status === 403) {
      //     router.push(`/projects`);
      //     throw new Error('Not Authorized');
      //   }
    },
    options
  );
  return query;
};

// NOTE: original
// export const useGetTask = makeQueryHook<GetTaskInput, GetTaskOutput>(
//   'TASK',
//   async ({ queryKey }) => {
//     const { jobId, taskId } = queryKey[1];
//     client.defaults.headers.common.authorization = queryKey[1].accessToken;
//     const response = await client.get<GetTaskOutput>(`/jobs/${jobId}/tasks/${taskId}`);
//     // console.info('asleep');
//     // console.info('awake');
//     return response.data;
//   }
// );

// ******************************
// get adjacents task
// ******************************
type GetAdjacentTaskInput = {
  jobId: string;
  taskId: string;
};

type GetAdjacentTaskOutput = {
  previous?: {
    id: string;
    selected: boolean;
  };
  next?: {
    id: string;
    selected: boolean;
  };
};

export const useGetAdjacentTasks = (
  input: GetAdjacentTaskInput,
  options?: _QueryOptions<GetAdjacentTaskInput, GetAdjacentTaskOutput>
) => {
  const [session] = useCustomSession();
  const query = useQuery(
    ['ADJACENT_TASKS', input],
    async ({ queryKey }) => {
      const { jobId, taskId } = queryKey[1] as GetAdjacentTaskInput;
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      const response = await client.get<GetAdjacentTaskOutput>(
        `/jobs/${jobId}/tasks/${taskId}/adjacents`
      );
      return response.data;
    },
    options
  );
  return query;
};

// NOTE: original
// export const useGetAdjacentTasks = makeQueryHook<GetAdjacentTaskInput, GetAdjacentTaskOutput>(
//   'ADJACENT_TASKS',
//   async ({ queryKey }) => {
//     const { jobId, taskId } = queryKey[1];
//     client.defaults.headers.common.authorization = queryKey[1].accessToken;

//     const response = await client.get<GetAdjacentTaskOutput>(
//       `/jobs/${jobId}/tasks/${taskId}/adjacents`
//     );
//     return response.data;
//   }
// );

// ******************************
// update task
// ******************************
type UpdateTaskInput = {
  jobId: string;
  taskId: string;
  labels: number[];
};

type UpdateTaskOutput = {
  labels: number[];
};

export const useUpdateTask = (options?: _MutationOptions<UpdateTaskInput, UpdateTaskOutput>) => {
  const [session] = useCustomSession();
  const mutation = useMutation(async (input: UpdateTaskInput) => {
    client.defaults.headers.common.authorization = session?.user.accessToken as string;
    const response = await client.patch<UpdateTaskOutput>(
      `/jobs/${input.jobId}/tasks/${input.taskId}`,
      { labels: input.labels }
    );
    return response.data;
  }, options);

  return mutation;
};

// NOTE: original
// export const useUpdateTask = makeMutationHook<UpdateTaskInput, UpdateTaskOutput>(async (input) => {
//   client.defaults.headers.common.authorization = input.accessToken;

//   const response = await client.patch<UpdateTaskOutput>(
//     `/jobs/${input.jobId}/tasks/${input.taskId}`,
//     { labels: input.labels }
//   );
//   return response.data;
// });

// ******************************
// get jobs
// ******************************
type GetJobsInput = {
  projectId: string;
  skip?: number;
  take?: number;
};

type GetJobsOutput = {
  jobs: {
    id: string;
    name: string;
    count: {
      total: number;
      finished: number;
    };
  }[];
};

export const useGetJobs = (
  input: GetJobsInput,
  options?: _QueryOptions<GetJobsInput, GetJobsOutput>
) => {
  const [session] = useCustomSession();
  const query = useQuery(
    ['JOBS', input],
    async ({ queryKey }) => {
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      const { projectId, ...params } = queryKey[1];
      const response = await client.get<GetJobsOutput>(`/projects/${projectId}/jobs`, {
        params,
      });
      return response.data;
    },
    options
  );
  return query;
};

// // NOTE: original
// export const useGetJobs = makeQueryHook<GetJobsInput, GetJobsOutput>(
//   'PROJECT_JOBS',
//   async ({ queryKey }) => {
//     const [session] = useCustomSession();
//     client.defaults.headers.common.authorization = session?.user.accessToken as string;
//     // client.defaults.headers.common.authorization = queryKey[1].accessToken;

//     const response = await client.get<GetJobsOutput>(`/projects/${queryKey[1].projectId}/jobs`, {
//       params: {
//         skip: queryKey[1]?.skip,
//         take: queryKey[1]?.take,
//       },
//     });
//     return response.data;
//   }
// );

// ******************************
// get job data list
// TODO: not deployed
// ******************************
// type GetJobDataListInput = {
//   jobId: string;
// } & {
//   accessToken: string;
// };

// type GetJobDataListOutput = {
//   //
// };

// export const useGetJobDataList = makeQueryHook<GetJobDataListInput, GetJobDataListOutput>(
//   'JOB_DATA_LIST',
//   async ({ queryKey }) => {
//     client.defaults.headers.common.authorization = queryKey[1].accessToken;
//     const response = await client.get<GetJobDataListOutput>(`/jobs/${queryKey[1].jobId}/data`);
//     return response.data;
//   }
// );

// ******************************
// change password
// TODO: not deployed
// ******************************
type ChangePasswordInput = {
  username: string;
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};

type ChangePasswordOutput = {
  id: string;
  username: string;
  roles: Role[];
  accessToken: string;
};
export const useChangePassword = (
  options?: _MutationOptions<ChangePasswordInput, ChangePasswordOutput>
) => {
  const [session] = useCustomSession();
  const mutation = useMutation(async (input: ChangePasswordInput) => {
    client.defaults.headers.common.authorization = session?.user.accessToken as string;
    const response = await client.patch<ChangePasswordOutput>(`/users/changePassword`, {
      username: input.username,
      password: input.password,
      newPassword: input.newPassword,
      newPasswordConfirm: input.newPasswordConfirm,
    });
    return response.data;
  }, options);

  return mutation;
};

// ******************************
// refresh token
// ******************************
type RefreshTokenInput = {
  // username: string;
  // password: string;
  // newPassword: string;
};

type RefreshTokenOutput = {
  // id: string;
  // username: string;
  // roles: Role[];
  // accessToken: string;
};

// export const useRefreshToken = makeQueryHook<RefreshTokenInput, RefreshTokenOutput>(
//   'PROJECTS',
//   async ({ queryKey }) => {
//     // client.defaults.headers.common.authorization = queryKey[1].accessToken;
//     const response = await client.get<RefreshTokenOutput>('/projects', {
//       params: { status: queryKey[1]?.status },
//     });
//     return response.data;
//   }
// );

// ******************************
// get job inconsistency
// ******************************
type GetJobInconsistenciesInput = {
  jobId: string;
  skip?: number;
  take?: number;
};

type GetJobInconsistenciesOutput = {
  data: {
    id: string;
    boardType: string;
    title: string;
    content: string;
  };
  responses: {
    username: string;
    choices: string[];
    taskId: string;
  }[];
}[];

export const useGetJobInconsistencies = (
  input: GetJobInconsistenciesInput,
  options?: _QueryOptions<GetJobInconsistenciesInput, GetJobInconsistenciesOutput>
) => {
  const [session] = useCustomSession();
  const query = useQuery(
    ['JOB_INCONSISTENCIES', input],
    async ({ queryKey }) => {
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      const { jobId, ...params } = queryKey[1];
      const response = await client.get<GetJobInconsistenciesOutput>(
        `/jobs/${jobId}/stats/inconsistencies`,
        { params }
      );
      return response.data;
    },
    options
  );
  return query;
};

// ******************************
// get project inconsistency
// ******************************
type GetProjectInconsistenciesInput = {
  projectId: string;
  skip?: number;
  take?: number;
};

type Job = {
  id: string;
  name: string;
  responses: {
    data: {
      id: string;
      boardType: string;
      title: string;
      content: string;
    };
    responses: {
      username: string;
      choices: string[];
      taskId: string;
    }[];
  }[];
};

type GetProjectInconsistenciesOutput = {
  id: string;
  name: string;
  jobs: Job[];
};

export const useGetProjectInconsistencies = (
  input: GetProjectInconsistenciesInput,
  options?: _QueryOptions<GetProjectInconsistenciesInput, GetProjectInconsistenciesOutput>
) => {
  const [session] = useCustomSession();
  console.info('outside queryFn', session);
  const query = useQuery(
    ['PROJECT_INCONSISTENCIES', input],

    async ({ queryKey }) => {
      console.info('inside queryFn', session?.user.accessToken);
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      if (!session?.user.accessToken) {
        console.dir(session);
      }
      const { projectId, ...params } = queryKey[1];
      const response = await client.get<GetProjectInconsistenciesOutput>(
        `/projects/${projectId}/stats/inconsistencies`,
        { params }
      );
      const tmp = response.data;

      return tmp;
    },
    options
  );
  return query;
};

// ******************************
// User's inconsistencies
// FIXME: api로 지원예정
// ******************************
type GetInconsistenciesInput = {
  skip?: number;
  take?: number;
};

type GetInconsistenciesOutput = {
  projectId: string;
  jobId: string;
  data: {
    id: string;
    boardType: string;
    title: string;
    content: string;
  };
  responses: {
    username: string;
    choices: string[];
    taskId: string;
  }[];
}[];

export const useGetInconsistencies = (
  input: GetInconsistenciesInput,
  options?: _QueryOptions<GetInconsistenciesInput, GetInconsistenciesOutput>
) => {
  const [session] = useCustomSession();
  const query = useQuery(
    ['INCONSISTENCIES', input],
    async ({ queryKey }) => {
      client.defaults.headers.common.authorization = session?.user.accessToken as string;

      const projects = await client.get<GetProjectsOutput>(`/projects`);
      const jobsQueue = projects.data.projects
        ?.map(({ id }) => id)
        .map(async (projectId) => {
          const res = await client.get<GetJobsOutput>(`/projects/${projectId}/jobs`, {
            params: { skip: 0, take: 9999 },
          });
          return { ...res.data, projectId };
        });
      const allJobs = await Promise.all(jobsQueue);
      console.info('allJobs', allJobs);

      const jobIds = allJobs.flatMap(({ jobs, projectId }) =>
        jobs.map((job) => [job.id, projectId])
      );
      // console.info('jobIds', jobIds);
      // console.info('jobIds', jobIds);
      // console.info('jobIds', jobIds);
      // console.info('jobIds', jobIds);
      const params = queryKey[1];
      const dataQueue = jobIds.map(async ([jobId, projectId]) => {
        const res = await client.get<GetJobInconsistenciesOutput>(
          `/jobs/${jobId}/stats/inconsistencies`,
          { params }
        );
        return { projectId, jobId, data: res.data };
      });

      console.info('dataQueue', dataQueue.length);

      const allData = await Promise.all(dataQueue);
      console.info('allData', allData);

      // const asdf: any = null;
      // return asdf;
      const result: GetInconsistenciesOutput = allData
        .map((elem, idx) => {
          const { projectId, jobId, data } = elem;
          console.info(idx);
          const tmp = data.map((elem) => {
            return { projectId, jobId, ...elem };
          });
          console.info(tmp);
          return tmp;
        })
        .flat();
      console.info('result', result);
      return result;
    },
    options
  );
  return query;
};

// ******************************
// get shorcuts
// ******************************
type GetShortcutsInput = {};
type GetShortcutsOutput = {
  shortcuts: {
    choose1: string;
    choose2: string;
    choose3: string;
    choose4: string;
    choose5: string;
    choose6: string;
    openShortcutDialog: string;
    moveToNext: string;
    moveToPrevious: string;
    toggleAutoSubmit: string;
  };
};

export const useGetShortcuts = (
  input: GetShortcutsInput,
  options?: _QueryOptions<GetShortcutsInput, GetShortcutsOutput>
) => {
  const [session] = useCustomSession();
  const query = useQuery(
    ['SHORTCUTS', input],
    async ({ queryKey }) => {
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      const response = await client.get<GetShortcutsOutput>('/users/shortcuts');
      console.info('useGetShortcuts', response.data);
      return response.data;
    },
    options
  );
  return query;
};

// ******************************
// update shorcuts
// ******************************
type UpdateShortcutsInput = {};
type UpdateShortcutsOutput = {
  shortcuts: {
    choose1: string;
    choose2: string;
    choose3: string;
    choose4: string;
    choose5: string;
    choose6: string;
    openShortcutDialog: string;
    moveToNext: string;
    moveToPrevious: string;
    toggleAutoSubmit: string;
  };
};

export const useUpdateShortcuts = (
  options?: _MutationOptions<UpdateShortcutsInput, UpdateShortcutsOutput>
) => {
  const [session] = useCustomSession();
  const mutation = useMutation(async (input: UpdateTaskInput) => {
    client.defaults.headers.common.authorization = session?.user.accessToken as string;
    const response = await client.patch<UpdateShortcutsOutput>('/users/shortcuts', input);
    return response.data;
  }, options);
  return mutation;
};

// ******************************
// get articles
// ******************************
export type Article = {
  press: string;
  pressId: string;
  title: string;
  href: string;
  publishedAt: number;
};
type GetArticlesInput = {
  from?: Date;
  to?: Date;
  skip?: number;
  take?: number;
};
type GetArticlesOutput = Article[];

export const useGetArticles = (
  input: GetArticlesInput,
  options?: _QueryOptions<GetArticlesInput, GetArticlesOutput>
) => {
  const query = useQuery(
    ['ARTICLES', input],
    async ({ queryKey }) => {
      const response = await clientAux.get<GetArticlesOutput>('/articles', {
        params: queryKey[1],
      });
      return response.data;
    },
    options
  );
  return query;
};

// ******************************
// scrape articles
// ******************************
type ScrapeArticlesInput = {
  pageFrom?: number;
  pageTo?: number;
};
type ScrapeArticlesOutput = {};

export const useScrapeArticles = (
  options?: _MutationOptions<ScrapeArticlesInput, ScrapeArticlesOutput>
) => {
  const [session] = useCustomSession();
  const mutation = useMutation(async (input: ScrapeArticlesInput) => {
    clientAux.defaults.headers.common.authorization = session?.user.accessToken as string;
    const response = await clientAux.patch<ScrapeArticlesOutput>('/articles/scrape/all', {
      ...input,
      secret: '1af65b016d0052e1f58c452c9d139846',
    });
    return response.data;
  }, options);
  return mutation;
};

// ******************************
// create a project
// ******************************
type UserId = string;

export type CreateProjectInput = {
  data: {
    project: {
      name: string;
      description: string;
      dateStart: string;
      dateEnd: string;
      workers: UserId[];
      managers: UserId[];
    };
    sampling: {
      method: SamplingMethod;
      size: number;
    };
    jobs: {
      count: number;
      allocation: { users: UserId[]; data: [number, number] }[];
    };
  };
  file: File;
};

// {
// 	"project": {
// 		"name":"new project",
// 		"description": "description",
// 		"dateStart": "2022-03-22T02:31:12.879Z",
// 		"dateEnd": "2022-03-22T02:31:12.879Z",
// 		"workers": ["e319a36f-2311-4211-ba5e-d76974e55aca", "6ce1c37c-6928-4def-a262-26094e205d49"],
// 		"managers": ["7be96eca-f567-491c-a3f9-1ccbc935003f"],
// 	},
// 	"sampling": {
// 		"method": "Monte Carlo"
//    "size":500,
// 	},
// 	"jobs": {
// 		"count": 2,
// 		"allocation": [{
// 			"users": ["e319a36f-2311-4211-ba5e-d76974e55aca"],
// 			"data": [0,49]
// 		},
// 		{
// 			"users": ["6ce1c37c-6928-4def-a262-26094e205d49"],
// 			"data": [50,99]
// 		}
// 		]
// 	}
// }

type CreateProjectOutput = {};

export const useCreateProject = (
  options?: _MutationOptions<CreateProjectInput, CreateProjectOutput>
) => {
  const [session] = useCustomSession();
  const mutation = useMutation(async (input: CreateProjectInput) => {
    const formData = new FormData();
    formData.append('file', input.file);
    formData.append('data', new Blob([JSON.stringify(input.data)], { type: 'application/json' }));

    client.defaults.headers.common.authorization = session?.user.accessToken as string;
    const response = await client.post<CreateProjectOutput>('/projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }, options);
  return mutation;
};

// ******************************
// file upload
// ******************************
type UploadFileInput = {
  files: File[];
  dto: Record<string, any>;
};

type UploadFileOutput = {};

export const useUploadFile = (options?: _MutationOptions<UploadFileInput, UploadFileOutput>) => {
  const [session] = useCustomSession();

  const mutation = useMutation(async (input: UploadFileInput) => {
    const formData = new FormData();

    input.files.forEach((file, idx) => {
      formData.append('file' + idx, new Blob([file], { type: file.type }));
    });
    formData.append('dto', new Blob([JSON.stringify(input.dto)], { type: 'application/json' }));

    const response = await client.post<UploadFileOutput>('/files', formData, {
      withCredentials: false,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }, options);

  return mutation;
};
