import { readableFileSize } from '@/utils/common';
import { Card, CardContent, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const GridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingLeft: theme.spacing(4),
  height: '7rem',
  gap: 2,
}));

export const ResultCardSkeleton = ({ index, title }: { index: number; title: string }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>{`${t('문제')} ${index}: ${title}`}</Typography>
      </CardContent>

      <CardContent
        sx={{
          background: '#F6F8FB',
          height: 42,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5'>{t('통계')}</Typography>
      </CardContent>

      <CardContent sx={{ p: '0 !important' }}>
        <Grid container sx={{ p: 0, flexFlow: 'row nowrap' }}>
          <GridItem item xs={12} md={6}>
            <Typography variant='subtitle1'>{t('정확도') + ' %'}</Typography>
            <Skeleton variant='rectangular'>
              <Typography variant='h3'>{'..........'}</Typography>
            </Skeleton>
          </GridItem>

          <Divider orientation='vertical' />

          {/* <GridItem item xs={12} md={4}>
            <Typography variant='subtitle1'>{t('메모리 사용량')}</Typography>
            <Skeleton variant='rectangular'>
              <Typography variant='h3'>{'..........'}</Typography>
            </Skeleton>
          </GridItem> */}

          {/* <Divider orientation='vertical' /> */}

          <GridItem item xs={12} md={6} sx={{ borderRightWidth: 0 }}>
            <Typography variant='subtitle1'>{t('실행시간') + ' (s)'}</Typography>
            <Skeleton variant='rectangular'>
              <Typography variant='h3'>{'..........'}</Typography>
            </Skeleton>
          </GridItem>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const ResultCard = ({
  index,
  title,
  accuracy = 0,
  memoryUsageBytes = 0,
  elapsedTime = 0,
  empty = false,
}: {
  index: number;
  title: string;
  accuracy: number;
  memoryUsageBytes: number;
  elapsedTime: number;
  empty?: boolean;
}) => {
  const { t } = useTranslation();
  const [memory, unit] = readableFileSize(memoryUsageBytes).split(' ');

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>{`${t('문제')} ${index}: ${title}`}</Typography>
      </CardContent>

      <CardContent
        sx={{
          background: '#F6F8FB',
          height: 42,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5'>{t('통계')}</Typography>
      </CardContent>

      <CardContent sx={{ p: '0 !important' }}>
        <Grid container sx={{ p: 0, flexFlow: 'row nowrap' }}>
          {empty && (
            <>
              <GridItem item xs={12}>
                <Typography>{t('제출 기록이 없습니다.')}</Typography>
              </GridItem>
            </>
          )}

          {!empty && (
            <>
              <GridItem item xs={12} md={6}>
                <Typography variant='subtitle1'>{t('정확도') + ' %'}</Typography>
                <Typography variant='h3'>{(accuracy * 100).toFixed(2)}</Typography>
              </GridItem>

              <Divider orientation='vertical' />

              {/* <GridItem item xs={12} md={4}>
                <Typography variant='subtitle1'>{t('메모리 사용량') + ` (${unit})`}</Typography>
                <Typography variant='h3'>{memory}</Typography>
              </GridItem> */}

              {/* <Divider orientation='vertical' /> */}

              <GridItem item xs={12} md={6} sx={{ borderRightWidth: 0 }}>
                <Typography variant='subtitle1'>{t('실행시간') + ' (s)'}</Typography>
                <Typography variant='h3'>{Math.floor(elapsedTime / 1000)}</Typography>
              </GridItem>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
