/** @format */

import { Post, User } from "@art-space/database";

// Users
export interface SafeUser extends Omit<User, "password"> {}

export interface AvatarUser extends Pick<User, "image" | "name" | "username"> {}

// Posts
export interface BasePost extends Pick<Post, "slug" | "title"> {}

export interface PostWithUser extends BasePost {
	user: AvatarUser;
}

export interface PostWithLikes extends BasePost {
	likes: number;
}

export interface PostWithComments extends BasePost {
	comments: number;
}

export interface PostWithUserAndLikes extends PostWithUser, PostWithLikes {}

export interface PostWithUserAndComments
	extends PostWithUser,
		PostWithComments {}

export interface PostWithMetadata
	extends PostWithUser,
		PostWithLikes,
		PostWithComments {}

// Enums

export { MediaType, Role, CredentialProvider } from "@art-space/database";

export enum RoleEnum {
	SUDO = 5,
	COMMUNITY_ADMIN = 3,
	COMMUNITY_CREATOR = 2,
	USER = 1,
}
