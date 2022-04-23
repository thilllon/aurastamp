import 'next-auth';

// https://github.com/nextauthjs/next-auth/issues/671#issuecomment-785516812

declare module 'next-auth' {
  type Role = 'admin' | 'user'; // TODO: 확정할 것. viewer, guest, editor, read, write

  interface User {
    // default: name(string), email(string), image(string)
    id: string;
    carillon?: boolean;
    roles?: Role[];
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiry?: number;
    refreshTokenExpiry?: number;
    accessTokenExpiresIn?: Date;
    refreshTokenExpiresIn?: Date;
  }

  interface Session {
    // default: expires, user(User)
    user: User;
  }

  interface JWT {
    // default: name(string), email(string), picture(string), sub(uuid)
    // default: exp(number), iat(number), jti(uuid)
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiry?: number;
    refreshTokenExpiry?: number;
  }
}
