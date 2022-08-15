import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  heading: string;
  subheading: string;
}

const RootWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(5)}; 
`
);

const PageHeader: FC<PageHeaderProps> = ({ heading, subheading, ...rest }) => {
  const { t } = useTranslation();

  return (
    <RootWrapper {...rest}>
      {heading && <Typography variant='h1'>{t(heading)}</Typography>}
      {subheading && <Typography variant='subtitle2'>{t(subheading)}</Typography>}
      <Divider sx={{ mt: 5 }} />
    </RootWrapper>
  );
};

export default PageHeader;
