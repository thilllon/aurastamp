import { axiosClient, _MutationOptions, _QueryOptions } from '@/apis/base';
import { useAuthorization } from '@/lib/session-client';
import { DuplicationOutput, UserOutput } from '@/types/apiTypes';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

// --------------------------------
// GetUser
// --------------------------------

export type GetUserInput = {
  userId: string;
};

export type GetUserOutput = UserOutput;

export const useGetUser = <
  OutType extends GetUserOutput = GetUserOutput,
  InType extends GetUserInput = GetUserInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetUser', input],
    async ({ queryKey }) => {
      const { userId, ...params } = queryKey[1];
      const url = `/v1/users/${userId}`;
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
// GetUsers
// --------------------------------

export type GetUsersInput = {
  skip?: number;
  take?: number;
  search?: string;
};

export type GetUsersOutput = any; // FIXME: any

export const useGetUsers = <
  OutType extends GetUsersOutput = GetUsersOutput,
  InType extends GetUsersInput = GetUsersInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetUsers', input],
    async ({ queryKey }) => {
      const { ...params } = queryKey[1];
      const url = `/v1/users`;
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
// GetUserChallenge
// --------------------------------

export type GetUserChallengeInput = {
  userId: string;
  challengeId: string;
};

export type GetUserChallengeOutput = {};

export const useGetUserChallenge = <
  OutType extends GetUserChallengeOutput = GetUserChallengeOutput,
  InType extends GetUserChallengeInput = GetUserChallengeInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetUserChallenge', input],
    async ({ queryKey }) => {
      const { userId, challengeId, ...params } = queryKey[1];
      const url = `/v1/users/${userId}/challenges/${challengeId}`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetUserChallenges
// --------------------------------

export type GetUserChallengesInput = {
  userId: string;
};

export type GetUserChallengesOutput = {};

export const useGetUserChallenges = <
  OutType extends GetUserChallengesOutput = GetUserChallengesOutput,
  InType extends GetUserChallengesInput = GetUserChallengesInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetUserChallenges', input],
    async ({ queryKey }) => {
      const { userId, ...params } = queryKey[1];
      const url = `/v1/users/${userId}/challenges`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// CheckEmailDuplication
// --------------------------------

export type CheckEmailDuplicationInput = {
  email: string;
};

export type CheckEmailDuplicationOutput = DuplicationOutput;

export const useCheckEmailDuplication = <
  OutType extends CheckEmailDuplicationOutput,
  InType extends CheckEmailDuplicationInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { email, ...params } = input;
      const url = `/v1/users/duplication/email/${email}`;
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
// UpdateAvatar
// --------------------------------

export type UpdateAvatarInput = {};

export type UpdateAvatarOutput = {};

export const useUpdateAvatar = <
  OutType extends UpdateAvatarOutput = UpdateAvatarOutput,
  InType extends UpdateAvatarInput = UpdateAvatarInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/UpdateAvatar`;
      const response = await axiosClient.patch<OutType>(url, params, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};
