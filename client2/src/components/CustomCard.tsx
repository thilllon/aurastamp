import { MoreVertTwoTone } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
} from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ChallengeCard = ({ sx, src, title }: { sx: SxProps; src?: string; title: string }) => {
  const { t } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <Card sx={sx}>
      <CardHeader
        sx={{ p: 0 }}
        titleTypographyProps={{
          component: 'h5',
          variant: 'h6',
          fontWeight: 'bold',
          sx: { textTransform: 'uppercase', textAlign: 'center' },
        }}
        action={
          <IconButton size='small' color='secondary'>
            <MoreVertTwoTone />
          </IconButton>
        }
        title={title}
      />

      <CardContent sx={{ display: 'flex', flexFlow: 'column', flex: 1 }}></CardContent>

      <Divider sx={{ mt: 'auto' }} />

      <CardActionArea sx={{}}>
        <Button>{'button'}</Button>
      </CardActionArea>
    </Card>
  );
};
