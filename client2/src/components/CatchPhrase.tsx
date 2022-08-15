import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextWrapper = ({
  label,
  index,
  startColor,
  endColor,
}: {
  label: string;
  index: number;
  startColor: string;
  endColor: string;
}) => {
  const commonStyle = {
    fontWeight: 900,
    lineHeight: '10rem',
    fontFamily: 'Inter',
    display: 'block',
    textAlign: 'center',
    padding: 0,

    color: '#000000',
    letterSpacing: -6,
    marginBottom: -23,
  };

  const innerAnimation: any = {
    '@keyframes innerV1': {
      '0%': { opacity: 1 },
      '16.666%': { opacity: 1 },
      '50%': { opacity: 0 },
      '100%': { opacity: 0 },
    },
    '@keyframes innerV2': {
      '0%': { opacity: 1 },
      '16.666%': { opacity: 1 },
      '33%': { opacity: 0 },
      '83%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  };

  const outerAnimation: any = {
    '@keyframes outer': {
      '0%': { opacity: 1 },
      '16.666%': { opacity: 1 },
      '50%': { opacity: 0 },
      '100%': { opacity: 0 },
    },
    '@keyframes outer0': {
      '0%': { opacity: 1 },
      '16.666%': { opacity: 0 },
      '25%': { opacity: 1 },
      '91.6%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
  };

  const OuterText = styled('span')(({ theme }) => ({
    position: 'relative',
    display: 'block',
    userSelect: 'none',
    // border: '1px solid blue',
    width: 'max-content',
    '&:before': {
      ...commonStyle,
      content: `"${label}"`,
      position: 'absolute',
      // width: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0,
      ...outerAnimation,
      animation: `outer0 6s ease 0s infinite normal forwards running`,
      animationDelay: `${index * 2}s`,
    },
  }));

  const InnerText = styled('span')({
    ...commonStyle,
    // border: '1px solid red',
    width: 'max-content',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundImage: `linear-gradient(150deg, ${startColor}, ${endColor})`,
    position: 'relative',
    zIndex: 1,
    opacity: 0,
    ...innerAnimation,
    animation: `innerV2 6s ease 1s infinite normal forwards running`,
    animationDelay: `${index * 2}s`,
  });

  const commonSx = {
    fontSize: {
      xs: '6rem',
      md: '8rem',
      lg: '10rem',
    },
    height: {
      xs: '7.5rem',
      md: '9rem',
      lg: '11rem',
    },
  };

  return (
    <OuterText sx={{ ...commonSx }}>
      <InnerText sx={{ ...commonSx }}>{label}</InnerText>
    </OuterText>
  );
};

export const CatchPhrase = () => {
  return (
    <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
      {/* <TextWrapper label={'Test.'} index={0} startColor={'#007CF0'} endColor={'#00DFD8'} /> */}
      {/* <TextWrapper label={'Prove.'} index={1} startColor={'#7928CA'} endColor={'#FF0080'} /> */}
      {/* <TextWrapper label={'Hire.'} index={2} startColor={'#FF4D4D'} endColor={'#F9CB28'} /> */}
      <TextWrapper label={'Test.'} index={0} startColor={'#3869E8'} endColor={'#00DFD8'} />
      <TextWrapper label={'Prove.'} index={1} startColor={'#E5192A'} endColor={'#F97681'} />
      <TextWrapper label={'Hire.'} index={2} startColor={'#7928CA'} endColor={'#FF0080'} />
    </Box>
  );
};
