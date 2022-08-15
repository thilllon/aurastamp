import {
  ArchiveTwoTone as ArchiveTwoToneIcon,
  ChevronLeftTwoTone as ChevronLeftTwoToneIcon,
  ChevronRightTwoTone as ChevronRightTwoToneIcon,
  DeleteTwoTone as DeleteTwoToneIcon,
  MarkEmailReadTwoTone as MarkEmailReadTwoToneIcon,
  MoreVertTwoTone as MoreVertTwoToneIcon,
  SearchTwoTone as SearchTwoToneIcon,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Menu,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionBarItemProps {
  mails: number;
  onDeselectAll?: () => void;
  onSelectAll?: () => void;
  selectedMails: number;
}

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
      .MuiInputBase-input {
          font-size: ${theme.typography.pxToRem(17)};
      }
`
);

const ActionBarItem: FC<ActionBarItemProps> = ({
  mails,
  onDeselectAll = () => {},
  onSelectAll = () => {},
  selectedMails,
}) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) =>
    event.target.checked ? onSelectAll() : onDeselectAll();

  const selectedAllMails = selectedMails === mails && mails > 0;
  const selectedSomeMails = selectedMails > 0 && selectedMails < mails;
  const selectedBulkActions = selectedMails > 0;

  const { t } = useTranslation();

  const [onMenuOpen, menuOpen] = useState(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  return (
    <>
      <Box px={3} sx={{ pt: { lg: 3 } }} pb={1}>
        <SearchInputWrapper
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchTwoToneIcon />
              </InputAdornment>
            ),
          }}
          placeholder={t('Search messages...')}
          fullWidth
        />
      </Box>
      <Box px={1.5} pb={1} display='flex' alignItems='center' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
          <Tooltip arrow placement='top' title={t('Select all mails')}>
            <Checkbox
              checked={selectedAllMails}
              indeterminate={selectedSomeMails}
              onChange={handleCheckboxChange}
            />
          </Tooltip>
          {!selectedBulkActions && <Typography>{t('Select all')}</Typography>}
          {selectedBulkActions && (
            <Box>
              <Tooltip arrow placement='top' title={t('Archive')}>
                <IconButton color='primary' sx={{ ml: 1, p: 1 }}>
                  <ArchiveTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement='top' title={t('Delete')}>
                <IconButton color='primary' sx={{ p: 1 }}>
                  <DeleteTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement='top' title={t('Mark as read')}>
                <IconButton color='primary' sx={{ p: 1 }}>
                  <MarkEmailReadTwoToneIcon />
                </IconButton>
              </Tooltip>
              <IconButton color='primary' onClick={openMenu} ref={moreRef} sx={{ ml: 1, p: 1 }}>
                <MoreVertTwoToneIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {mails > 0 && (
          <Box display='flex' alignItems='center'>
            <IconButton color='primary' sx={{ mr: 0.5, p: 0.5 }}>
              <ChevronLeftTwoToneIcon />
            </IconButton>

            <Typography variant='body2' color='text.secondary'>
              <b>1</b> - <b>{mails}</b> {t('of')} <b>{mails}</b>
            </Typography>
            <IconButton color='primary' sx={{ ml: 0.5, p: 0.5 }}>
              <ChevronRightTwoToneIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Menu
        disableScrollLock
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <List sx={{ p: 1 }} component='nav'>
          <ListItem button>
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary={t('Mark as read')} />
          </ListItem>
          <ListItem button>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={t('Mark as important')}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={t('Show similar emails')}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={t('Forward as attachment')}
            />
          </ListItem>
        </List>
      </Menu>
    </>
  );
};

export default ActionBarItem;
