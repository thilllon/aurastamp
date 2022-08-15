import { axiosClient } from '@/apis/base';
import {
  GetChallengeInput,
  GetChallengeLeaderboardInput,
  GetChallengeLeaderboardOutput,
  GetChallengeOutput,
  GetChallengeResultsInput,
  GetChallengeResultsOutput,
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
  const url = `/v2/challenges/${challengeId}`;
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
  const url = `/v2/challenges`;
  const response = await axiosClient.get<GetChallengesOutput>(url, {
    params,
    headers: { authorization },
  });
  return response.data;
};

// --------------------------------
// GetChallengeLeaderboard
// --------------------------------

export const fetchGetChallengeLeaderboard = async (
  input: GetChallengeLeaderboardInput,
  ctx: GetServerSidePropsContext
): Promise<GetChallengeLeaderboardOutput> => {
  const authorization = null;
  const { challengeId, ...params } = input;
  const url = `/v1/challenges/${challengeId}/leaderboard`;
  const response = await axiosClient.get<GetChallengeLeaderboardOutput>(url, {
    params,
    headers: { authorization },
  });
  return response.data;
};

// --------------------------------
// GetChallengeResults
// --------------------------------

export const fetchGetChallengeResults = async (
  input: GetChallengeResultsInput,
  ctx: GetServerSidePropsContext
): Promise<GetChallengeResultsOutput> => {
  const authorization = null;
  const { challengeId, ...params } = input;
  const url = `/v1/challenges/${challengeId}/results`;
  const response = await axiosClient.get<GetChallengeResultsOutput>(url, {
    params,
    headers: { authorization },
  });
  return response.data;
};
