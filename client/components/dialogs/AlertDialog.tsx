import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

type ExtendedButtonProps = { text: string } & ButtonProps;

type AlertDialogProps = {
  title?: string;
  contentText?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  buttons?: ExtendedButtonProps[];
  onClose?: () => void;
};

export const AlertDialog = React.memo(
  ({
    title,
    open = true,
    setOpen,
    contentText,
    buttons,
    onClose: onCloseCallback,
  }: AlertDialogProps) => {
    const onClose = () => {
      onCloseCallback?.();
      setOpen?.(false);
    };

    return (
      <Dialog open={open} onClose={onClose}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {contentText && (
          <DialogContent>
            <DialogContentText>{contentText}</DialogContentText>
          </DialogContent>
        )}
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
