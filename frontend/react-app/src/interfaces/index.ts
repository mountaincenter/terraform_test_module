export interface SignUpData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
}

export interface User extends UserProps {
  uid: string;
  provider: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

export interface Follow {
  id: number;
  followerId: number;
  followedId: number;
  follower: UserProps;
  followed: UserProps;
}

export interface Post {
  id: number;
  content: string;
  images: Image[];
  user: UserProps;
  createdAt?: any;
  likesCount: number;
  liked: boolean;
}

export interface Image {
  url: string;
}

export interface PostApiJson {
  posts: Post[];
}
