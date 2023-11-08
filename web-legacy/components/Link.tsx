import { SerializedStyles } from '@emotion/react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { styled } from '@mui/material/styles';
// eslint-disable-next-line no-restricted-imports
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

type NextLinkComposedProps = {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  Omit<NextLinkProps, 'href' | 'as'>;

const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  (props, ref) => {
    const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={true}
        locale={locale}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    );
  }
);

NextLinkComposed.displayName = 'NextLinkComposed';

type CustomLinkProps = {
  href: NextLinkProps['href'];
  as?: NextLinkProps['as'];
  isMuiStyle?: boolean;
  cssProps?: SerializedStyles;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
export const Link = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      href,
      as: linkAs,
      isMuiStyle = true,
      role, // Link don't have roles.
      children,
      cssProps,
      target,
      ...other
    },
    ref
  ) => {
    const isExternal =
      typeof href === 'string' &&
      (href.startsWith('http:') || href.startsWith('https:') || href.startsWith('mailto:'));

    const defaultTargetType = target ?? (isExternal ? '_blank' : '_self');

    if (isExternal) {
      return isMuiStyle ? (
        <MuiLink
          underline='hover'
          href={href}
          ref={ref}
          css={cssProps}
          target={defaultTargetType}
          {...other}
        >
          {children}
        </MuiLink>
      ) : (
        <Anchor href={href} ref={ref} css={cssProps} target={defaultTargetType} {...other}>
          {children}
        </Anchor>
      );
    } else {
      return isMuiStyle ? (
        <MuiLink
          component={NextLinkComposed}
          linkAs={linkAs}
          ref={ref}
          to={href}
          css={cssProps}
          target={defaultTargetType}
          {...other}
        >
          {children}
        </MuiLink>
      ) : (
        <NextLinkComposed ref={ref} to={href} css={cssProps} target={defaultTargetType} {...other}>
          {children}
        </NextLinkComposed>
      );
    }
  }
);

Link.displayName = 'Link';
