import { Link } from '@/components/Link';
import { faker } from '@faker-js/faker';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const ImgWrapper = styled(Box)(
  ({ theme }) => `
    position: relative;
    z-index: 5;
    width: 100%;
    overflow: hidden;
    border-radius: ${theme.general.borderRadiusLg};
    box-shadow: 0 0rem 14rem 0 rgb(255 255 255 / 20%), 0 0.8rem 2.3rem rgb(111 130 156 / 3%), 0 0.2rem 0.7rem rgb(17 29 57 / 15%);

    // img {
    //   display: block;
    //   width: 100%;
    // }
  `
);

const BoxAccent = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadiusLg};
    background: ${theme.palette.background.default};
    width: 100%;
    height: 100%;
    position: absolute;
    left: -40px;
    bottom: -40px;
    display: block;
    z-index: 4;
  `
);

const BoxContent = styled(Box)(
  () => `
  width: 150%;
  position: relative;
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const ListItemWrapper = styled(Box)(
  () => `
    display: flex;
    align-items: center;
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[50]
        : theme.colors.alpha.black[10]
    };
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  const { t } = useTranslation();

  return (
    <Container>
      <Grid spacing={{ xs: 6, md: 10 }} justifyContent='center' alignItems='center' container>
        <Grid item md={6} pr={{ xs: 0, md: 3 }}>
          <LabelWrapper color='success'>
            {t('Version ') + process.env.NEXT_PUBLIC_VERSION_STRING}
          </LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant='h1'>
            {t(faker.lorem.sentence())}
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant='h4'
            color='text.secondary'
            fontWeight='normal'
          >
            {t(faker.lorem.sentences(5))}
          </TypographyH2>
          <Button component={Link} href='/dashboards/reports' size='large' variant='contained'>
            {t('Go To Dashboard')}
          </Button>
          <Button sx={{ ml: 2 }} component='a' href='#key-features' size='large' variant='text'>
            {t('Key Features')}
          </Button>
          <ListItemWrapper sx={{ mt: 5, mb: 2 }}>
            <NextJsAvatar>
              <Image src='/static/images/logo/next-js.svg' alt='NextJS' width={100} height={100} />
            </NextJsAvatar>
            <Typography variant='h6'>
              <b>{faker.lorem.words(3)}</b>
              <Typography component='span' variant='subtitle2'>
                {faker.lorem.sentences(2)}
              </Typography>
            </Typography>
          </ListItemWrapper>
          {/* -------------------------------- */}
          <ListItemWrapper sx={{ mb: 2 }}>
            <MuiAvatar>
              <Image
                src='/static/images/logo/material-ui.svg'
                alt='MUI (Material-UI)'
                width={100}
                height={100}
              />
            </MuiAvatar>
            <Typography variant='h6'>
              <b>{faker.lorem.words(3)}</b>
              <Typography component='span' variant='subtitle2'>
                {faker.lorem.sentences(2)}
              </Typography>
            </Typography>
          </ListItemWrapper>
          {/* -------------------------------- */}
          <ListItemWrapper>
            <TsAvatar>
              <Image
                src='/static/images/logo/typescript.svg'
                alt='Typescript'
                width={100}
                height={100}
              />
            </TsAvatar>
            <Typography variant='h6'>
              <b>{faker.lorem.words(3)}</b>
              <Typography component='span' variant='subtitle2'>
                {faker.lorem.sentences(2)}
              </Typography>
            </Typography>
          </ListItemWrapper>
        </Grid>
        <Grid item md={6}>
          <BoxContent>
            <Link href='/dashboards/reports'>
              <ImgWrapper>
                {/* <img alt='Tokyo' src='/static/images/overview/hero-screenshot.png' /> */}
                <Image
                  alt='Tokyo'
                  src='/static/images/firenze/firenze1.png'
                  width='2000'
                  height='3000'
                  objectFit='cover'
                />
              </ImgWrapper>
            </Link>
            <BoxAccent sx={{ display: { xs: 'none', md: 'block' } }} />
          </BoxContent>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
