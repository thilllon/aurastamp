import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// FIXME: 나중에 {label, value} 나눠서 다루도록 수정할 것

type MultipleSelectCheckmarksProps = {
  name: string;
  label?: string;
  onChange?: (values: any) => void;
  choices: string[];
  selectProps?: SelectProps;
} & Partial<UseFormRegisterReturn>;

export const MultipleSelectCheckmarks = forwardRef(
  (
    {
      label,
      onChange,
      choices,
      selectProps = { labelId: 'multiple-select' },
      name,
    }: MultipleSelectCheckmarksProps,
    ref
  ) => {
    const [selectedList, setSelectedList] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selectedList>) => {
      const value = event.target.value;
      // On autofill we get a stringified value.
      const selected = typeof value === 'string' ? value.split(',') : value;
      setSelectedList(selected);
      onChange?.(event);
    };

    return (
      <FormControl fullWidth sx={{ width: '100%' }}>
        <InputLabel id={selectProps.labelId} shrink required>
          {label}
        </InputLabel>
        <Select
          name={name}
          notched
          required
          multiple
          labelId={selectProps.labelId} // FIXME: selectProps 이용할것
          // {...selectProps}
          value={selectedList}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
          renderValue={(elemList) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {elemList.map((name) => (
                <Chip key={name} label={name} />
              ))}
            </Box>
          )}
        >
          {choices.map((choice) => (
            <MenuItem key={choice} value={choice} dense>
              <Checkbox checked={selectedList.indexOf(choice) > -1} />
              <ListItemText primary={choice} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);
