import { SerializedStyles } from '@emotion/react';
import { Search } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CardActionArea,
  Container,
  IconButton,
  OutlinedInput,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';

interface CommandPaletteProps {
  cssProps?: SerializedStyles;
}

// TODO: algolia 연동하기. pure component로 수정하기.
export const CommandPalette = ({}: CommandPaletteProps) => {
  const data = Array(2).fill(null);

  const [open, setOpen] = useState(true);

  const onClickToggle = useCallback(() => {
    setOpen((x) => !x);
  }, []);

  const onKeyDown = (ev: any) => {};
  const onClick = (ev: any) => {};
  const onKeyDownQuery = (ev: any) => {};

  return (
    <>
      <Button onClick={onClickToggle}>drop</Button>
      <Backdrop
        open={open}
        // onClick={onClick}
        sx={{ zIndex: 999, position: 'fixed', top: 0, left: 0 }}
      >
        <Container
          maxWidth='md'
          sx={{
            // border: '2px solid blue',
            p: { xs: 1, sm: 1 },
            m: 0,
          }}
        >
          <OutlinedInput
            placeholder='Search...'
            startAdornment={
              <IconButton sx={{ ml: 0, mr: 0 }}>
                <Search
                  sx={{}}
                  // color='primary'
                />
              </IconButton>
            }
            endAdornment={
              <IconButton sx={{ ml: 0, mr: 0 }}>
                <Search />
              </IconButton>
            }
            onKeyDown={onKeyDownQuery}
            sx={{ background: '#ffffff', width: '100%', borderRadius: '16px 16px 0 0' }}
          />
          <Box
            component='ul'
            sx={{
              maxHeight: '300px',
              width: '100%',
              // overflowY: 'scroll',
              overflowY: 'auto',
              overflowX: 'hidden',
              background: '#ffffff',
              borderRadius: '0 0 16px 16px',
              pt: 2,
            }}
          >
            {data.map((_, idx) => (
              <Box
                tabIndex={-1}
                onKeyDown={onKeyDown}
                onClick={onClick}
                key={idx}
                sx={{
                  listStyle: 'none',
                  // p: 1,
                  py: 0,
                  px: 2,
                  // mb: 1,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  '&:hover': {
                    background: '#0000ff',
                    color: '#ffffff',
                  },
                }}
              >
                <CardActionArea component='li' sx={{ borderRadius: '8px' }}>
                  <Typography sx={{ height: 30 }}>{`dddddddddd ${idx}`}</Typography>
                </CardActionArea>
              </Box>
            ))}
          </Box>
        </Container>
      </Backdrop>
    </>
  );
};
