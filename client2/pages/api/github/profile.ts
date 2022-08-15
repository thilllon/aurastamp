import { fetchConnectSocialAccount } from '@/apis/auth.server';
import { githubConnectionMessages } from '@/utils/constants';
import { withSentry } from '@sentry/nextjs';
import axios from 'axios';
import { NextApiHandler } from 'next';
import * as qs from 'qs';

type GithubUser = any & {
  id: number;
};

type GithubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: 'public' | string;
};

const handler: NextApiHandler = async (req, res) => {
  const baseUrl = 'https://api.github.com';
  const urlObject = new URL(process.env.GITHUB_PROFILE_REDIRECT_URI);

  try {
    const { data: token } = await axios
      .post<string>('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_PROFILE_CLIENT_ID,
        client_secret: process.env.GITHUB_PROFILE_SECRET,
        code: req.query.code,
      })
      .catch((err) => {
        console.error(err);
        throw new Error(githubConnectionMessages.failToGetToken);
      });
    const { access_token: accessToken, token_type: tokenType, scope } = qs.parse(token);
    const authorization = `token ${accessToken}`;
    const { data: userData } = await axios
      .get<GithubUser>(baseUrl + '/user', { headers: { authorization } })
      .catch((err) => {
        console.error(err);
        throw new Error(githubConnectionMessages.failToGetUser);
      });
    const { data: emailData } = await axios
      .get<GithubEmail[]>(baseUrl + '/user/emails', { headers: { authorization } })
      .catch((err) => {
        console.error(err);
        throw new Error(githubConnectionMessages.failToGetEmail);
      });
    const accountEmail = emailData.find(({ primary }) => primary === true)?.email;
    // console.log(userData);
    await fetchConnectSocialAccount(
      {
        accountEmail,
        type: 'oauth',
        provider: 'github',
        providerAccountId: userData.id.toString(),
        accessToken,
        tokenType,
        scope,
        profileJson: userData,
        avatar: userData.avatar_url,
        // accountJson: undefined,
        // expiresAt: '',
        // idToken: '',
        // oauthToken: '',
        // oauthTokenSecret: '',
        // sessionState: '',
        // refreshToken: '',
      },
      { req, res, query: undefined, resolvedUrl: '' }
    ).catch((err) => {
      console.error(err);
      throw new Error(githubConnectionMessages.failToConnect);
    });

    return res.redirect(
      `${urlObject.origin}/profile/member?github=${githubConnectionMessages.connected}`
    );
  } catch (err) {
    console.error(err);
    return res.redirect(`${urlObject.origin}/profile/member?github=${err.message}`);
  }
};

export default withSentry(handler);
