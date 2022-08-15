import {
  DeleteTwoTone as DeleteTwoToneIcon,
  MoreVertTwoTone as MoreVertTwoToneIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions() {
  const [onMenuOpen, menuOpen] = useState(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation();

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
          <Typography variant='h5' color='text.secondary'>
            {t('Bulk actions')}:
          </Typography>
          <ButtonError sx={{ ml: 1 }} startIcon={<DeleteTwoToneIcon />} variant='contained'>
            {t('Delete')}
          </ButtonError>
        </Box>
        <IconButton color='primary' onClick={openMenu} ref={moreRef} sx={{ ml: 2, p: 1 }}>
          <MoreVertTwoToneIcon />
        </IconButton>
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
            <ListItemText primary={t('Bulk delete selected')} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={t('Resend email notification')} />
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
