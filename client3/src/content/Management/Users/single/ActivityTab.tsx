import { Link } from '@/components/Link';
import Text from '@/components/Text';
import {
  CommentTwoTone as CommentTwoToneIcon,
  MoreHorizTwoTone as MoreHorizTwoToneIcon,
  ShareTwoTone as ShareTwoToneIcon,
  ThumbUpAltTwoTone as ThumbUpAltTwoToneIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);

function ActivityTab() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src='/static/images/avatars/5.jpg' />}
        action={
          <IconButton color='primary'>
            <MoreHorizTwoToneIcon />
          </IconButton>
        }
        titleTypographyProps={{ variant: 'h4' }}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
        title='Allison Lipshutz'
        subheader={
          <>
            Managing Partner, <Link href='#'>#software</Link>, <Link href='#'>#managers</Link>,
            Google Inc.
          </>
        }
      />
      <Box px={3} pb={2}>
        <Typography variant='h4' fontWeight='normal'>
          Welcome to organizing your remote office for maximum productivity.
        </Typography>
      </Box>
      <CardMedia
        sx={{ minHeight: 280 }}
        image='/static/images/placeholders/covers/6.jpg'
        title='Card Cover'
      />
      <Box p={3}>
        <Typography variant='h2' sx={{ pb: 1 }}>
          Organizing Your Remote Office for Maximum Productivity
        </Typography>
        <Typography variant='subtitle2'>
          <Link href='#'>example.com</Link> • 4 {t('mins read')}
        </Typography>
      </Box>
      <Divider />
      <CardActionsWrapper
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Button startIcon={<ThumbUpAltTwoToneIcon />} variant='contained'>
            {t('Like')}
          </Button>
          <Button startIcon={<CommentTwoToneIcon />} variant='outlined' sx={{ mx: 2 }}>
            {t('Comment')}
          </Button>
          <Button startIcon={<ShareTwoToneIcon />} variant='outlined'>
            {t('Share')}
          </Button>
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography variant='subtitle2' component='span'>
            <Text color='black'>
              <b>485</b>
            </Text>
            {t('reactions')} •
            <Text color='black'>
              <b>63</b>
            </Text>
            {t('comments')}
          </Typography>
        </Box>
      </CardActionsWrapper>
    </Card>
  );
}

export default ActivityTab;
