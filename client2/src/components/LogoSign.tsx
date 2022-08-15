/* eslint-disable @next/next/no-img-element */
import Link from '@/components/Link';
import { Badge, Box, Tooltip, TooltipProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const Logo = () => {
  return (
    <LogoWrapper href='/'>
      <Image src={'/logo/logo.svg'} alt='proved' width={126} height={24} />
    </LogoWrapper>
  );
};

const LogoWrapper = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  textDecoration: 'none',
  margin: '0 auto',
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
  // background: '#ff0000',
  height: '100%',
  outline: 'none',
}));

const LogoSign = styled(Box)(
  ({ theme }) => `
        background: ${theme.general.reactFrameworkColor};
        width: 18px;
        height: 18px;
        border-radius: ${theme.general.borderRadiusSm};
        position: relative;
        transform: rotate(45deg);
        top: 3px;
        left: 17px;

        &:after, 
        &:before {
            content: "";
            display: block;
            width: 18px;
            height: 18px;
            position: absolute;
            top: -1px;
            right: -20px;
            transform: rotate(0deg);
            border-radius: ${theme.general.borderRadiusSm};
        }

        &:before {
            background: ${theme.palette.primary.main};
            right: auto;
            left: 0;
            top: 20px;
        }

        &:after {
            background: ${theme.palette.secondary.main};
        }
`
);

const LogoSignInner = styled(Box)(
  ({ theme }) => `
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 5;
        border-radius: ${theme.general.borderRadiusSm};
        background: ${theme.header.background};
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow: '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}));

const badgeContent = process.env.NEXT_PUBLIC_VERSION_STRING ?? '';

/**
 * @Obsolete
 * @returns
 */
export const LogoOriginal = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  throw new Error('obsolete');

  return (
    <TooltipWrapper title={process.env.NEXT_PUBLIC_APP_TITLE} arrow>
      <LogoWrapper href='/'>
        <Badge
          sx={{
            '.MuiBadge-badge': {
              fontSize: theme.typography.pxToRem(11),
              right: -2,
              top: 8,
            },
          }}
          overlap='circular'
          color='success'
          badgeContent={badgeContent}
        >
          <Box sx={{ width: 52, height: 38 }}>
            <LogoSign>
              <LogoSignInner />
            </LogoSign>
          </Box>
        </Badge>
      </LogoWrapper>
    </TooltipWrapper>
  );
};
