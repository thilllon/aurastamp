import {
  Box,
  BoxProps,
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import React, { useCallback, useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options?: Option[];
  onChange?: (value: string, label?: string) => void;
  initialValue?: string;
  label?: string;
  id?: string;
  selectProps?: SelectProps;
  formControlProps?: FormControlProps;
} & Partial<Omit<BoxProps, 'onChange'>>;

export const CustomSelect = React.memo(
  ({
    options,
    onChange: onChangeCallback,
    initialValue = options?.[0]?.value ?? '',
    label,
    id = 'select',
    formControlProps,
    ...others
  }: CustomSelectProps) => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback<(ev: SelectChangeEvent<unknown>, child: React.ReactNode) => void>(
      (ev: SelectChangeEvent<unknown>) => {
        if (typeof ev.target.value === 'string') {
          setValue(ev.target.value);
          onChangeCallback?.(
            ev.target.value,
            options?.find(({ value }) => value === ev.target.value)?.label
          );
        }
      },
      [onChangeCallback, options]
    );

    return (
      <Box sx={others.sx}>
        <FormControl {...formControlProps}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            labelId={id}
            value={value}
            label={label}
            onChange={onChange}
            // size='small'
            // margin='none'
            {...others.selectProps}
          >
            {options?.map(({ value, label }, idx) => (
              <MenuItem key={idx} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
);
