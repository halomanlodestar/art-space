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

export interface Author {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  image: string;
  communityId: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  media: string[];
  author: Author;
  community: Community;
  createdAt: Date;
  updatedAt: Date;
}
