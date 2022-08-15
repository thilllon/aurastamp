import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const HelpDeskButton = () => {
  const { t } = useTranslation();
  const onClick = async () => {
    alert('준비중입니다.');
  };

  return (
    <Button onClick={onClick} variant='outlined'>
      {t('헬프 데스크')}
    </Button>
  );
};
