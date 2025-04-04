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
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  isBookmarked: boolean;
  isLiked: boolean;
  isShared: boolean;
  isSaved: boolean;
  isReported: boolean;
  isBlocked: boolean;
  isFollowing: boolean;
  isFollowingCommunity: boolean;
  isFollowingAuthor: boolean;
  community: Community;
  createdAt: Date;
  updatedAt: Date;
}
