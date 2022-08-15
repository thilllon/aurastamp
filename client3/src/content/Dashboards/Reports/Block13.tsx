import { Link } from '@/components/Link';
import Text from '@/components/Text';
import {
  ArrowUpwardTwoTone as ArrowUpwardTwoToneIcon,
  ExpandMoreTwoTone as ExpandMoreTwoToneIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

function Block13() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card variant='outlined'>
      <CardHeader
        sx={{ p: 3 }}
        disableTypography
        title={
          <Typography variant='h4' sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}>
            {t('Users list')}
          </Typography>
        }
        action={
          <Button
            size='small'
            variant='text'
            endIcon={<ExpandMoreTwoToneIcon />}
            color='secondary'
            sx={{
              backgroundColor: `${theme.colors.secondary.lighter}`,
              '&:hover': {
                backgroundColor: `${theme.colors.secondary.main}`,
                color: `${theme.palette.getContrastText(theme.colors.secondary.main)}`,
              },
            }}
          >
            {t('Export')}
          </Button>
        }
      />
      <Divider />
      <List sx={{ py: 0 }}>
        <ListItem sx={{ px: 2, py: 1.95 }}>
          <ListItemAvatar sx={{ mr: 2, minWidth: 0 }}>
            <Avatar src='/static/images/avatars/1.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link href='#' color='text.primary' variant='h5'>
                {t('Isaiah Ruiz')}
              </Link>
            }
            secondary={
              <Typography variant='subtitle2' noWrap>
                Senior Web Developer
              </Typography>
            }
          />
          <Box display='flex' alignItems='center'>
            <Typography sx={{ pr: 1 }} variant='h3'>
              <Text color='error'>29.544</Text>
            </Typography>
            <ArrowUpwardTwoToneIcon
              fontSize='small'
              sx={{ color: `${theme.colors.success.main}` }}
            />
          </Box>
        </ListItem>
        <Divider />
        <ListItem sx={{ px: 2, py: 1.95 }}>
          <ListItemAvatar sx={{ mr: 2, minWidth: 0 }}>
            <Avatar src='/static/images/avatars/2.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant='h5'>{t('Inez Conley')}</Typography>}
            secondary={
              <Typography variant='subtitle2' noWrap>
                {t('Project Manager')}
              </Typography>
            }
          />
          <Box display='flex' alignItems='center'>
            <Typography sx={{ pr: 1 }} variant='h3'>
              <Text color='success'>684</Text>
            </Typography>
            <ArrowUpwardTwoToneIcon
              fontSize='small'
              sx={{ color: `${theme.colors.success.main}` }}
            />
          </Box>
        </ListItem>
      </List>
    </Card>
  );
}

export default Block13;
