import {
  BlockTwoTone as BlockTwoToneIcon,
  CallTwoTone as CallTwoToneIcon,
  CancelTwoTone as CancelTwoToneIcon,
  ColorLensTwoTone as ColorLensTwoToneIcon,
  DescriptionTwoTone as DescriptionTwoToneIcon,
  EmojiEmotionsTwoTone as EmojiEmotionsTwoToneIcon,
  ExpandMore as ExpandMoreIcon,
  InfoTwoTone as InfoTwoToneIcon,
  NotificationsOffTwoTone as NotificationsOffTwoToneIcon,
  SearchTwoTone as SearchTwoToneIcon,
  VideoCameraFrontTwoTone as VideoCameraFrontTwoToneIcon,
  WarningTwoTone as WarningTwoToneIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { formatDistance, subMinutes } from 'date-fns';
import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`
);

const AccordionSummaryWrapper = styled(AccordionSummary)(
  ({ theme }) => `
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${theme.transitions.create(['color'])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${theme.spacing(0.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: ${theme.colors.alpha.black[10]};

            .MuiSvgIcon-root {
              color: ${theme.colors.primary.main};
            }
          }
        }
`
);

function TopBarContent() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expanded, setExpanded] = useState<string | false>('section1');

  const handleChange = (section: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? section : false);
  };

  return (
    <>
      <RootWrapper>
        <Box sx={{ display: { sm: 'flex' } }} alignItems='center'>
          <Avatar
            variant='rounded'
            sx={{ width: 50, height: 50 }}
            alt='Zain Baptista'
            src='/static/images/avatars/1.jpg'
          />
          <Box sx={{ pl: { sm: 1.5 }, pt: { xs: 1.5, sm: 0 } }}>
            <Typography variant='h4' gutterBottom>
              Zain Baptista
            </Typography>
            <Typography variant='subtitle2'>
              {formatDistance(subMinutes(new Date(), 8), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: { xs: 3, md: 0 } }}>
          <Tooltip placement='bottom' title={t('Start a voice call')}>
            <IconButton color='primary'>
              <CallTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement='bottom' title={t('Start a video call')}>
            <IconButton color='primary'>
              <VideoCameraFrontTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement='bottom' title={t('Conversation information')}>
            <IconButton color='primary' onClick={handleDrawerToggle}>
              <InfoTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </RootWrapper>
      <Drawer
        variant='temporary'
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        elevation={9}
      >
        <Box sx={{ minWidth: 360 }} p={2}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                mx: 'auto',
                my: 2,
                width: theme.spacing(12),
                height: theme.spacing(12),
              }}
              variant='rounded'
              alt='Zain Baptista'
              src='/static/images/avatars/1.jpg'
            />
            <Typography variant='h4'>Zain Baptista</Typography>
            <Typography variant='subtitle2'>
              {t('Active')}
              {formatDistance(subMinutes(new Date(), 7), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Box>
          <Divider sx={{ my: 3 }} />

          <Accordion expanded={expanded === 'section1'} onChange={handleChange('section1')}>
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h5'>{t('Customize Chat')}</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails sx={{ p: 0 }}>
              <List component='nav'>
                <ListItem button>
                  <ListItemIconWrapper>
                    <SearchTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('Search in Conversation')}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <ColorLensTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('Change Theme Styling')}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <EmojiEmotionsTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('Choose Default Emoji')}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'section2'} onChange={handleChange('section2')}>
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h5'>{t('Privacy & Support')}</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails sx={{ p: 0 }}>
              <List component='nav'>
                <ListItem button>
                  <ListItemIconWrapper>
                    <NotificationsOffTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('Turn off notifications')}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <CancelTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('Ignore all messages')}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <BlockTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('Block user')}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <WarningTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t("Something's Wrong")}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={t('Report the conversation and provide feedback')}
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'section3'} onChange={handleChange('section3')}>
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h5'>{t('Shared Files')}</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails sx={{ p: 0 }}>
              <List component='nav'>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('HolidayPictures.zip')}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={t('You opened in the past year')}
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('2021Screenshot.jpg')}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={t('You edited this file yesterday')}
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary={t('PresentationDeck.pdf')}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={t('Never opened')}
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  );
}

export default TopBarContent;
