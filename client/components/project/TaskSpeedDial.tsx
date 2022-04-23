import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Backdrop from '@mui/material/Backdrop';
// import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Box } from '@mui/system';

const actions = [
  { id: 'copy', icon: <FileCopyIcon />, title: '복사' },
  { id: 'save', icon: <SaveIcon />, title: '저장' },
  { id: 'print', icon: <PrintIcon />, title: '인쇄' },
  { id: 'share', icon: <ShareIcon />, title: '공유' },
];

export const TaskSpeedDial = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel='SpeedDial example'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.id}
            icon={action.icon}
            tooltipTitle={action.title}
            onClick={handleClose}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
