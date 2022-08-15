import Text from '@/components/Text';
import {
  ArrowDownwardTwoTone as ArrowDownwardTwoToneIcon,
  ArrowUpwardTwoTone as ArrowUpwardTwoToneIcon,
  ExpandMoreTwoTone as ExpandMoreTwoToneIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AvatarLight = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.black[10]};
      color:  ${theme.colors.alpha.black[100]};
      font-weight: ${theme.typography.fontWeightBold};
      font-size: ${theme.typography.pxToRem(15)};
`
);

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(2)};
    height: ${theme.spacing(2)};
    display: inline-block;
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

function Leaderboard() {
  const { t } = useTranslation();
  const theme = useTheme();

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState<string>('Select team...');

  const periods = [
    {
      value: '1',
      text: t('UX Designers'),
    },
    {
      value: '2',
      text: t('Frontend Developers'),
    },
    {
      value: '3',
      text: t('Team Leaders'),
    },
    {
      value: '4',
      text: t('Project Managers'),
    },
  ];

  return (
    <Card>
      <CardHeader
        action={
          <>
            <Button
              size='small'
              variant='outlined'
              ref={actionRef1}
              onClick={() => setOpenMenuPeriod(true)}
              endIcon={<ExpandMoreTwoToneIcon fontSize='small' />}
            >
              {period}
            </Button>
            <Menu
              disableScrollLock
              anchorEl={actionRef1.current}
              onClose={() => setOpenMenuPeriod(false)}
              open={openPeriod}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {periods.map((_period) => (
                <MenuItem
                  key={_period.value}
                  onClick={() => {
                    setPeriod(_period.text);
                    setOpenMenuPeriod(false);
                  }}
                >
                  {_period.text}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
        title={t('Leaderboard')}
      />
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('Ranking')}</TableCell>
            <TableCell>{t('Member')}</TableCell>
            <TableCell align='right'>{t('Points')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell>
              <Box display='flex' alignItems='center'>
                <AvatarLight sx={{ mr: 1 }}>1</AvatarLight>
                <Text color='success'>
                  <ArrowUpwardTwoToneIcon />
                </Text>
              </Box>
            </TableCell>
            <TableCell>
              <Box display='flex' alignItems='center'>
                <Badge
                  sx={{ mr: 1 }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  overlap='circular'
                  badgeContent={
                    <DotLegend style={{ background: `${theme.colors.success.main}` }} />
                  }
                >
                  <Avatar src='/static/images/avatars/2.jpg' />
                </Badge>
                <Typography variant='h5'>Brandon Jonas</Typography>
              </Box>
            </TableCell>
            <TableCell align='right'>
              <Typography variant='h4'>456</Typography>
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>
              <Box display='flex' alignItems='center'>
                <AvatarLight sx={{ mr: 1 }}>2</AvatarLight>
                <Text color='success'>
                  <ArrowUpwardTwoToneIcon />
                </Text>
              </Box>
            </TableCell>
            <TableCell>
              <Box display='flex' alignItems='center'>
                <Badge
                  sx={{ mr: 1 }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  overlap='circular'
                  badgeContent={
                    <DotLegend style={{ background: `${theme.colors.success.main}` }} />
                  }
                >
                  <Avatar src='/static/images/avatars/4.jpg' />
                </Badge>
                <Typography variant='h5'>Erin Donin</Typography>
              </Box>
            </TableCell>
            <TableCell align='right'>
              <Typography variant='h4'>345</Typography>
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>
              <Box display='flex' alignItems='center'>
                <AvatarLight sx={{ mr: 1 }}>3</AvatarLight>
                <Text color='error'>
                  <ArrowDownwardTwoToneIcon />
                </Text>
              </Box>
            </TableCell>
            <TableCell>
              <Box display='flex' alignItems='center'>
                <Badge
                  sx={{ mr: 1 }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  overlap='circular'
                  badgeContent={
                    <DotLegend style={{ background: `${theme.colors.warning.main}` }} />
                  }
                >
                  <Avatar src='/static/images/avatars/5.jpg' />
                </Badge>
                <Typography variant='h5'>Charlie Rhiel Madsen</Typography>
              </Box>
            </TableCell>
            <TableCell align='right'>
              <Typography variant='h4'>265</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardActions disableSpacing sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Button size='small'>{t('View all rankings')}</Button>
      </CardActions>
    </Card>
  );
}

export default Leaderboard;
