import { useGetExecutionResult } from '@/apis/works';
import { Close } from '@mui/icons-material';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, MouseEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

const DialogWrapper = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    overflow: 'visible',
  },
}));

const defaultRefetchInterval = 300;

// (deprecated) polling method: refetch `getExecutionResult` API every `refetchInterval` ms
// reliable, easy error handling, disconnection tolerant, but too many requests
export const CodeConsolePollingDialog = memo(
  ({
    open,
    onClose: onCloseCallback,
    workId,
  }: {
    open: boolean;
    onClose: (ev: any) => void;
    workId: string;
  }) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const [refetchInterval, setRefetchInterval] = useState<number | false>(false);
    const getExecutionResult = useGetExecutionResult(
      { workId },
      { enabled: !!workId, refetchInterval }
    );

    useEffect(() => {
      setRefetchInterval(open ? defaultRefetchInterval : false);
      return () => {
        queryClient.removeQueries(['GetExecutionResult', { workId }]);
        setRefetchInterval(false);
      };
    }, [open, queryClient, workId]);

    const onClose = (ev: any, reason: 'backdropClick' | 'escapeKeyDown') => {
      onCloseCallback?.(ev);
      setRefetchInterval(false);
    };

    const onClickClose: MouseEventHandler<HTMLButtonElement> = (ev) => {
      onClose(ev, 'backdropClick');
    };

    return (
      <DialogWrapper open={open} maxWidth='md' fullWidth keepMounted onClose={onClose}>
        <DialogTitle
          sx={{
            display: 'flex',
            // justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1,
          }}
        >
          <Typography variant='h5'>{t('테스트 실행 결과')}</Typography>
          {'(Deprecated) use CodeConsoleEventDialog instead'}
          {getExecutionResult.isLoading && <CircularProgress />}
          <IconButton sx={{ ml: 'auto' }} onClick={onClickClose}>
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ height: '100%', minHeight: '65vh', maxHeight: '65vh', py: 0, px: 0 }}>
          {getExecutionResult.data && (
            <Typography
              component='pre'
              align='left'
              variant='subtitle1'
              sx={{
                p: 2,
                lineBreak: 'anywhere',
                wordWrap: 'break-word',
                maxWidth: '100%',
                textOverflow: 'clip',
                whiteSpace: 'pre-wrap',
              }}
            >
              {getExecutionResult.data.stdout}
            </Typography>
          )}
        </DialogContent>
      </DialogWrapper>
    );
  }
);
