import type { View } from '@/models/calendar';
import {
  ArrowBackTwoTone as ArrowBackTwoToneIcon,
  ArrowForwardTwoTone as ArrowForwardTwoToneIcon,
  CalendarViewMonthTwoTone as CalendarViewMonthTwoToneIcon,
  TodayTwoTone as TodayTwoToneIcon,
  ViewAgendaTwoTone as ViewAgendaTwoToneIcon,
  ViewDayTwoTone as ViewDayTwoToneIcon,
  ViewWeekTwoTone as ViewWeekTwoToneIcon,
} from '@mui/icons-material';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { format } from 'date-fns';
import type { ElementType, FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  children?: ReactNode;
  className?: string;
  date: Date;
  onNext?: () => void;
  onPrevious?: () => void;
  onToday?: () => void;
  handleCreateEvent?: () => void;
  changeView?: (view: View) => void;
  view: View;
}

interface ViewOption {
  label: string;
  value: View;
  icon: ElementType;
}

const viewOptions: ViewOption[] = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: CalendarViewMonthTwoToneIcon,
  },
  { label: 'Week', value: 'timeGridWeek', icon: ViewWeekTwoToneIcon },
  { label: 'Day', value: 'timeGridDay', icon: ViewDayTwoToneIcon },
  { label: 'Agenda', value: 'listWeek', icon: ViewAgendaTwoToneIcon },
];

const Actions: FC<ActionsProps> = ({
  date,
  onNext = () => {},
  onPrevious = () => {},
  onToday = () => {},
  handleCreateEvent = () => {},
  changeView = () => {},
  view,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3} alignItems='center' justifyContent='space-between'>
      <Grid item>
        <Tooltip arrow placement='top' title={t('Previous Day')}>
          <IconButton color='primary' onClick={onPrevious}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement='top' title={t('Today')}>
          <IconButton color='primary' sx={{ mx: 1 }} onClick={onToday}>
            <TodayTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement='top' title={t('Next Day')}>
          <IconButton color='primary' onClick={onNext}>
            <ArrowForwardTwoToneIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
        <Typography variant='h3' color='text.primary'>
          {format(date, 'MMMM yyyy')}
        </Typography>
      </Grid>
      <Grid item sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
        {viewOptions.map((viewOption) => {
          const Icon = viewOption.icon;

          return (
            <Tooltip key={viewOption.value} arrow placement='top' title={t(viewOption.label)}>
              <IconButton
                color={viewOption.value === view ? 'primary' : 'secondary'}
                onClick={() => changeView(viewOption.value)}
              >
                <Icon />
              </IconButton>
            </Tooltip>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Actions;
