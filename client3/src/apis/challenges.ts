import { axiosClient, _MutationOptions, _QueryOptions } from '@/apis/base';
import { useAuthorization } from '@/lib/session-client';
import {
  AnswerCreateInput,
  AnswerOutput,
  ChallengeAwardCreateInput,
  ChallengeAwardOutput,
  ChallengeCreateInput,
  ChallengeLeaderBoardOutput,
  ChallengeOutput,
  HttpStatusOutput,
  ProblemOutput,
  ProgressOutput,
  QuestionOutput,
  UserStatusOutput,
  WorkOutput,
} from '@/types/apiTypes';
import { ChallengeStatus, Framework, Language } from '@/types/apiTypesFromEnums';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

// --------------------------------
// CreateChallenge
// --------------------------------

export type CreateChallengeInput = ChallengeCreateInput;

export type CreateChallengeOutput = ChallengeOutput;

export const useCreateChallenge = <
  OutType extends CreateChallengeOutput = CreateChallengeOutput,
  InType extends CreateChallengeInput = CreateChallengeInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/challenges`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetChallenges
// --------------------------------

export type GetChallengesInput = {
  onlyMeta?: number;
  status?: ChallengeStatus;
  skip?: number;
  take?: number;
};

export type GetChallengesOutput = ChallengeOutput[];

export const useGetChallenges = <
  OutType extends GetChallengesOutput = GetChallengesOutput,
  InType extends GetChallengesInput = GetChallengesInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetChallenges', input],
    async ({ queryKey }) => {
      const { ...params } = queryKey[1];
      const url = `/v2/challenges`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// CreateChallengeAward
// --------------------------------

export type CreateChallengeAwardInput = ChallengeAwardCreateInput;

export type CreateChallengeAwardOutput = ChallengeAwardOutput;

export const useCreateChallengeAward = <
  OutType extends CreateChallengeAwardOutput = CreateChallengeAwardOutput,
  InType extends CreateChallengeAwardInput = CreateChallengeAwardInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/challenges/award`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// RegisterChallenge
// --------------------------------

export type RegisterChallengeInput = {
  challengeId: string;
};

export type RegisterChallengeOutput = UserStatusOutput;

export const useRegisterChallenge = <
  OutType extends RegisterChallengeOutput = RegisterChallengeOutput,
  InType extends RegisterChallengeInput = RegisterChallengeInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { challengeId, ...params } = input;
      const url = `/v1/challenges/${challengeId}/participation`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// DeregisterChallenge
// --------------------------------

export type DeregisterChallengeInput = {
  challengeId: string;
};

export type DeregisterChallengeOutput = {};

