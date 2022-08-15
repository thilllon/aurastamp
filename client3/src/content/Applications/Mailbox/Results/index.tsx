import { getMails } from '@/slices/mailbox';
import { useDispatch, useSelector } from '@/store';
import { Box, Divider, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResultsActionBar from './ResultsActionBar';
import { ResultsItem } from './ResultsItem';

export const MailboxResults = ({ tag }: { tag: string }) => {
  const dispatch = useDispatch();
  const { mails } = useSelector((state) => state.mailbox);
  const [selectedMails, setSelectedMails] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getMails({ tag }));
  }, [dispatch, tag]);

  const handleSelectAllMails = (): void => {
    setSelectedMails(mails.allIds.map((mailId) => mailId));
  };

  const handleDeselectAllMails = (): void => {
    setSelectedMails([]);
  };

  const handleSelectOneMail = (mailId: string): void => {
    setSelectedMails((prevSelectedMails) => {
      if (!prevSelectedMails.includes(mailId)) {
        return [...prevSelectedMails, mailId];
      }

      return prevSelectedMails;
    });
  };

  const handleDeselectOneMail = (mailId: string): void => {
    setSelectedMails((prevSelectedMails) => prevSelectedMails.filter((id) => id !== mailId));
  };

  return (
    <Box>
      <ResultsActionBar
        onDeselectAll={handleDeselectAllMails}
        onSelectAll={handleSelectAllMails}
        selectedMails={selectedMails.length}
        mails={mails.allIds.length}
      />
      <Divider />

      {mails.allIds.length === 0 && (
        <Typography
          sx={{ py: 5 }}
          variant='h3'
          fontWeight='normal'
          color='text.secondary'
          align='center'
        >
          {t('There are no messages in this category')}
        </Typography>
      )}

      {mails.allIds.map((mailId: string) => (
        <ResultsItem
          mailbox={mails.byId[mailId]}
          key={mailId}
          href={
            tag && tag !== 'inbox'
              ? `/apps/mailbox?mailId=${mailId}&tag=${tag}`
              : `/apps/mailbox?mailId=${mailId}`
          }
          onDeselect={() => handleDeselectOneMail(mailId)}
          onSelect={() => handleSelectOneMail(mailId)}
          selected={selectedMails.includes(mailId)}
        />
      ))}
      {mails.allIds.length !== 0 && (
        <Box p={3} display='flex' justifyContent='center'>
          <Pagination shape='rounded' size='large' count={3} variant='outlined' color='primary' />
        </Box>
      )}
    </Box>
  );
};
