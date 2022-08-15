import { axiosClient } from '@/apis/base';
import { GetWorksInput, GetWorksOutput, GetWorkUrlInput, GetWorkUrlOutput } from '@/apis/works';
import { getAuthorization } from '@/lib/session-server';
import { GetServerSidePropsContext } from 'next';

// --------------------------------
// GetWorks
// --------------------------------

export const fetchGetWorks = async (
  input: GetWorksInput,
  ctx?: GetServerSidePropsContext
): Promise<GetWorksOutput> => {
  const authorization = await getAuthorization(ctx);
  const { ...params } = input;
  const url = `/v1/works`;
  const response = await axiosClient.get<GetWorksOutput>(url, {
    params,
    headers: { authorization },
  });
  return response.data;
};

// --------------------------------
// GetWorkUrl
// --------------------------------

export const fetchGetWorkUrl = async (
  input: GetWorkUrlInput,
  ctx: GetServerSidePropsContext
): Promise<GetWorkUrlOutput> => {
  const authorization = await getAuthorization(ctx);
  const { workId, ...params } = input;
  const url = `/v1/works/${workId}/url`;
  const response = await axiosClient.get<GetWorkUrlOutput>(url, {
    params,
    headers: { authorization },
  });
  return response.data;
};
