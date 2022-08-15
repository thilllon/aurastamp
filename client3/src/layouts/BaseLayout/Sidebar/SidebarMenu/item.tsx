import { Link } from '@/components/Link';
import { useSidebar } from '@/contexts/SidebarContext';
import {
  ExpandLessTwoTone as ExpandLessTwoToneIcon,
  ExpandMoreTwoTone as ExpandMoreTwoToneIcon,
} from '@mui/icons-material';
import { Badge, Button, Collapse, ListItem, Tooltip, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import clsx from 'clsx';
import { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SidebarMenuItemProps {
  children?: ReactNode;
  link?: string;
  icon?: any;
  badge?: string;
  badgeTooltip?: string;
  open?: boolean;
  active?: boolean;
  name: string;
}

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.black[100],
    color: theme.palette.getContrastText(theme.colors.alpha.black[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow: '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.black[100],
  },
}));

export const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  children,
  link,
  icon: Icon,
  badge,
  badgeTooltip,
  open: openParent = false,
  active = false,
  name,
  ...rest
}) => {
  const [menuToggle, setMenuToggle] = useState<boolean>(openParent);
  const { t } = useTranslation();
  const { closeSidebar, toggleSidebar } = useSidebar();

  const toggleMenu = () => {
    setMenuToggle((Open) => !Open);
  };

  if (children) {
    return (
      <ListItem component='div' className='Mui-children' key={name} {...rest}>
        <Button
          className={clsx({ 'Mui-active': menuToggle })}
          startIcon={Icon && <Icon />}
          endIcon={menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
          onClick={toggleSidebar}
        >
          {badgeTooltip && (
            <TooltipWrapper title={badgeTooltip} arrow placement='right'>
              {badge === '' ? (
                <Badge color='primary' variant='dot' />
              ) : (
                <Badge badgeContent={badge} />
              )}
            </TooltipWrapper>
          )}
          {!badgeTooltip &&
            (badge === '' ? (
              <Badge color='primary' variant='dot' />
            ) : (
              <Badge badgeContent={badge} />
            ))}
          {t(name)}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component='div' key={name} {...rest}>
      <Link href={link}>
        <Button
          disableRipple
          // component='a'
          className={clsx({ 'Mui-active': active })}
          onClick={toggleSidebar}
          startIcon={Icon && <Icon />}
        >
          {t(name)}

          {badgeTooltip ? (
            <TooltipWrapper title={badgeTooltip} arrow placement='right'>
              {badge === '' ? (
                <Badge color='primary' variant='dot' />
              ) : (
                <Badge badgeContent={badge} />
              )}
            </TooltipWrapper>
          ) : badge === '' ? (
            <Badge color='primary' variant='dot' />
          ) : (
            <Badge badgeContent={badge} />
          )}
        </Button>
      </Link>
    </ListItem>
  );
};
