import { Share } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { MouseEventHandler } from 'react';
import { RiKakaoTalkFill, RiLinkedinBoxFill, RiShareFill } from 'react-icons/ri';
import { RWebShare } from 'react-web-share';

type ButtonInfo = {
  href?: string;
  onClick?: () => void;
  name: 'WEB' | 'KAKAO' | 'LINKEDIN';
};

export const ShareButtons = ({ buttons }: { buttons: ButtonInfo[] }) => {
  return (
    <Box>
      {buttons.map(({ name, href, onClick }, idx) => {
        const Icon =
          name === 'WEB' ? (
            <RiShareFill />
          ) : name === 'KAKAO' ? (
            <RiKakaoTalkFill />
          ) : name === 'LINKEDIN' ? (
            <RiLinkedinBoxFill />
          ) : null;
        return (
          <IconButton key={idx} href={href} onClick={onClick}>
            {Icon}
          </IconButton>
        );
      })}
    </Box>
  );
};

export const WebShareButton = ({
  title,
  url,
  text = '',
  onClick,
}: {
  title: string;
  url: string;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <RWebShare
      data={{ text, url, title }}
      onClick={(ev) => {
        onClick?.(ev);
        console.log('shared successfully!');
      }}
    >
      <IconButton>
        <Share />
      </IconButton>
    </RWebShare>
  );
};