export const useDeregisterChallenge = <
  OutType extends DeregisterChallengeOutput,
  InType extends DeregisterChallengeInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { challengeId, ...params } = input;
      const url = `/v1/challenges/${challengeId}`;
      const response = await axiosClient.delete<OutType>(url, {
        params,
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchDeregisterChallenge = async (
//   input: DeregisterChallengeInput,
//   ctx: GetServerSidePropsContext
// ): Promise<DeregisterChallengeOutput> => {
//   const authorization = null;
//   const { ...params } = input;
//   const url = `/v1/challenges.........`;
//   const response = await axiosClient.delete<DeregisterChallengeOutput>(url, {
//     params,
//     headers: { authorization },
//   });
//   return response.data;
// };

// --------------------------------
// GetChallengeResults
// --------------------------------

export type GetChallengeResultsInput = {
  challengeId: string;
};

export type GetChallengeResultsOutput = ChallengeOutput;

export const useGetChallengeResults = <
  OutType extends GetChallengeResultsOutput = GetChallengeResultsOutput,
  InType extends GetChallengeResultsInput = GetChallengeResultsInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetChallengeResults', input],
    async ({ queryKey }) => {
      const { challengeId, ...params } = queryKey[1];
      if (!authorization) {
        throw new Error('`authorization` is missing');
      }
      if (!challengeId) {
        throw new Error('`challengeId` is missing');
      }
      const url = `/v1/challenges/${challengeId}/results`;
      const response = await axiosClient.get<OutType>(url, {
        params,
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetChallengeResultsProgress
// --------------------------------

export type GetChallengeResultsProgressInput = {
  challengeId: string;
};

export type GetChallengeResultsProgressOutput = ProgressOutput;

export const useGetChallengeResultsProgress = <
  OutType extends GetChallengeResultsProgressOutput,
  InType extends GetChallengeResultsProgressInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();

  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetChallengeResultsProgress', input],
    async ({ queryKey }) => {
      const { challengeId, ...params } = queryKey[1];
      const url = `/v1/challenges/${challengeId}/results/progress`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchGetChallengeResultsProgress = async (
//   input: GetChallengeResultsProgressInput,
//   ctx: GetServerSidePropsContext
// ): Promise<GetChallengeResultsProgressOutput> => {
//   const authorization = null;
//   const { challengeId, ...params } = input;
//   const url = `/v1/challenges/${challengeId}/results/progress`;
//   const response = await axiosClient.get<GetChallengeResultsProgressOutput>(url, {
//     params,
//     headers: { authorization },
//   });
//   return response.data;
// };

// --------------------------------
// GetChallengeLeaderboard
// --------------------------------

export type GetChallengeLeaderboardInput = {
  challengeId: string;
};

export type GetChallengeLeaderboardOutput = ChallengeLeaderBoardOutput;

export const useGetChallengeLeaderboard = <
  OutType extends GetChallengeLeaderboardOutput,
  InType extends GetChallengeLeaderboardInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetChallengeLeaderboard', input],
    async ({ queryKey }) => {
      const { challengeId, ...params } = queryKey[1];
      const url = `/v1/challenges/${challengeId}/leaderboard`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetChallengeProblems
// --------------------------------

export type GetChallengeProblemsInput = {
  challengeId: string;
  inProgress?: boolean;
  skip?: number;
  take?: number;
};

export type GetChallengeProblemsOutput = ProblemOutput;

export const useGetChallengeProblems = <
  OutType extends GetChallengeProblemsOutput = GetChallengeProblemsOutput,
  InType extends GetChallengeProblemsInput = GetChallengeProblemsInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetChallengeProblems', input],
    async ({ queryKey }) => {
      const { challengeId, ...params } = queryKey[1];
      const url = `/v2/challenges/${challengeId}/problems`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetChallenge
// --------------------------------

export type GetChallengeInput = {
  challengeId: string;
  onlyMeta?: number;
};

export type GetChallengeOutput = ChallengeOutput;

export const useGetChallenge = <
  OutType extends GetChallengeOutput = GetChallengeOutput,
  InType extends GetChallengeInput = GetChallengeInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetChallenge', input],
    async ({ queryKey }) => {
      const { challengeId, ...params } = queryKey[1];
      const url = `/v2/challenges/${challengeId}`;
      const response = await axiosClient.get<OutType>(url, {
        params,
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// FinishChallenge
// --------------------------------

export type FinishChallengeInput = {
  challengeId: string;
};

export type FinishChallengeOutput = HttpStatusOutput;

export const useFinishChallenge = <
  OutType extends FinishChallengeOutput = FinishChallengeOutput,
  InType extends FinishChallengeInput = FinishChallengeInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { challengeId, ...params } = input;
      const url = `/v1/challenges/${challengeId}/end`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// StartChallenge
// --------------------------------

export type StartChallengeInput = {
  challengeId: string;
  language?: Language;
  framework?: Framework;
};

export type StartChallengeOutput = WorkOutput;

export const useStartChallenge = <
  OutType extends StartChallengeOutput = StartChallengeOutput,
  InType extends StartChallengeInput = StartChallengeInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { challengeId, ...params } = input;
      const url = `/v1/challenges/${challengeId}/start`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchStartChallenge = async (
//   input: StartChallengeInput,
//   ctx: GetServerSidePropsContext
// ): Promise<StartChallengeOutput> => {
//   const authorization = null;
//   const { challengeId, ...params } = input;
//   const url = `/v1/challenges/${challengeId}/start`;
//   const response = await axiosClient.post<StartChallengeOutput>(url, params, {
//     headers: { authorization },
//   });
//   return response.data;
// };

// --------------------------------
// UpdateChallenge
// --------------------------------

export type UpdateChallengeInput = {
  challengeId: string;
};

export type UpdateChallengeOutput = any;

export const useUpdateChallenge = <
  OutType extends UpdateChallengeOutput,
  InType extends UpdateChallengeInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { challengeId, ...params } = input;
      const url = `/v1/challenges/${challengeId}`;
      const response = await axiosClient.patch<OutType>(url, params, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchUpdateChallenge = async (
//   input: UpdateChallengeInput,
//   ctx: GetServerSidePropsContext
// ): Promise<UpdateChallengeOutput> => {
//   const authorization = null;
//   const { challengeId, ...params } = input;
//   const url = `/v1/challenges/${challengeId}`;
//   const response = await axiosClient.patch<UpdateChallengeOutput>(url, params, {
//     headers: { authorization },
//   });
//   return response.data;
// };

// --------------------------------
// GetChallengeUserStatus
// --------------------------------

export type GetChallengeUserStatusInput = {
  challengeId: string;
};

export type GetChallengeUserStatusOutput = UserStatusOutput;

export const useGetChallengeUserStatus = <
  OutType extends GetChallengeUserStatusOutput,
  InType extends GetChallengeUserStatusInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetChallengeUserStatus', input],
    async ({ queryKey }) => {
      const { challengeId, ...params } = queryKey[1];
      const url = `/v1/challenges/${challengeId}/user-status`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchGetChallengeUserStatus = async (
//   input: GetChallengeUserStatusInput,
//   ctx: GetServerSidePropsContext
// ): Promise<GetChallengeUserStatusOutput> => {
//   const authorization = null;
//   const { challengeId, ...params } = input;
//   const url = `/v1/challenges/${challengeId}/user-status`;
//   const response = await axiosClient.get<GetChallengeUserStatusOutput>(url, {
//     params,
//     headers: { authorization },
//   });
//   return response.data;
// };

// --------------------------------
// GetFeedbackQuestions
// --------------------------------

export type GetFeedbackQuestionsInput = {
  challengeId: string;
};

export type GetFeedbackQuestionsOutput = QuestionOutput[];

export const useGetFeedbackQuestions = <
  OutType extends GetFeedbackQuestionsOutput,
  InType extends GetFeedbackQuestionsInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetFeedbackQuestions', input],
    async ({ queryKey }) => {
      const { challengeId, ...params } = queryKey[1];
      const url = `/v1/challenges/${challengeId}/feedback/questions`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetFeedbackAnswers
// --------------------------------

export type GetFeedbackAnswersInput = {
  challengeId: string;
};

export type GetFeedbackAnswersOutput = AnswerOutput;

export const useGetFeedbackAnswers = <
  OutType extends GetFeedbackAnswersOutput,
  InType extends GetFeedbackAnswersInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetFeedbackAnswers', input],
    async ({ queryKey }) => {
      const { challengeId, ...params } = queryKey[1];
      const url = `/v1/challenges/${challengeId}/feedback/questions`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// CreateFeedbackAnswer
// --------------------------------

export type CreateFeedbackAnswerInput = AnswerCreateInput & { challengeId: string };

export type CreateFeedbackAnswerOutput = AnswerOutput;

export const useCreateFeedbackAnswer = <
  OutType extends CreateFeedbackAnswerOutput = CreateFeedbackAnswerOutput,
  InType extends CreateFeedbackAnswerInput = CreateFeedbackAnswerInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { challengeId, ...params } = input;
      const url = `/v1/challenges/${challengeId}/feedback/answers`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};
