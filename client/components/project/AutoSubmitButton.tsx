import { Bolt as BoltIcon, Check as CheckIcon } from '@mui/icons-material';
import { ToggleButton, Tooltip } from '@mui/material';
import React, { MouseEvent, useCallback, useState } from 'react';

type AutoSubmitButtonProps = {
  // onChange?: ChangeEventHandler<HTMLButtonElement>;
  onChange?: (ev: MouseEvent, value: any) => void;
};

export const AutoSubmitButton = ({ onChange: onChangeCallback }: AutoSubmitButtonProps) => {
  const [selected, setSelected] = useState(false);

  const onChange = useCallback<(ev: MouseEvent<HTMLElement, any>, value: any) => void>(
    (ev, value) => {
      console.info('value', value);
      // console.info(ev.currentTarget.value);
      setSelected((selected) => !selected);
      onChangeCallback?.(ev, value);
    },
    [onChangeCallback]
  );

  return (
    <Tooltip title={'라벨링 자동 제출'}>
      <ToggleButton
        size='small'
        sx={{ ml: 'auto' }}
        value='autoSubmit'
        selected={selected}
        onChange={onChange}
        name={'checked'}
      >
        {/* <CheckIcon /> */}
        <BoltIcon />
      </ToggleButton>
    </Tooltip>
  );
};
