import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type ExtendedButtonProps = { text: string } & ButtonProps;

type ShortcutDialogProps = {
  contentText?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  buttons?: ExtendedButtonProps[];
  onClose?: () => void;
};

export const ShortcutDialog = React.memo(
  ({
    open = true,
    setOpen,
    contentText,
    buttons,
    onClose: onCloseCallback,
  }: ShortcutDialogProps) => {
    const data = [
      { id: 'choose1', label: '1번 보기 선택', shortcut: '1' },
      { id: 'choose2', label: '2번 보기 선택', shortcut: '2' },
      { id: 'choose3', label: '3번 보기 선택', shortcut: '3' },
      { id: 'choose4', label: '4번 보기 선택', shortcut: '4' },
      { id: 'choose5', label: '5번 보기 선택', shortcut: '5' },
      { id: 'choose6', label: '6번 보기 선택', shortcut: '6' },
      { id: 'openShortcutDialog', label: '단축키 열기', shortcut: 'shift+/' },
      { id: 'moveToNext', label: '다음 작업으로 이동', shortcut: 'e' },
      { id: 'moveToPrevious', label: '이전 작업으로 이동', shortcut: 'q' },
      { id: 'toggleAutoSubmit', label: '자동으로 라벨링 제출 켜기/끄기', shortcut: '0' },
    ];

    const title = '단축키';

    const onClose = () => {
      onCloseCallback?.();
      setOpen?.(false);
    };

    return (
      <Dialog
        open={open}
        onBackdropClick={() => setOpen(false)}
        // scroll='paper'
        onClose={onClose}
        maxWidth='md'
        draggable
        // fullScreen
        // fullWidth
        keepMounted
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <Grid container spacing={2}>
            {data.map(({ id, label, shortcut }) => (
              <Grid item key={id} xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography>{`${label}:`}</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>{shortcut}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          {buttons?.map((button, idx) => (
            <Button key={idx} onClick={button.onClick} {...button}>
              {button.text}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    );
  }
);
