import Text from '@/components/Text';
import {
  AddBusinessTwoTone as AddBusinessTwoToneIcon,
  AddCircleTwoTone as AddCircleTwoToneIcon,
  AddLocationTwoTone as AddLocationTwoToneIcon,
  MonetizationOnTwoTone as MonetizationOnTwoToneIcon,
  MoneyTwoTone as MoneyTwoToneIcon,
  PersonTwoTone as PersonTwoToneIcon,
  SubscriptionsTwoTone as SubscriptionsTwoToneIcon,
} from '@mui/icons-material';
import { Box, Card, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    padding: ${theme.spacing(2)};
    color: ${theme.palette.primary.contrastText};
    transform: translateY(0px);
    transition: ${theme.transitions.create(['color', 'transform', 'background'])};
    
    .MuiSvgIcon-root {
        transform: scale(1);
        transition: ${theme.transitions.create(['transform'])};
    }

    &:hover {
        background: initial;
        transform: translateY(-2px);

        .MuiSvgIcon-root {
            transform: scale(1.2);
        }
    }
  `
);

function Block4() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='center'
        alignItems='stretch'
        divider={<Divider orientation='vertical' flexItem />}
        spacing={0}
      >
        <Box display='flex' flex={1} justifyContent='space-evenly' alignItems='stretch'>
          <Box p={3} sx={{ textAlign: 'center' }}>
            <Text color='warning'>
              <MonetizationOnTwoToneIcon />
            </Text>
            <Typography variant='h3'>$9,658</Typography>
            <Typography variant='subtitle2'>{t('revenue')}</Typography>
          </Box>
          <Box p={3} sx={{ textAlign: 'center' }}>
            <Text color='success'>
              <PersonTwoToneIcon />
            </Text>
            <Typography variant='h3'>23,594</Typography>
            <Typography variant='subtitle2'>{t('users')}</Typography>
          </Box>
        </Box>
        <Box display='flex' flex={1} justifyContent='space-evenly' alignItems='stretch'>
          <Box p={3} sx={{ textAlign: 'center' }}>
            <Text color='black'>
              <SubscriptionsTwoToneIcon />
            </Text>
            <Typography variant='h3'>1,064</Typography>
            <Typography variant='subtitle2'>{t('orders')}</Typography>
          </Box>
          <Box p={3} sx={{ textAlign: 'center' }}>
            <Text color='error'>
              <MoneyTwoToneIcon />
            </Text>
            <Typography sx={{ minWidth: 100 }} variant='h3'>
              <CountUp
                start={0}
                end={9.678}
                duration={4}
                separator=''
                delay={1}
                decimals={3}
                decimal=','
                prefix=''
                suffix='M'
              />
            </Typography>
            <Typography variant='subtitle2'>{t('orders')}</Typography>
          </Box>
        </Box>
      </Stack>
      <Divider />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='center'
        alignItems='stretch'
        divider={<Divider orientation='vertical' flexItem />}
        spacing={0}
      >
        <Box display='flex' flex={1} justifyContent='space-evenly' alignItems='stretch'>
          <Box p={3} sx={{ textAlign: 'center' }}>
            <Tooltip arrow title={t('Tooltip for this icon button')}>
              <IconButtonWrapper
                sx={{
                  background: `${theme.colors.primary.main}`,
                  '&:hover': { background: `${theme.colors.primary.light}` },
                }}
              >
                <AddCircleTwoToneIcon />
              </IconButtonWrapper>
            </Tooltip>
            <Tooltip arrow title={t('Tooltip for this icon button')}>
              <IconButtonWrapper
                sx={{
                  mx: 2,
                  background: `${theme.colors.success.main}`,
                  '&:hover': { background: `${theme.colors.success.light}` },
                }}
              >
                <AddLocationTwoToneIcon />
              </IconButtonWrapper>
            </Tooltip>
            <Tooltip arrow title={t('Tooltip for this icon button')}>
              <IconButtonWrapper
                sx={{
                  background: `${theme.colors.warning.main}`,
                  '&:hover': { background: `${theme.colors.warning.light}` },
                }}
              >
                <AddBusinessTwoToneIcon />
              </IconButtonWrapper>
            </Tooltip>
          </Box>
        </Box>
        <Box display='flex' flex={1} justifyContent='space-evenly' alignItems='stretch'>
          <Box p={3} sx={{ textAlign: 'center' }}>
            <Tooltip arrow title={t('Tooltip for this icon button')}>
              <IconButtonWrapper
                sx={{
                  background: `${theme.colors.gradients.blue1}`,
                  '&:hover': { background: `${theme.colors.gradients.blue1}` },
                }}
              >
                <AddCircleTwoToneIcon />
              </IconButtonWrapper>
            </Tooltip>
            <Tooltip arrow title={t('Tooltip for this icon button')}>
              <IconButtonWrapper
                sx={{
                  mx: 2,
                  background: `${theme.colors.gradients.purple3}`,
                  '&:hover': { background: `${theme.colors.gradients.purple3}` },
                }}
              >
                <AddLocationTwoToneIcon />
              </IconButtonWrapper>
            </Tooltip>
            <Tooltip arrow title={t('Tooltip for this icon button')}>
              <IconButtonWrapper
                sx={{
                  background: `${theme.colors.gradients.orange2}`,
                  '&:hover': { background: `${theme.colors.gradients.orange2}` },
                }}
              >
                <AddBusinessTwoToneIcon />
              </IconButtonWrapper>
            </Tooltip>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}

export default Block4;
