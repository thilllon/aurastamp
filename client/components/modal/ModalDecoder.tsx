import axios from 'axios';

import { Box, Modal, Alert, IconButton, Button, Input } from '@mui/material';
import React, { useState, ChangeEventHandler } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

type ModalDecoderProps = {
  open?: boolean;
  modelName: string;
  hashString: string;
  hiddenMessage?: string;
  hiddenImageUrl?: string;
  viewCnt: number;
  likeCnt: number;
  dislikeCnt: number;
  handleModalClose: () => void;
};

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: '395px',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: '0px 0px 21px -5px rgba(0,0,0,0.63)',
  p: 4,
};

const topBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const contentsBoxStyle = {
  overflowY: 'auto',
  maxHeight: '62vh',
};

const bottomBoxStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: '29px',
  alignItems: 'center',
};

const viewBoxStyle = {
  color: 'white',
  fontSize: '14px',
  background: '#000000',
  padding: '2px 11px',
  borderRadius: '15px',
  fontWeight: 'bold',
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
  modelName,
  hashString,
  hiddenMessage,
  hiddenImageUrl,
  viewCnt,
  likeCnt,
  dislikeCnt,
  handleModalClose,
}: ModalDecoderProps) => {
  const [likeBtnClicked, setLikeBtnClicked] = useState(false);
  const [dislikeBtnClicked, setDislikeBtnClicked] = useState(false);

  const initializeState = () => {
    setLikeBtnClicked(false);
    setDislikeBtnClicked(false);
  };

  const onClickLikeBtn = async () => {
    if (dislikeBtnClicked) {
      onClickDislikeBtn();
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URI;
    let url = baseUrl + '/update_like_cnt';
    // 버튼 클릭, 클릭 취소
    url += !likeBtnClicked ? '/True' : '/False';
    setLikeBtnClicked((likeBtnClicked) => !likeBtnClicked);

    try {
      const formData = new FormData();
      formData.append('model_name', modelName);
      formData.append('hash_string', hashString);

      const res = await axios.post(url, formData);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickDislikeBtn = async () => {
    if (likeBtnClicked) {
      onClickLikeBtn();
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URI;
    let url = baseUrl + '/update_dislike_cnt';
    // 버튼 클릭, 클릭 취소
    url += !dislikeBtnClicked ? '/True' : '/False';
    setDislikeBtnClicked((dislikeBtnClicked) => !dislikeBtnClicked);

    try {
      const formData = new FormData();
      formData.append('model_name', modelName);
      formData.append('hash_string', hashString);

      const res = await axios.post(url, formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={open}>
      <Box sx={boxStyle}>
        <Box sx={topBoxStyle}>
          <Box sx={{ fontWeight: '700', fontSize: '20px' }}>{`Let's take a look ... 😶‍🌫️`}</Box>
          <IconButton
            aria-label='close'
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={() => {
              handleModalClose();
              initializeState();
            }}
          >
            <CloseRoundedIcon fontSize='large' />
          </IconButton>
        </Box>
        <Box sx={contentsBoxStyle}>
          {hiddenMessage && (
            <>
              <Box sx={{ mt: 3, fontWeight: '600', fontSize: '16px' }}>✍️ Hidden Message</Box>
              <Alert sx={{ mt: 3, flexDirection: 'column' }} severity='success'>
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
        <Box sx={bottomBoxStyle}>
          <Box sx={viewBoxStyle}>{viewCnt} Views 😎</Box>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{ cursor: 'pointer', marginRight: '10px', fontWeight: 'bold' }}
              onClick={onClickLikeBtn}
            >
              <IconButton>{likeBtnClicked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}</IconButton>
              {likeBtnClicked ? likeCnt + 1 : likeCnt}
            </Box>
            <Box sx={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={onClickDislikeBtn}>
              <IconButton>
                {dislikeBtnClicked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
              </IconButton>
              {dislikeBtnClicked ? dislikeCnt + 1 : dislikeCnt}
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
