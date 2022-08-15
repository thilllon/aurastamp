import { Box, Chip, Container, Typography } from '@mui/material';

export const CustomPageHeader = ({
  title,
  subtitle,
  tags = [],
}: {
  title: string;
  subtitle: string;
  tags?: string[];
}) => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          paddingY: (theme) => theme.spacing(4),
        }}
      >
        <Box display='flex' alignItems='center'>
          <Box>
            <Typography variant='h3' component='h3' gutterBottom>
              {title}
            </Typography>

            <Typography variant='subtitle2' gutterBottom={tags.length > 0}>
              {subtitle}
            </Typography>

            <Box sx={{ display: tags?.length > 0 ? 'block' : 'none' }}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} size={'small'} sx={{ mr: { xs: 1 } }} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
