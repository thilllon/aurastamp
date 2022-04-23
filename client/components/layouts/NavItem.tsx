import { Box, Button, ListItem, ListItemProps } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
} & ListItemProps;

export const NavItem = ({ href, icon, title, ...others }: NavItemProps) => {
  const router = useRouter();
  const active = href ? router.pathname.startsWith(href) : false;

  return (
    <ListItem disableGutters sx={{ display: 'flex', mb: 0.5, py: 0, px: 2 }} {...others}>
      <NextLink href={href} passHref>
        <Button
          component='a'
          startIcon={icon}
          sx={{
            backgroundColor: active ? 'rgba(255,255,255, 0.08)' : undefined,
            borderRadius: 1,
            color: active ? 'secondary.main' : 'neutral.300',
            fontWeight: active ? 'fontWeightBold' : undefined,
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400',
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};
