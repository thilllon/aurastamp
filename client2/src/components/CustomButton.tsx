import Link from '@/components/Link';
import { useSidebar } from '@/contexts/SidebarContext';
import { Button, ButtonProps } from '@mui/material';
import { MouseEventHandler } from 'react';

export const CustomButton = ({
  children,
  onClick: onClickProps,
  color = 'secondary',
  variant = 'text',
  ...props
}: ButtonProps) => {
  const { closeSidebar } = useSidebar();

  const onClick: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    closeSidebar();
    onClickProps?.(ev);
  };

  return (
    <Button
      sx={{ m: 0, wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'nowrap' }}
      color={color}
      variant={variant}
      LinkComponent={Link}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};
