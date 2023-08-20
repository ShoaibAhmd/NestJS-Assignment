export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type TokenPayload = {
  sub: number;
  email: string;
};
