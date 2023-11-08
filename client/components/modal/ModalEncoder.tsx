import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Button, IconButton, Input, Modal, TextField } from '@mui/material';
import React, { ChangeEventHandler, useState } from 'react';

type ModalEncoderProps = {
  open?: boolean;
  handleModalClose?: () => void;
  handleModalWrite?: (hiddenMessage: string, hiddenImage: File | undefined) => void;
};

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: '395px',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: '0px 0px 21px -5px rgba(0,0,0,0.63)',
  p: 4,
  overflowY: 'auto',
};

export const ModalEncoder = ({
  open = false,
  handleModalClose,
  handleModalWrite,
}: ModalEncoderProps) => {
  const maxMessageLength = 255;
  const [hiddenMessage, setHiddenMessage] = useState('');
  const [hiddenImage, setHiddenImage] = useState<File | undefined>();
  const [hiddenImagePreviewUrl, setHiddenImagePreviewUrl] = useState<string>('');

  const resetAllContents = () => {
    setHiddenMessage('');
    setHiddenImage(undefined);
    setHiddenImagePreviewUrl('');
    handleModalClose?.();
  };

  const onChangeMessage: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (ev) => {
    let msg = ev.target.value;
    if (msg.length > maxMessageLength) {
      msg = msg.slice(0, maxMessageLength);
    }
    setHiddenMessage(msg);
  };

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const reader = new FileReader();
      const file = ev.target.files[0];
      reader.onloadend = () => {
        setHiddenImage(file);
        setHiddenImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onClickWriteBtn: React.MouseEventHandler<HTMLAnchorElement> = () => {
    handleModalWrite?.(hiddenMessage, hiddenImage);
    resetAllContents();
  };

  return (
    <Modal open={open}>
      <Box sx={boxStyle}>
        <IconButton
          aria-label='close'
          sx={{
            position: 'absolute',
            right: 7,
            top: 7,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={resetAllContents}
        >
          <CloseRoundedIcon fontSize='large' />
        </IconButton>
        <Box sx={{ mt: 3, fontWeight: '700', fontSize: '20px' }}>What do you want to hide?</Box>
        <Box sx={{ mt: 3, fontWeight: '600', fontSize: '16px' }}>
          ✍️ Message
          <Box
            sx={{ display: 'inline', verticalAlign: 'super', fontSize: '15px', color: '#FF5B00' }}
          >
            *
          </Box>
        </Box>
        <TextField
          sx={{ mt: 1, mb: 3, width: '100%' }}
          value={hiddenMessage}
          onChange={onChangeMessage}
          placeholder={'type message to hide :)'}
          maxRows={4}
          multiline
        />
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            fontWeight: '600',
            fontSize: '16px',
            alignItems: 'baseline',
          }}
        >
          <Box sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            🎨 Image
            <span style={{ paddingLeft: '3px', fontWeight: 'normal', fontSize: '12px' }}>
              (Optional)
            </span>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <label htmlFor='contained-button-file'>
              <Input
                sx={{ display: 'none' }}
                type='file'
                inputProps={{ accept: 'image/*' }} //확인 필요
                id='contained-button-file'
                onChange={onSelectFile}
              />
              <Button
                sx={{ borderRadius: '0', padding: '4px', fontSize: '11px' }}
                variant='outlined'
                component='span'
              >
                Upload
              </Button>
            </label>
          </Box>
        </Box>
        {hiddenImagePreviewUrl && (
          <Box
            sx={{ mt: 2, gap: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          >
            <img
              alt='image'
              style={{ maxHeight: '30vh', maxWidth: '70%' }}
              src={hiddenImagePreviewUrl}
            />
          </Box>
        )}
        <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button variant='outlined' component='span' onClick={resetAllContents}>
            Cancel
          </Button>
          <Button
            disabled={!hiddenMessage}
            variant='contained'
            component='span'
            onClick={onClickWriteBtn}
          >
            Write
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
