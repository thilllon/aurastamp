import { Box, Modal, Alert, IconButton, Button, Input } from '@mui/material';
import React, { useState, ChangeEventHandler } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type ModalDecoderProps = {
  open?: boolean;
  hiddenMessage?: string;
  hiddenImageUrl?: string;
  handleModalClose?: () => void;
};

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  maxWidth: '380px',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: '0px 0px 21px -5px rgba(0,0,0,0.63)',
  p: 4,
  overflowY: 'auto',
};

export const replaceURL = (inputText: string) => {
  // const exp = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig;
  // const exp =/(?:^|\b)((((https?|ftp|file|):\/\/)|[\w.])+\.[a-z]{2,3}(?:\:[0-9]{1,5})?(?:\/.*)?)([,\s]|$)/ig; /* eslint-disable-line */
  const exp =
    /(?:^|\b)(([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?)([,\s]|$)/gi; /* eslint-disable-line */
  let temp = inputText.replace(exp, '<a href="$1" target="_blank">$1</a>');
  let result = '';

  while (temp.length > 0) {
    const pos = temp.indexOf('href="');
    if (pos == -1) {
      result += temp;
      break;
    }
    result += temp.substring(0, pos + 6);

    temp = temp.substring(pos + 6, temp.length);
    if (temp.indexOf('://') > 8 || temp.indexOf('://') == -1) {
      result += 'http://';
    }
  }
  return result;
};

export const ModalDecoder = ({
  open = false,
  hiddenMessage,
  hiddenImageUrl,
  handleModalClose,
}: ModalDecoderProps) => {
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
          onClick={handleModalClose}
        >
          <CloseRoundedIcon fontSize='large' />
        </IconButton>
        <Box sx={{ mt: 3, fontWeight: '700', fontSize: '20px' }}>{`Let's take a look ... 😶‍🌫️`}</Box>
        {hiddenMessage && (
          <>
            <Box sx={{ mt: 3, fontWeight: '600', fontSize: '16px' }}>✍️ Hidden Message</Box>
            <Alert sx={{ mt: 3 , flexDirection: 'column'}} severity='success'>
              <div dangerouslySetInnerHTML={{ __html: replaceURL(hiddenMessage) }} />
              {/* {hiddenMessage} */}
            </Alert>
          </>
        )}
        {hiddenImageUrl && (
          <>
            <Box sx={{ mt: 3, fontWeight: '600', fontSize: '16px' }}>🎨 Hidden Image</Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <img
                alt='hidden-image'
                style={{ maxHeight: '100vh', maxWidth: '100%' }}
                onClick={() => window.open(hiddenImageUrl)}
                src={hiddenImageUrl}
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
