export type SessionPayload = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    role: string;
    image: string;
    communityId: string;
  };
};
