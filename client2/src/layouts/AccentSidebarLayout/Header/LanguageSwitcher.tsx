import Text from '@/components/Text';
import internationalization from '@/i18n/i18n';
import { WarningTwoTone as WarningTwoToneIcon } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image, { ImageProps } from 'next/image';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CN = (props: Partial<ImageProps>) => (
  <Image alt='CN' src='/static/images/flags/cn.svg' width={45} height={30} {...props} />
);
const DE = (props: Partial<ImageProps>) => (
  <Image alt='DE' src='/static/images/flags/de.svg' width={45} height={30} {...props} />
);
const AE = (props: Partial<ImageProps>) => (
  <Image alt='AE' src='/static/images/flags/ae.svg' width={45} height={30} {...props} />
);
const ES = (props: Partial<ImageProps>) => (
  <Image alt='ES' src='/static/images/flags/es.svg' width={45} height={30} {...props} />
);
const FR = (props: Partial<ImageProps>) => (
  <Image alt='FR' src='/static/images/flags/fr.svg' width={45} height={30} {...props} />
);
const US = (props: Partial<ImageProps>) => (
  <Image alt='US' src='/static/images/flags/us.svg' width={45} height={30} {...props} />
);

const flagStyle = { width: 51 };

const SectionHeading = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        padding: ${theme.spacing(2, 2, 0)};
`
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
        width: ${theme.spacing(5)};
        height: ${theme.spacing(5)};
`
);

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const getLanguage = i18n.language;

  const switchLanguage = ({ lng }: { lng: any }) => {
    internationalization.changeLanguage(lng);
  };
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const makeOnClick = (lng: string) => () => {
    switchLanguage({ lng });
    handleClose();
  };

  return (
    <>
      <Tooltip arrow title={t('Language Switcher')}>
        <IconButtonWrapper color='primary' ref={ref} onClick={handleOpen}>
          {getLanguage === 'de' && <DE style={flagStyle} />}
          {getLanguage === 'en' && <US style={flagStyle} />}
          {getLanguage === 'en-US' && <US style={flagStyle} />}
          {getLanguage === 'en-GB' && <US style={flagStyle} />}
          {getLanguage === 'es' && <ES style={flagStyle} />}
          {getLanguage === 'fr' && <FR style={flagStyle} />}
          {getLanguage === 'cn' && <CN style={flagStyle} />}
          {getLanguage === 'ae' && <AE style={flagStyle} />}
        </IconButtonWrapper>
      </Tooltip>

      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ maxWidth: 240 }}>
          <SectionHeading variant='body2' color='text.primary'>
            {t('Language Switcher')}
          </SectionHeading>
          <List sx={{ p: 2 }} component='nav'>
            <ListItem
              className={getLanguage === 'en' || getLanguage === 'en-US' ? 'active' : ''}
              button
              onClick={makeOnClick('en')}
            >
              <US style={flagStyle} />
              <ListItemText sx={{ pl: 1 }} primary='English' />
            </ListItem>
            <ListItem
              className={getLanguage === 'de' ? 'active' : ''}
              button
              onClick={makeOnClick('de')}
            >
              <DE style={flagStyle} />
              <ListItemText sx={{ pl: 1 }} primary='German' />
            </ListItem>
            <ListItem
              className={getLanguage === 'es' ? 'active' : ''}
              button
              onClick={makeOnClick('es')}
            >
              <ES style={flagStyle} />
              <ListItemText sx={{ pl: 1 }} primary='Spanish' />
            </ListItem>
            <ListItem
              className={getLanguage === 'fr' ? 'active' : ''}
              button
              onClick={makeOnClick('fr')}
            >
              <FR style={flagStyle} />
              <ListItemText sx={{ pl: 1 }} primary='French' />
            </ListItem>
            <ListItem
              className={getLanguage === 'cn' ? 'active' : ''}
              button
              onClick={makeOnClick('cn')}
            >
              <CN style={flagStyle} />
              <ListItemText sx={{ pl: 1 }} primary='Chinese' />
            </ListItem>
            <ListItem
              className={getLanguage === 'ae' ? 'active' : ''}
              button
              onClick={makeOnClick('ae')}
            >
              <AE style={flagStyle} />
              <ListItemText sx={{ pl: 1 }} primary='Arabic' />
            </ListItem>
          </List>

          <Divider />

          <Text color='warning'>
            <Box p={2} sx={{ maxWidth: 340 }}>
              <WarningTwoToneIcon fontSize='small' />
              <Typography variant='body1'>
                {t('We only translated a small part of the template, for demonstration purposes')}!
              </Typography>
            </Box>
          </Text>
        </Box>
      </Popover>
    </>
  );
}
