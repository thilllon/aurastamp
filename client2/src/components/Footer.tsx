import Link from '@/components/Link';
import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const OrganizationName = process.env.NEXT_PUBLIC_ORGANIZATION_NAME ?? '';
const OrganizationUrl = process.env.NEXT_PUBLIC_ORGANIZATION_URL ?? '';
const ApplicationName = process.env.NEXT_PUBLIC_APP_TITLE ?? '';

const FooterWrapper = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  marginTop: theme.spacing(4),
}));

const Footer = () => {
  return (
    <FooterWrapper className='footer-wrapper' sx={{ position: 'sticky', top: '100vh' }}>
      <Box
        p={2}
        display={{ xs: 'block', md: 'flex' }}
        alignItems='center'
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent='space-between'
      >
        <Box>
          <Typography variant='subtitle1'>
            {`©${new Date().getUTCFullYear()} ${OrganizationName.toUpperCase()} - ${ApplicationName}`}
          </Typography>
        </Box>

        <Typography sx={{ pt: { xs: 2, md: 0 } }} variant='subtitle1'>
          {`Crafted by `}
          <Link href={OrganizationUrl} target='_blank' rel='noopener noreferrer'>
            {OrganizationName}
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
};

export default Footer;

const info = {
  email: 'hello@proved.work',
  address: '서울시 강남구 테헤란로 503, 1207호',
  registration: '257-81-01787',
  reportNumber: '제 2021-서울강남-03354호',
  emailWithDefaultSubject: `hello@proved.work?Subject=[Proved]`,
};

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.colors.alpha.black[100],
  width: 'fit-content',
}));

const GridItem = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={2.4}
      sx={{
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: {
          xs: 'center',
          md: 'flex-start',
        },
        rowGap: 1,
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      {children}
    </Grid>
  );
};

export const CustomFooter = ({ sx }: { sx?: SxProps }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const borderWidth = 0;

  const makeOnClick = (linkWithAnchor: string) => {
    return () => {
      router.push(linkWithAnchor, undefined, { scroll: true, shallow: true });
    };
  };

  return (
    <Box
      component='footer'
      sx={{
        '& .MuiTypography-root': {
          color: (theme) => theme.colors.alpha.black[100],
        },
        backgroundColor: '#fafafa',
        // backgroundColor: (theme) => theme.colors.alpha.white[5],
        py: 8,
        ...sx,
      }}
    >
      <Container>
        <Grid
          container
          sx={{
            mx: 'auto',
            border: 'solid',
            borderWidth,
            width: {
              xs: 'fit-content',
              lg: 'min-content',
            },
            maxWidth: {
              xs: 'fit-content',
              lg: 'min-content',
            },
          }}
          rowSpacing={4}
        >
          <GridItem>
            <Typography variant='h5'>{'Legal'}</Typography>
            <FooterLink href={'/legal#terms'}>{t('이용약관')}</FooterLink>
            <FooterLink href={'/legal#privacy'}>{t('개인정보 처리방침')}</FooterLink>
          </GridItem>

          <GridItem>
            <Typography variant='h5'>{'Company'}</Typography>
            <FooterLink href={'/aboutus'}>{t('회사소개')}</FooterLink>
            <FooterLink href={'/career'}>{t('채용')}</FooterLink>
          </GridItem>

          <Grid item xs={12} sx={{ border: 'solid', borderWidth }}>
            <Box
              sx={{
                border: 'solid',
                borderWidth,
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              <Typography variant='h5' component={'span'}>
                {t('주식회사 까리용')}
              </Typography>
            </Box>

            <Box
              sx={{
                border: 'solid',
                borderWidth,
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              <Typography variant='subtitle1'>
                {`© ${new Date().getUTCFullYear()} Carillon Inc., All rights reserved.`}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row wrap',
                border: 'solid',
                borderWidth,
                width: {
                  xs: 'fit-content',
                  lg: 'max-content',
                },
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              <Typography variant='subtitle1'>
                {`${t('대표')}: ${t('오경원')} | ${t('이메일')}: `}
                <Typography
                  variant='subtitle1'
                  component={Link}
                  href={`mailto:${info.email}`}
                  target='_blank'
                >
                  {info.email}
                </Typography>
                {` | ${t('주소')}: ${info.address} | ${t('사업자 등록번호')}: ${
                  info.registration
                } | ${t('통신판매업 신고번호')}: ${info.reportNumber}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
