import { Add as AddIcon, Edit as EditIcon, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Fab, FabProps, Zoom } from '@mui/material';
import { green } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import React, { ReactNode, useState } from 'react';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export const FloatingActionButton = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs: (FabProps & { icon: ReactNode })[] = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      // label: 'Add',
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      // label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <KeyboardArrowUp />,
      // label: 'Expand',
    },
  ];

  return (
    <>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </>
  );
};
