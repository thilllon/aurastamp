import { Link } from '@/components/shared/Link';
import { css, SerializedStyles } from '@emotion/react';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';

type MenuProps = {
  text: string;
  href?: string;
  id: string;
  onClick: () => void;
  children?: MenuProps[];
};

interface NavigationMenuButtonsProps {
  menuList: MenuProps[];
  cssProps?: SerializedStyles;
}

export const menuButtonStyle = css`
  display: flex;
  margin-right: 0.4rem;
  color: inherit;
  background-color: inherit;
  text-transform: none;
  :hover {
    background-color: inherit;
  }
`;

export const NavigationMenuButtons = React.memo(
  ({ menuList, cssProps }: NavigationMenuButtonsProps) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const makeOnClickMenu = useCallback(
      (itemId: string): MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> => {
        return () => {};
      },
      []
    );

    const makeOnMouseEnter = useCallback(
      (itemId: string): MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> => {
        return () => {
          setOpen(true);
        };
      },
      []
    );

    const makeOnMouseLeave = useCallback(
      (itemId: string): MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> => {
        return () => {
          setOpen(false);
        };
      },
      []
    );

    const onClickAway = useCallback(
      (ev: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(ev.target as HTMLElement)) {
          return;
        }
        setOpen(false);
      },
      [anchorRef]
    );

    const onMouseEnterPopper = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
      setOpen(true);
    }, []);

    const onMouseLeavePopper = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
      setOpen(false);
    }, []);

    return (
      <>
        {menuList.map(({ text, href, id, onClick, children }) => {
          return (
            <Box component='li' key={id}>
              <Button href={href}>
                {children ? (
                  <Button
                    onClick={makeOnClickMenu(id)}
                    onMouseEnter={makeOnMouseEnter(id)}
                    onMouseLeave={makeOnMouseLeave(id)}
                    ref={anchorRef}
                    endIcon={children && <ExpandMoreIcon />}
                  >
                    {text}
                  </Button>
                ) : (
                  <Button onClick={onClick}>{text}</Button>
                )}
              </Button>

              {/* dropdown menu */}
              {children && (
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  onMouseEnter={onMouseEnterPopper}
                  onMouseLeave={onMouseLeavePopper}
                  placement='bottom'
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => {
                    return (
                      <Grow {...TransitionProps} style={{ transformOrigin: 'top' }}>
                        <Paper>
                          <ClickAwayListener onClickAway={onClickAway}>
                            <MenuList autoFocusItem={open}>
                              {children.map(({ text, href, id }, idx) => {
                                return href ? (
                                  <Link href={href} key={idx}>
                                    <MenuItem>{text}</MenuItem>
                                  </Link>
                                ) : (
                                  <MenuItem>{text}</MenuItem>
                                );
                              })}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    );
                  }}
                </Popper>
              )}
            </Box>
          );
        })}
      </>
    );
  }
);
