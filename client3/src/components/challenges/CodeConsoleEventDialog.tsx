import { useCancelExecution } from '@/apis/works';
import { useEventCodeExecution } from '@/hooks/useEventCodeExecution';
import { CheckCircleRounded, Close, Error } from '@mui/icons-material';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInterval } from 'react-use';
// import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const DialogWrapper = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    overflow: 'visible',
  },
}));

export const useLoadingDots = ({
  delay = 0,
  maxDots = 3,
}: {
  delay?: number;
  maxDots?: number;
}) => {
  const [dots, setDots] = useState('');
  useInterval(() => setDots((prev) => (prev.length === maxDots ? '' : prev + '.')), delay);
  return dots;
};

export const CodeConsoleEventDialog = memo(
  ({
    open,
    onClose: onCloseCallback,
    workId,
  }: {
    open: boolean;
    onClose: (ev: any) => void;
    workId: string;
  }) => {
    const { t } = useTranslation();
    const codeExecution = useEventCodeExecution({ workId });
    const cancelExecution = useCancelExecution();
    const dots = useLoadingDots({ delay: codeExecution.status === 'running' ? 333 : 0 });

    const onClose = (ev: any, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (codeExecution.eventSource) {
        codeExecution.eventSource.close();
      }
      try {
        cancelExecution.mutateAsync({ workId });
      } catch (err) {
        console.error(err);
      }
      onCloseCallback?.(ev);
    };

    const onClickClose: MouseEventHandler<HTMLButtonElement> = (ev) => {
      onClose(ev, 'backdropClick');
    };

    return (
      <DialogWrapper open={open} maxWidth='md' fullWidth keepMounted onClose={onClose}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1,
          }}
        >
          <Typography variant='h5' sx={{ mr: 1 }}>
            {t('테스트 실행 결과')}
            {/* // test only */}
            {/* {` : ${workId} : ${codeExecution.status}`} */}
          </Typography>

          {/* {codeExecution.status} */}

          {codeExecution.error ? (
            <Tooltip title={codeExecution.error.toString()}>
              <>
                <Error color='error' sx={{ mr: 1 }} />
                {t('에러가 발생했습니다')}
              </>
            </Tooltip>
          ) : codeExecution.status === 'running' ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              {t('실행중입니다')}
              {dots}
            </>
          ) : codeExecution.status === 'done' ? (
            <>
              <CheckCircleRounded color='disabled' sx={{ mr: 1 }} />
              {t('실행이 완료되었습니다')}
              {/* <CheckCircleRounded sx={{ mr: 1 }} /> */}
              {/* {t('실행 결과를 확인해주세요')} */}
            </>
          ) : codeExecution.status === 'closed' ? (
            <>
              {/* <CheckCircleRounded color='disabled' sx={{ mr: 1 }} /> */}
              {/* {t('연결이 끊어졌습니다')} */}
            </>
          ) : null}

          <IconButton sx={{ ml: 'auto' }} onClick={onClickClose}>
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ height: '100%', minHeight: '65vh', maxHeight: '65vh', py: 0, px: 0 }}>
          {/* {<pre>{JSON.stringify(codeExecution.data ?? {}, null, 2)}</pre>} */}
          {codeExecution.data && (
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
              {codeExecution.data.join('')}
              {/* <ReactSyntaxHighlighter language={'shell'}>
                {codeExecution.data.join('')}
              </ReactSyntaxHighlighter> */}
            </Typography>
          )}
        </DialogContent>
      </DialogWrapper>
    );
  }
);
