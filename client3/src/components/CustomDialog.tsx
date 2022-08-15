import { Link } from '@/components/Link';
import { CheckBox, Close, Close as CloseIcon } from '@mui/icons-material';
import {
  Alert,
  AlertColor,
  Avatar,
  Box,
  Button,
  Collapse,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, useState } from 'react';

const AvatarSuccess = styled(Avatar)(({ theme, color = 'success' }) => {
  return {
    backgroundColor: theme.colors[color].main,
    color: theme.palette[color].contrastText,
    width: theme.spacing(12),
    height: theme.spacing(12),
    boxShadow: theme.colors.shadows[color],
    top: theme.spacing(-6),
    position: 'absolute',
    left: '50%',
    marginLeft: theme.spacing(-6),
    '& .MuiSvgIcon-root': {
      fontSize: theme.typography.pxToRem(45),
    },
  };
});

const DialogWrapper = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    overflow: 'visible',
  },
}));

export const CustomDialog = memo(
  ({
    open,
    onClose,
    message,
    alertMessage,
    href,
    color,
    buttonText,
  }: {
    open: boolean;
    onClose: () => void;
    message?: string;
    alertMessage?: string;
    buttonText?: string;
    href?: string;
    color?: AlertColor;
  }) => {
    const [openAlert, setOpenAlert] = useState(true);

    return (
      <DialogWrapper
        open={open}
        maxWidth='sm'
        fullWidth
        // TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <Box sx={{ px: 4, pb: 4, pt: 10 }}>
          <AvatarSuccess color={color}>
            {color === 'success' && <CheckBox />}
            {color === 'info' && <CheckBox />}
            {color === 'error' && <Close />}
            {color === 'warning' && <Close />}
          </AvatarSuccess>

          {alertMessage && (
            <Collapse in={openAlert}>
              <Alert
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => setOpenAlert(false)}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
                severity={color}
              >
                {alertMessage}
              </Alert>
            </Collapse>
          )}

          {message && (
            <Typography align='center' sx={{ py: 4, px: 10 }} variant='h3'>
              {message}
            </Typography>
          )}

          {buttonText && (
            <Button fullWidth component={Link} size='large' variant='contained' href={href}>
              {buttonText}
            </Button>
          )}
        </Box>
      </DialogWrapper>
    );
  }
);
