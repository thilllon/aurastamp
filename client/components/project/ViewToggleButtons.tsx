import { SerializedStyles } from '@emotion/react';
import {
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignRight as FormatAlignRightIcon,
} from '@mui/icons-material';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

interface ViewToggleButtonsProps {
  cssProps?: SerializedStyles;
}

export const ViewToggleButtons = ({}: ViewToggleButtonsProps) => {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Stack direction='row' spacing={4}>
      <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} size='small'>
        <ToggleButton value='left'>
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value='center'>
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value='right'>
          <FormatAlignRightIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
