import Link from '@/components/Link';
import { ProblemTagMap } from '@/types/mappedObject';
import { MoreVertTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { format } from 'date-fns';
import Image from 'next/image';
import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChallengeCardWrapper = styled(Card)(({ theme }) => ({
  width: 350,
  display: 'flex',
  flexFlow: 'column',
}));

export const ChallengeCardSkeleton = ({ anonymous = true }: { anonymous?: boolean }) => {
  return (
    <ChallengeCardWrapper sx={{ height: anonymous ? 380 : 430 }}>
      <CardContent sx={{ flex: 1 }}>
        <Skeleton variant='rectangular' width={100} height={100} sx={{ mb: 2 }} />
        <Skeleton height={48} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={36} />
        {!anonymous && (
          <>
            <Skeleton width={120} />
            <Skeleton width={120} />
            <Skeleton width={120} />
          </>
        )}
      </CardContent>

      <Divider />

      <CardContent sx={{ p: 1.6, flexBasis: 0 }}>
        <Skeleton variant='rectangular' height={40} />
      </CardContent>
    </ChallengeCardWrapper>
  );
};

export const ChallengeCard = ({
  sx,
  src,
  title,
  description,
  dateFrom,
  dateTo,
  tags,
  onClick,
  onMouseOver,
  disabled,
  href,
  options,
  buttonLabel,
  takeCount,
  takeLimit,
  takedAt,
  registeredAt,
  anonymous = true,
}: {
  sx: SxProps;
  src?: string;
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  tags: string[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: MouseEventHandler<HTMLDivElement>;
  disabled: boolean;
  href?: string;
  options?: any; // 추가 메뉴
  buttonLabel?: string;
  takeCount?: number;
  takeLimit?: number;
  takedAt?: Date | string;
  registeredAt?: Date | string;
  anonymous?: boolean;
}) => {
  const { t } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const onClickMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const identified = Number.isInteger(takeCount);

  return (
    <ChallengeCardWrapper sx={{ height: anonymous ? 380 : 430 }} onMouseOver={onMouseOver}>
      <CardContent sx={{ mb: 'auto', display: 'flex', flexFlow: 'column', flex: 1, p: 1.5, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {src && <Image src={src} alt={title} width={100} height={100} />}

          {options && (
            <>
              <IconButton
                ref={anchorRef}
                sx={{ ml: 'auto', background: (theme) => theme.colors.primary.lighter }}
                size='small'
                color='primary'
                onClick={onClickMenu}
              >
                <MoreVertTwoTone />
              </IconButton>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-start'
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom-start' ? 'right bottom' : 'right top',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          sx={{ p: 0.4 }}
                          autoFocusItem={open}
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>
                            <>{t('상세보기')}</>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </Box>

        <Typography sx={{ mt: 3 }} variant='h4'>
          {title}
        </Typography>

        <Typography
          variant='subtitle1'
          sx={{ mt: 1, textOverflow: 'ellipsis', overflow: 'hidden' }}
        >
          {description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.4 }}>
          <Typography variant='subtitle1' fontWeight='bold'>
            {t('응시 기간')}
          </Typography>
          <Typography variant='subtitle1' fontWeight='bold'>
            {format(dateFrom, 'yyyy/MM/dd')}
          </Typography>
          <Typography variant='subtitle1' fontWeight='bold'>
            {'-'}
          </Typography>
          <Typography variant='subtitle1' fontWeight='bold'>
            {format(dateTo, 'yyyy/MM/dd')}
          </Typography>
        </Box>

        <Stack
          sx={{
            mt: identified ? 1 : 'auto',
            // mb: identified ? 'auto' : 1,
            mb: 1,
            display: 'flex',
            flexFlow: 'row nowrap',
            gap: 0.8,
            overflowY: 'hidden',
            // '&::-webkit-scrollbar': { display: 'none' }, // Chrome
            '&::WebkitScrollbar': { display: 'none' }, // Chrome
            msOverflowStyle: 'none', // IE and Edge
            scrollbarWidth: 'none', // Firefox
          }}
        >
          {tags.map((tag, idx) => (
            <Chip key={tag} label={ProblemTagMap[tag]} size={'small'} />
          ))}
        </Stack>

        {identified && (
          <>
            <Box sx={{ display: 'flex', gap: 0.4 }}>
              <Typography variant='subtitle1' fontWeight='bold'>
                {t('등록일')}
              </Typography>
              <Typography variant='subtitle1' fontWeight='bold'>
                {registeredAt ? format(new Date(registeredAt), 'yyyy/MM/dd') : '-'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.4 }}>
              <Typography variant='subtitle1' fontWeight='bold'>
                {t('최종 응시일')}
              </Typography>
              <Typography variant='subtitle1' fontWeight='bold'>
                {takedAt ? format(new Date(takedAt), 'yyyy/MM/dd') : '-'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.4 }}>
              <Typography variant='subtitle1' fontWeight='bold'>
                {t('도전 횟수')}
              </Typography>
              <Typography variant='subtitle1' fontWeight='bold'>
                {`${takeCount}/${takeLimit === Infinity ? '∞' : takeLimit}`}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>

      <Divider />

      <CardContent sx={{ p: 1.5, flexBasis: 0 }}>
        <Button
          LinkComponent={Link}
          href={href}
          fullWidth
          onClick={onClick}
          disabled={disabled}
          variant={disabled ? 'outlined' : 'contained'}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </ChallengeCardWrapper>
  );
};
