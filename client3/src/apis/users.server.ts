import { axiosClient } from '@/apis/base';
import { getAuthorization } from '@/lib/session-server';
import { GetServerSidePropsContext } from 'next';

// --------------------------------
// UpdateAvatar
// --------------------------------

export type UpdateAvatarInput = {};

export type UpdateAvatarOutput = {};

export const fetchUpdateAvatar = async (
  input: UpdateAvatarInput,
  ctx?: GetServerSidePropsContext
): Promise<UpdateAvatarOutput> => {
  const authorization = await getAuthorization(ctx);
  const { ...params } = input;
  const url = `/v1/UpdateAvatar`;
  const response = await axiosClient.patch<UpdateAvatarOutput>(url, params, {
    headers: { authorization },
  });
  return response.data;
};
