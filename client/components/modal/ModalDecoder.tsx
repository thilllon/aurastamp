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
    overflowY: 'auto'
}

export const ModalDecoder = ({
    open = false,
    hiddenMessage,
    hiddenImageUrl,
    handleModalClose
}: ModalDecoderProps) => {
    return (
    <Modal
        open={open}
    >
        <Box sx={boxStyle}>
            <IconButton
                aria-label="close"
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
            <Box sx={{ mt: 3, fontWeight: '700', fontSize: '20px' }}>
                Let's take a look ... 😶‍🌫️
            </Box>
            {hiddenMessage && (
            <>
            <Box sx={{ mt: 3, fontWeight: '600', fontSize: '16px' }}>
                ✍️ Hidden Message
            </Box>
            <Alert sx={{ mt: 3 }} severity='success'>
                {hiddenMessage}
            </Alert>
            </>
            )}
            {hiddenImageUrl && (
            <>
            <Box sx={{ mt: 3, fontWeight: '600', fontSize: '16px' }}>
                🎨 Hidden Image
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <img style={{ maxHeight: '40vh', maxWidth: '90%' }} src={hiddenImageUrl} />
            </Box>
            </>
            )}
        </Box>
    </Modal>
  );
};
