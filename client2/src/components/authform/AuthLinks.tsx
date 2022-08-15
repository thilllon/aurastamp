import Link from '@/components/Link';
import { Box, SxProps, Typography } from '@mui/material';
import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const LinkWrapper = memo(
  ({
    children,
    label,
    link,
    href,
  }: {
    label: string;
    link: string;
    href: string;
    children?: ReactNode;
  }) => {
    return (
      <Box sx={{ my: 0.4, gap: 1, display: 'flex', alignItems: 'center' }}>
        <Typography component='span' variant='subtitle1' color='text.primary'>
          <>{label}</>
        </Typography>
        <Link
          sx={{
            color: (theme) => theme.colors.secondary.main,
            textDecoration: 'underline',
          }}
          href={href}
        >
          <b>{link}</b>
        </Link>
      </Box>
    );
  }
);

export const AuthLinks = memo(
  ({
    sx,
    login = true,
    registerMember = true,
    registerBusiness = true,
    resetPassword = true,
    registerRequestMember = false,
  }: {
    sx?: SxProps;
    login?: boolean;
    registerMember?: boolean;
    registerBusiness?: boolean;
    resetPassword?: boolean;
    registerRequestMember?: boolean;
  }) => {
    const { t } = useTranslation();

    return (
      <Box sx={{ mt: 3, ...sx }}>
        {login && (
          <LinkWrapper label={t('이미 회원이신가요?')} link={t('로그인')} href={'/auth/login'} />
        )}
        {registerMember && (
          <LinkWrapper
            label={t('회원이 아니신가요?')}
            link={t('개인회원 가입')}
            href={'/auth/register'}
          />
        )}
        {registerBusiness && (
          <LinkWrapper
            label={t('코딩 테스트를 열고 싶으신가요?')}
            link={t('기업회원 가입')}
            href={'/auth/register/business'}
          />
        )}
        {resetPassword && (
          <LinkWrapper
            label={t('비밀번호를 잊어버리셨나요?')}
            link={t('비밀번호 찾기')}
            href={'/auth/reset-password/request'}
          />
        )}
        {registerRequestMember && (
          <LinkWrapper
            label={t('코딩 테스트에 참가하러 오셨나요?')}
            link={t('개인 회원 가입')}
            href={'/auth/register'}
          />
        )}
      </Box>
    );
  }
);
