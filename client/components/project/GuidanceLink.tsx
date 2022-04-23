import { Link } from '@/components/shared/Link';
import { SerializedStyles } from '@emotion/react';
import { OpenInNew } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

interface GuidanceLinkProps {
  cssProps?: SerializedStyles;
}

export const GuidanceLink = React.memo(({}: GuidanceLinkProps) => {
  const systemManualLink = 'https://www.notion.so/carillon/1d7c87a9c4b241b0b2811f5aa7dbd510';
  const labelingManualLink =
    'https://www.notion.so/carillon/QMonitor-123225b3217f4679b96db72ff6f90b30';
  return (
    <Box sx={{ display: 'flex', gap: 2, my: 1 }}>
      <Link
        href={systemManualLink}
        sx={{
          // border: '2px solid',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {'시스템 사용 매뉴얼'}
        <OpenInNew fontSize='small' sx={{ fontSize: 16 }} />
      </Link>
      <Link
        href={labelingManualLink}
        sx={{
          // border: '2px solid',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {'라벨링 가이드라인'}
        <OpenInNew fontSize='small' sx={{ fontSize: 16 }} />
      </Link>
    </Box>
  );
});
