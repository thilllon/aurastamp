import { Close as CloseIcon } from '@mui/icons-material';
import { Alert, AlertTitle, Button, IconButton, Snackbar } from '@mui/material';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';

interface SnackbarMessage {
  title: string;
  subtitle?: string;
  key: number;
}

interface ConsecutiveSnackbarsProps {
  children?: React.ReactNode;
  closeWhenClickaway?: boolean; // NOTE: clickaway 시 닫도록 할지 설정 가능
}

// https://mui.com/material-ui/react-snackbar/#consecutive-snackbars

// TODO: 순수컴포넌트로 변경할것
export const ConsecutiveSnackbars = ({ closeWhenClickaway }: ConsecutiveSnackbarsProps) => {
  const [open, setOpen] = useState(false);
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage>();

  // console.info('snackPack', snackPack);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleOpen = (title: string, subtitle?: string) => () => {
    setSnackPack((prev) => [...prev, { title, subtitle, key: Date.now() }]);
  };

  const handleClose = (ev: SyntheticEvent | Event, reason?: string) => {
    // if (closeWhenClickaway && reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  };

  const handleExited = useCallback(() => {
    // 중요! "open" state로 close 상태를 체크해서 메세지를 없애면 아직 스낵바가 사라지기 전에 메세지가 바뀌어 버림. 즉 사용자는 메세지가 먼저 사라지고 스낵바가 사라지는 것을 보게됨. onExited는 스낵바가 사라진 뒤에 트리거되므로 스낵바가 사라질때까지 메세지가 바뀌는 현상이 발생하지 않음.
    setMessageInfo(undefined);
    console.info('open', open);
  }, [open]);

  console.info('render', open);

  return (
    <>
      <Button onClick={handleOpen('AA')}>Show message A</Button>
      <Button onClick={handleOpen('BB')}>Show message B</Button>
      <Button onClick={handleOpen('CC')}>Show message C</Button>

      <Snackbar
        key={messageInfo?.key ?? undefined}
        // message={messageInfo?.title ?? undefined}
        open={open}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        action={
          // NOTE: children <Alert>대신 action prop 이용하는 것도 가능함
          <IconButton color='inherit' sx={{ p: 0.5 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          // severity='success'
          elevation={6}
          action={
            <IconButton size='large' color='inherit' sx={{ p: 0.5 }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        >
          <AlertTitle>{messageInfo?.title}</AlertTitle>
          {messageInfo?.subtitle}
        </Alert>
      </Snackbar>
    </>
  );
};
