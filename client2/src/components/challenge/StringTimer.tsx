import { Typography, TypographyProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTimer } from 'react-timer-hook';

export const StringTimer = ({
  onExpire,
  expiryTimestamp,
  suffix = '',
  ...props
}: { onExpire?: () => void; expiryTimestamp: Date; suffix?: string } & TypographyProps) => {
  const { t } = useTranslation();
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.warn('timer: expired');
      onExpire?.();
    },
  });

  return (
    <Typography {...props}>
      {`${days}${t('일')} ${hours}${t('시')} ${minutes}${t('분')} ${seconds}${t('초') + suffix}`}
    </Typography>
  );
};
