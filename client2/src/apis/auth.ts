import { axiosClient, _MutationOptions, _QueryOptions } from '@/apis/base';
import { useAuthorization } from '@/lib/session-client';
import {
  AccountOutput,
  ChangePasswordInput,
  ConnectSocialAccountInput,
  ResetPasswordInput,
  SendResetPasswordLinkInput,
  SignInLocalInput,
  SignUpLocalInput,
} from '@/types/apiTypes';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

// --------------------------------
// ResetPassword
// --------------------------------

export type ResetPasswordOutput = {
  status: number | string;
};

export const useResetPassword = <
  OutType extends ResetPasswordOutput = ResetPasswordOutput,
  InType extends ResetPasswordInput = ResetPasswordInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/reset-password/reset`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SendResetPasswordLink
// --------------------------------

export type SendResetPasswordLinkOutput = {
  status: number;
};

export const useSendResetPasswordLink = <
  OutType extends SendResetPasswordLinkOutput = SendResetPasswordLinkOutput,
  InType extends SendResetPasswordLinkInput = SendResetPasswordLinkInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/reset-password/verification`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SendVerificationEmail
// --------------------------------

export type SendVerificationEmailInput = {
  email: string;
};

export type SendVerificationEmailOutput = {
  status: number;
};

export const useSendVerificationEmail = <
  OutType extends SendVerificationEmailOutput = SendVerificationEmailOutput,
  InType extends SendVerificationEmailInput = SendVerificationEmailInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/verification/email`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// VerifyEmailToken
// --------------------------------

export type VerifyEmailTokenInput = {
  token: string;
};

export type VerifyEmailTokenOutput = {
  token: string;
  email: string;
};

export const useVerifyEmailToken = <
  OutType extends VerifyEmailTokenOutput = VerifyEmailTokenOutput,
  InType extends VerifyEmailTokenInput = VerifyEmailTokenInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/verification/email`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SignUpLocal
// --------------------------------

export type SignUpLocalOutput = {};

export const useSignUpLocal = <
  OutType extends SignUpLocalOutput = SignUpLocalOutput,
  InType extends SignUpLocalInput = SignUpLocalInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/signup/local`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SignInLocal
// --------------------------------

export type SignInLocalOutput = {
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string;
  };
  accessToken: string;
};

export const useSignInLocal = <
  OutType extends SignInLocalOutput = SignInLocalOutput,
  InType extends SignInLocalInput = SignInLocalInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/signin/local`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SubmitWork
// --------------------------------

export type SubmitWorkInput = {
  workId: string;
};

export type SubmitWorkOutput = {
  message: string;
};

export const useSubmitWork = <
  OutType extends SubmitWorkOutput = SubmitWorkOutput,
  InType extends SubmitWorkInput = SubmitWorkInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { workId, ...params } = input;
      const url = `/v1/works/${workId}/submission/request`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SignUpBusiness
// --------------------------------

export type SignUpBusinessInput = {
  organization: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  passwordConfirmation: string;
  agreedMarketing: boolean;
  agreedPrivacy: boolean;
  type: 'BUSINESS';
};

export type SignUpBusinessOutput = {};

export const useSignUpBusiness = <
  OutType extends SignUpBusinessOutput = SignUpBusinessOutput,
  InType extends SignUpBusinessInput = SignUpBusinessInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/signup-business`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetSocialAccounts
// --------------------------------

export type GetSocialAccountsInput = {};

export type GetSocialAccountsOutput = {
  provider: string;
  providerAccountId: string;
}[];

export const useGetSocialAccounts = <
  OutType extends GetSocialAccountsOutput = GetSocialAccountsOutput,
  InType extends GetSocialAccountsInput = GetSocialAccountsInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();

  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetSocialAccounts', input],
    async ({ queryKey }) => {
      const { ...params } = queryKey[1];
      const url = `/v1/auth/accounts`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchGetSocialAccounts = async (
//   input: GetSocialAccountsInput,
//   ctx: GetServerSidePropsContext
// ): Promise<GetSocialAccountsOutput> => {

//   const { ...params } = input;
//   const url = `/v1/auth/accounts`;
//   const response = await axiosClient.get<GetSocialAccountsOutput>(url, {
//     params,
//     headers: { authorization },
//   });
//   return response.data;
// };

// --------------------------------
// ChangePassword
// --------------------------------

export type ChangePasswordOutput = {
  status: number | string;
};

export const useChangePassword = <
  OutType extends ChangePasswordOutput = ChangePasswordOutput,
  InType extends ChangePasswordInput = ChangePasswordInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/new-password`;
      const response = await axiosClient.patch<OutType>(url, params, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// DeleteOauthAccount
// --------------------------------

export type DeleteOauthAccountInput = {
  provider: string;
};

export type DeleteOauthAccountOutput = AccountOutput;

export const useDeleteOauthAccount = <
  OutType extends DeleteOauthAccountOutput,
  InType extends DeleteOauthAccountInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { provider, ...params } = input;
      const url = `/v1/auth/accounts/${provider}`;
      const response = await axiosClient.delete<OutType>(url, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SignOut
// --------------------------------

export type SignOutInput = {};

export type SignOutOutput = {};

export const useSignOut = <OutType extends SignOutOutput, InType extends SignOutInput>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;

      const url = `/v1/auth/signout`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SocialAccountsByProvider
// GetSocialAccountByProvider
// --------------------------------

export type GetSocialAccountByProviderInput = {
  provider: string;
};

export type GetSocialAccountByProviderOutput = {
  id: string;
  userId: string;
  provider: string;
  providerAccountId: string;
};

export const useGetSocialAccountByProvider = <
  OutType extends GetSocialAccountsOutput = GetSocialAccountsOutput,
  InType extends GetSocialAccountsInput = GetSocialAccountsInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();

  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetSocialAccounts', input],
    async ({ queryKey }) => {
      const { ...params } = queryKey[1];
      const url = `/v1/auth/accounts`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// ConnectSocialAccount
// --------------------------------

export type ConnectSocialAccountOutput = {
  provider: string;
  providerAccountId: string;
};

export const useConnectSocialAccount = <
  OutType extends ConnectSocialAccountOutput = ConnectSocialAccountOutput,
  InType extends ConnectSocialAccountInput = ConnectSocialAccountInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v1/auth/accounts`;
      const response = await axiosClient.post<OutType>(url, params, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// DeleteSocialAccountByProvider
// --------------------------------

export type DeleteSocialAccountByProviderInput = {
  provider: string;
};

export type DeleteSocialAccountByProviderOutput = {};

export const useDeleteSocialAccountByProvider = <
  OutType extends DeleteSocialAccountByProviderOutput = DeleteSocialAccountByProviderOutput,
  InType extends DeleteSocialAccountByProviderInput = DeleteSocialAccountByProviderInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const url = `/v1/auth/accounts/${input.provider}`;
      const response = await axiosClient.delete<OutType>(url, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};
