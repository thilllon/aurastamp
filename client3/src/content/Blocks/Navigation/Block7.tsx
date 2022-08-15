import Text from '@/components/Text';
import {
  ContactSupportTwoTone as ContactSupportTwoToneIcon,
  DashboardCustomizeTwoTone as DashboardCustomizeTwoToneIcon,
  EmailTwoTone as EmailTwoToneIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(13)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.general.borderRadiusSm};
    padding: ${theme.spacing(1.2, 2.5, 1)};
    line-height: 1;
  `
);

const CardActionAreaWrapper = styled(CardActionArea)(
  ({ theme }) => `
        .MuiTouchRipple-root {
          opacity: .2;
        }
  
        .MuiCardActionArea-focusHighlight {
          background: ${theme.colors.primary.main};
        }
  
        &:hover {
          .MuiCardActionArea-focusHighlight {
            opacity: .05;
          }
        }
  `
);

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    top: ${theme.spacing(2)};
    z-index: 7;
  `
);

const CardWrapper = styled(Box)(
  ({ theme }) => `
      background: ${alpha(theme.colors.alpha.black[10], 0.03)};
  `
);

function Block7() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card sx={{ position: 'relative', textAlign: 'center' }}>
      <CardActions>
        <Tooltip arrow placement='top' title={t('Get in touch via email')}>
          <IconButton
            color='primary'
            sx={{
              alignSelf: 'center',
              backgroundColor: `${theme.colors.primary.lighter}`,
              '&:hover': {
                backgroundColor: `${theme.colors.primary.main}`,
                color: `${theme.palette.getContrastText(theme.colors.primary.main)}`,
              },
            }}
          >
            <EmailTwoToneIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Box pt={6} pb={5} px={6}>
        <Avatar
          sx={{ mx: 'auto', mb: 1.5, width: 94, height: 94 }}
          src='/static/images/avatars/2.jpg'
        />
        <LabelWrapper
          sx={{
            display: 'inline-flex',
            background: `${theme.colors.success.lighter}`,
            color: `${theme.colors.success.main}`,
          }}
        >
          {t('Online')}
        </LabelWrapper>
        <Typography gutterBottom sx={{ pt: 2 }} variant='h2'>
          Lacie-Mae Mckay
        </Typography>
        <Typography variant='subtitle2'>
          Senior Frontend Developer at <b>Google Inc.</b>
        </Typography>
        <Box mt={1.5} sx={{ textAlign: 'center' }}>
          <Tooltip arrow placement='top' title='Facebook'>
            <IconButton color='primary' size='large'>
              <FacebookIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement='top' title='Twitter'>
            <IconButton color='primary' size='large'>
              <TwitterIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement='top' title='Instagram'>
            <IconButton color='primary' size='large'>
              <InstagramIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <CardWrapper p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card variant='outlined'>
              <CardActionAreaWrapper sx={{ p: 2 }}>
                <Text color='success'>
                  <ContactSupportTwoToneIcon sx={{ mb: 1 }} />
                </Text>
                <Typography gutterBottom variant='h4'>
                  {t('Helpdesk')}
                </Typography>
                <Typography variant='subtitle2' noWrap>
                  {t('Tickets overview')}
                </Typography>
              </CardActionAreaWrapper>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant='outlined'>
              <CardActionAreaWrapper sx={{ p: 2 }}>
                <Text color='primary'>
                  <DashboardCustomizeTwoToneIcon sx={{ mb: 1 }} />
                </Text>
                <Typography gutterBottom variant='h4'>
                  {t('Dashboard')}
                </Typography>
                <Typography variant='subtitle2' noWrap>
                  {t('Daily operations')}
                </Typography>
              </CardActionAreaWrapper>
            </Card>
          </Grid>
        </Grid>
      </CardWrapper>
    </Card>
  );
}

export default Block7;
