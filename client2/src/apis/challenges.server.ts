import { axiosClient } from '@/apis/base';
import {
  GetChallengeInput,
  GetChallengeOutput,
  GetChallengesInput,
  GetChallengesOutput,
} from '@/apis/challenges';
import { getAuthorization } from '@/lib/session-server';
import { GetServerSidePropsContext } from 'next';

// --------------------------------
// GetChallenge
// --------------------------------

export const fetchGetChallenge = async (
  input: GetChallengeInput,
  ctx?: GetServerSidePropsContext
): Promise<GetChallengeOutput> => {
  const authorization = await getAuthorization(ctx);
  const { challengeId, ...params } = input;
  const url = `/v1/challenges/${challengeId}`;
  const response = await axiosClient.get<GetChallengeOutput>(url, {
    params,
    headers: { authorization },
  });
  return response.data;
};

// --------------------------------
// GetChallenges
// --------------------------------

export const fetchGetChallenges = async (
  input: GetChallengesInput,
  ctx?: GetServerSidePropsContext
): Promise<GetChallengesOutput> => {
  const authorization = await getAuthorization(ctx);
  console.log(authorization);
  const { ...params } = input;
  const url = `/v1/challenges`;
  const response = await axiosClient.get<GetChallengesOutput>(url, {
    params,
    headers: { authorization },
  });
  return response.data;
};
