import { ShortcutKey, ShortcutKeyMap, defaultShortcutKeyMap } from '@/utils/keymap';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

type SettingsShortcutsProps = {};

export const SettingsShortcuts = (props: SettingsShortcutsProps) => {
  const [shortcuts, setShortcuts] = useState<ShortcutKeyMap>(defaultShortcutKeyMap);
  const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (ev) => {
    setShortcuts((shortcuts) => {
      const key = ev.target.name as ShortcutKey;
      const value = ev.target.value;
      return { ...shortcuts, [key]: shortcuts[key].concat(value) };
    });
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
    console.info(ev.key, ev.keyCode, ev.altKey, ev.ctrlKey, ev.metaKey, ev.shiftKey);
  };

  return (
    <Box sx={{ pt: 3 }} component='form' {...props}>
      <Card>
        <CardHeader title='Shortcuts' subheader='Update shortcuts' />
        <Divider />
        <CardContent>
          <FormControl fullWidth margin='normal'>
            <InputLabel htmlFor='my-input' shrink>
              {'Go to previous task'}
            </InputLabel>
            <OutlinedInput
              id='my-input'
              notched
              label={'Go to previous task'}
              fullWidth
              value={shortcuts.MOVE_TO_PREVIOUS}
            />
            {/* <FormHelperText>{''}</FormHelperText> */}
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <InputLabel htmlFor='my-input' shrink>
              {'Go to previous task'}
            </InputLabel>
            <OutlinedInput
              id='my-input'
              notched
              label={'Go to previous task'}
              fullWidth
              value={shortcuts.MOVE_TO_NEXT}
            />
            {/* <FormHelperText>{''}</FormHelperText> */}
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <InputLabel htmlFor='my-input' shrink>
              {'Go to previous task'}
            </InputLabel>
            <OutlinedInput
              id='my-input'
              notched
              label={'Go to previous task'}
              fullWidth
              value={shortcuts.MOVE_TO_PREVIOUS}
            />
            {/* <FormHelperText>{''}</FormHelperText> */}
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <InputLabel htmlFor='my-input' shrink>
              {'Go to previous task'}
            </InputLabel>
            <OutlinedInput
              id='my-input'
              notched
              label={'Go to previous task'}
              fullWidth
              value={shortcuts.MOVE_TO_NEXT}
            />
            {/* <FormHelperText>{''}</FormHelperText> */}
          </FormControl>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color='primary' variant='contained'>
            Save
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
