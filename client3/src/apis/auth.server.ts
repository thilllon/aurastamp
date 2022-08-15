import { ConnectSocialAccountOutput, SignOutInput, SignOutOutput } from '@/apis/auth';
import { axiosClient } from '@/apis/base';
import { getAuthorization } from '@/lib/session-server';
import { ConnectSocialAccountInput } from '@/types/apiTypes';
import { GetServerSidePropsContext } from 'next';

// --------------------------------
// SignOut
// --------------------------------

export const fetchSignOut = async (
  input: SignOutInput,
  ctx?: GetServerSidePropsContext
): Promise<SignOutOutput> => {
  const authorization = await getAuthorization(ctx);
  const { ...params } = input;
  const url = `/v1/auth/signout`;
  const response = await axiosClient.post<SignOutOutput>(url, params, {
    headers: { authorization },
  });
  return response.data;
};

// --------------------------------
// ConnectSocialAccount
// --------------------------------

export const fetchConnectSocialAccount = async (
  input: ConnectSocialAccountInput,
  ctx: GetServerSidePropsContext
): Promise<ConnectSocialAccountOutput> => {
  const authorization = await getAuthorization(ctx);
  const { ...params } = input;
  const url = `/v1/auth/accounts`;
  const response = await axiosClient.post<ConnectSocialAccountOutput>(url, params, {
    headers: { authorization },
  });
  return response.data;
};
