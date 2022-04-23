import { PivotTableChartSharp as PivotTableChartSharpIcon } from '@mui/icons-material';
import { ToggleButton, Tooltip } from '@mui/material';
import React, { MouseEvent, useCallback, useState } from 'react';

type ViewTypeButtonProps = {
  onChange?: (ev: MouseEvent, value: any) => void;
};

export const ViewTypeButton = ({ onChange: onChangeCallback }: ViewTypeButtonProps) => {
  const [selected, setSelected] = useState(false);

  const onChange = useCallback<(ev: MouseEvent<HTMLElement, any>, value: any) => void>(
    (ev, value) => {
      console.info('value', value);
      setSelected((selected) => !selected);
      onChangeCallback?.(ev, value);
    },
    [onChangeCallback]
  );

  return (
    <Tooltip title={'화면 분할'}>
      <ToggleButton
        size='small'
        sx={{ ml: 'auto' }}
        value='autoSubmit'
        selected={selected}
        onChange={onChange}
        name={'checked'}
      >
        <PivotTableChartSharpIcon />
      </ToggleButton>
    </Tooltip>
  );
};
