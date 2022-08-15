import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { UserAuthLevelEnum } from '@/types/apiEnums';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { SessionUser, unstable_getServerSession } from 'next-auth';

/**
 * SessionProps를 함께 써야함
 */
export const withAuthGssp = <T>(
  getServerSideProps: GetServerSideProps<Omit<T, 'session'>>,
  redirectTo = '/auth/login'
) => {
  return async (ctx: GetServerSidePropsContext) => {
    // const session = await getSession(ctx);
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

    const destination =
      redirectTo + '?callbackUrl=' + encodeURIComponent(ctx.resolvedUrl.split('?')[0]);

    if (!session) {
      return { redirect: { permanent: false, destination } };
    }

    // Run `getServerSideProps` to get page-specific data
    const gsspData: GetServerSidePropsResult<Omit<T, 'session'>> = await getServerSideProps(ctx);

    // Pass page-specific props along with user data from `withAuth` to component
    const propsWithSession: any = {};

    if ('props' in gsspData) {
      propsWithSession.props = { ...gsspData.props, session };
    }

    if ('redirect' in gsspData) {
      propsWithSession.redirect = gsspData.redirect;
    }

    return propsWithSession;
  };
};

// error handling higher-order-function for getServerSideProps
export const withError = <Props>(
  getServerSideProps: GetServerSideProps<Props>,
  destination = '/error'
): GetServerSideProps<Props> => {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const gsspData: GetServerSidePropsResult<Props> = await getServerSideProps(ctx);
      if ('props' in gsspData) {
        return { props: gsspData.props };
      }
      throw new Error('getServerSideProps must return an object with a `props` key');
    } catch (err) {
      console.error(err);
      return { redirect: { permanent: false, destination } };
    }
  };
};

// error handling higher-order-function for getStaticProps
// getStaticProps does not allow `redirect` and throw error during build time
export const withStaticError = <Props>(
  getStaticProps: GetStaticProps<Props>
): GetStaticProps<Props> => {
  return async (ctx: GetStaticPropsContext) => {
    const gspData: GetStaticPropsResult<Props> = await getStaticProps(ctx);
    if ('props' in gspData) {
      return { props: gspData.props };
    }
    // throw new Error('getStaticProps must return an object with a `props` key');
  };
};

/**
 * SessionProps를 함께 써야함
 */
export const withAdminGssp = <T>(
  getServerSideProps: GetServerSideProps<Omit<T, 'session'>>,
  redirectTo = '/auth/login'
) => {
  return async (ctx: GetServerSidePropsContext) => {
    // const session = await getSession(ctx);
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

    const destination =
      redirectTo + '?callbackUrl=' + encodeURIComponent(ctx.resolvedUrl.split('?')[0]);

    if (session?.user?.authLevel !== UserAuthLevelEnum.ADMIN) {
      return { props: { session: null }, redirect: { permanent: false, destination } };
    }

    // Run `getServerSideProps` to get page-specific data
    const gsspData: GetServerSidePropsResult<Omit<T, 'session'>> = await getServerSideProps(ctx);

    // Pass page-specific props along with user data from `withAuth` to component
    if ('props' in gsspData) {
      return { props: { ...gsspData.props, session } };
    }
    return { props: { session } };
  };
};

// redirect if already signed in
export const withoutAuthGssp = <T>(
  getServerSideProps: GetServerSideProps<T>,
  redirectTo = '/challenges'
) => {
  return async (ctx: GetServerSidePropsContext) => {
    // const session = await getSession(ctx);
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

    const destination =
      redirectTo + '?callbackUrl=' + encodeURIComponent(ctx.resolvedUrl.split('?')[0]);

    if (session) {
      return { props: { session: null }, redirect: { permanent: false, destination } };
    }

    // Run `getServerSideProps` to get page-specific data
    const gsspData: GetServerSidePropsResult<T> = await getServerSideProps(ctx);

    // Pass page-specific props along with user data from `withAuth` to component
    if ('props' in gsspData) {
      return { props: { ...gsspData.props, session } };
    }
    return { props: { session } };
  };
};

export const getAuthorization = async (ctx?: GetServerSidePropsContext) => {
  if (!ctx) {
    return null;
  }
  // const session = await getSession(ctx);
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
  return session?.user?.accessToken ? `Bearer ${session.user.accessToken}` : null;
};

export const defaultSessionUser: SessionUser = {
  name: '',
  email: '',
  image: '',
  id: '',
  jobtitle: '',
  accessToken: '',
  authLevel: UserAuthLevelEnum.USER,
  firstName: '',
  lastName: '',
  type: '',
};
