import { XOR } from 'ts-essentials';

// reference

// https://opentutorials.org/module/938/7369
// protocol: 'http:'
// host: 'host.com:8080' <- composite props
// slashes: true
// auth: 'user:password'
// port: '8080'
// hostname: 'host.com'
// search: '?query=string' <- composite props
// hash: '#hash'
// query: 'query=string'
// pathname: '/p/a/t/h'
// path: '/p/a/t/h?query=string' <- composite props
// href: 'http://user:password@host.com:8080/p/a/t/h?query=string#hash' <- composite props

type QueryKey = string;
type QueryValue = string | number;
type Query = [QueryKey, QueryValue][] | Record<QueryKey, QueryValue>;
type Path = { path?: string };
type PathElements = {
  params?: string[] | string;
  query?: Query;
  pathname?: string;
  search?: string;
  hash?: string;
};
type PartialBuilUrlProps = {
  protocol?: Protocol;
  auth?: Auth;
  host?: string;
  port?: string | number;
};
type BuildUrlProps = PartialBuilUrlProps & XOR<Path, PathElements>;
type ProtocolType = 'https' | 'http' | 'ftp';
type Protocol = `${ProtocolType}://` | '';
type Auth = `${string}:${string}` | '';

export const buildURL = ({
  // protocol = (window?.document?.location.protocol as Protocol) ?? 'http://',
  protocol = '',
  auth = '',
  // host = window?.document?.location.host ?? '',
  host = '',
  params = [],
  query = [],
  hash = '',
}: BuildUrlProps): string => {
  const queryArr = Array.isArray(query) ? query : Object.entries(query).sort();
  const paramsArr = typeof params === 'string' ? [params] : params;
  const queryString = queryArr.reduce((prv: string, cur: [string, QueryValue], idx) => {
    return prv + (idx > 0 ? '&' : '') + cur.join('=');
  }, '' as string);

  let href = '';
  href += protocol;
  href += auth;
  href += host;
  href += paramsArr.join('/');
  href += (queryArr.length > 0 ? '?' : '') + queryString;
  href += (hash ? '#' : '') + hash;
  return href;
};
