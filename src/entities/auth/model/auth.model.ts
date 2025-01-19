export type JoinRequest = {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
};
export type JoinResponse = {};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  refreshToken: {
    refreshTokenExp: string;
    refreshToken: string;
  };
  accessToken: string;
  userInfo: {
    _id: string;
    displayName: string;
    email: string;
  };
  isLoggedIn: boolean;
};

export type GetAccessTokenRequest = {
  userId: string;
  refreshToken: string;
};
export type GetAccessTokenResponse = {};
