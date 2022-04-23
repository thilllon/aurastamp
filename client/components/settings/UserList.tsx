import type {} from '@mui/lab/themeAugmentation';
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

type User = {
  id: string;
  username: string;
};

export type UserListChangeEventHandler = (left: User[], right: User[]) => void;

type UserListProps = {
  left: User[];
  right: User[];
  onChange?: UserListChangeEventHandler;
  label?: {
    left: string;
    right: string;
  };
};

// export function elemOfANotInB<T = number>(a: readonly T[], b: readonly T[]) {
//   return a.filter((value) => b.indexOf(value) === -1);
// }

export const elemOfANotInB = <T,>(key: string, a: readonly any[], b: readonly any[]) => {
  return a.filter((value) => b.findIndex((val) => value[propKey] === val[propKey]) === -1);
};

// export function intersection<T = number>(a: readonly T[] , b: readonly T[] ) {
//   return a.filter((value) => b.indexOf(value) !== -1);
// }

export const intersection = <T,>(propKey: string, a: readonly any[], b: readonly any[]) => {
  return a.filter((value) => {
    return b.findIndex((val) => value[propKey] === val[propKey]) !== -1;
  });
};

// export function union<T = number>(a: readonly T[] , b: readonly T[] ) {
//   return [...a, ...elemOfANotInB(b, a)];
// }

export const union = <T,>(key: string, a: readonly any[], b: readonly any[]) => {
  return [...a, ...elemOfANotInB(key, b, a)];
};

const key = 'id';
const propKey = 'id';

export const UserList = React.memo(
  ({ label, left: leftInit, right: rightInit, onChange }: UserListProps) => {
    const [checked, setChecked] = useState<User[]>([]);
    const [left, setLeft] = useState<User[]>(leftInit);
    const [right, setRight] = useState<User[]>(rightInit);

    const leftChecked = intersection(propKey, checked, left);
    const rightChecked = intersection(propKey, checked, right);

    const handleToggle = (value: User) => () => {
      const currentIndex = checked.findIndex((val) => val[propKey] === value[propKey]);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    const numberOfChecked = (items: User[]) => intersection(propKey, checked, items).length;

    const handleToggleAll = (items: User[]) => () => {
      if (numberOfChecked(items) === items.length) {
        setChecked(elemOfANotInB(propKey, checked, items));
      } else {
        setChecked(union(propKey, checked, items));
      }
    };

    const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(elemOfANotInB(propKey, left, leftChecked));
      setChecked(elemOfANotInB(propKey, checked, leftChecked));
    };

    const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(elemOfANotInB(propKey, right, rightChecked));
      setChecked(elemOfANotInB(propKey, checked, rightChecked));
    };

    useEffect(() => {
      onChange?.(left, right);
    }, [left, onChange, right]);

    const customList = (title: React.ReactNode, items: User[]) => (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={numberOfChecked(items) === items.length && items.length !== 0}
              indeterminate={
                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} 선택됨`}
        />

        <Divider />

        <List
          sx={{
            minWidth: '14rem',
            minHeight: '16rem',
            maxHeight: '16rem',
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense={true}
          component='div'
        >
          {items.map((value: User) => {
            const labelId = `list-${value[propKey]}`;

            return (
              <ListItem
                key={value[propKey]}
                dense
                button
                onClick={handleToggle(value)}
                sx={{ py: 0 }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.findIndex((val) => val[propKey] === value[propKey]) !== -1}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.username} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );

    return (
      <Grid
        maxWidth={'md'}
        container
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'flex-start' }}
      >
        <Grid item xs={12} md={5}>
          {customList(label?.left ?? '', left)}
        </Grid>
        <Grid item xs={2} md={2} sx={{ alignItems: 'center', my: 'auto' }}>
          <Grid container direction='column'>
            <Button
              sx={{ my: 0.5, mx: 'auto' }}
              variant='outlined'
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              size='small'
            >
              {'▶'}
            </Button>
            <Button
              sx={{ my: 0.5, mx: 'auto' }}
              variant='outlined'
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              size='small'
            >
              {'◀'}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          {customList(label?.right ?? '', right)}
        </Grid>
      </Grid>
    );
  }
);
