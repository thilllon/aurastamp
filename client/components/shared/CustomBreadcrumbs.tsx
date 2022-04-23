import { Link } from '@/components/shared/Link';
import { SxProps } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React from 'react';

export type Crumb = {
  label: string;
  href: string;
  active?: boolean;
  title?: string;
};

export const CustomBreadcrumbs = React.memo(
  ({ crumbs, sx }: { crumbs?: Crumb[]; sx?: SxProps }) => {
    return (
      <Breadcrumbs sx={{ height: 24, mt: 2, ...sx }}>
        {crumbs?.map(({ label, href, active, title }, idx) => (
          <Link
            title={title}
            key={idx}
            underline='hover'
            href={href}
            sx={{
              fontSize: 14,
              fontWeight: active ? 'bold' : 'normal',
              color: (theme) => theme.palette.grey[700],
            }}
          >
            {label}
          </Link>
        ))}
      </Breadcrumbs>
    );
  }
);
