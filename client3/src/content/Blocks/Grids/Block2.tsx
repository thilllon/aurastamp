import Text from '@/components/Text';
import {
  MonetizationOnTwoTone as MonetizationOnTwoToneIcon,
  PersonTwoTone as PersonTwoToneIcon,
} from '@mui/icons-material';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Block2() {
  const { t } = useTranslation();

  return (
    <Card>
      <Stack
        direction='row'
        justifyContent='space-evenly'
        alignItems='stretch'
        divider={<Divider orientation='vertical' flexItem />}
        spacing={0}
      >
        <Box py={4} px={2} display='flex' alignItems='flex-start'>
          <Text color='primary'>
            <MonetizationOnTwoToneIcon fontSize='large' />
          </Text>
          <Box ml={1}>
            <Typography variant='h3'>$14,264</Typography>
            <Typography noWrap variant='subtitle2'>
              {t('total value')}
            </Typography>
          </Box>
        </Box>
        <Box py={4} px={2} display='flex' alignItems='flex-start'>
          <Text color='error'>
            <PersonTwoToneIcon fontSize='large' />
          </Text>
          <Box ml={1}>
            <Typography variant='h3'>6,598</Typography>
            <Typography noWrap variant='subtitle2'>
              {t('new members')}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}

export default Block2;
