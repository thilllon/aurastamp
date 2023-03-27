import { Typography, TypographyProps } from '@mui/material';

type CopyableTypographyProps = TypographyProps;

// FIXME: 클릭시 클립보드로 카피되도록 변경
export const CopyableTypography = ({ children }: CopyableTypographyProps) => {
  return (
    <Typography
      sx={{
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      {children}
    </Typography>
  );
};
