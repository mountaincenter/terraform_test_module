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
  profile: string;
  followingsCount: number;
  followersCount: number;
  followed: boolean;
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

export interface UpdateUserData {
  id: number;
  name?: string;
  image?: string;
}

export interface UpdateUserFormData extends FormData {
  append: (
    name: keyof UpdateUserData,
    value: string | Blob,
    fileName?: string
  ) => void;
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

export interface Messages {
  id: number;
  body: string;
  senderId: number;
  recipientId: number;
  sender: {
    id: number;
    name: string;
  };
  recipient: {
    id: number;
    name: string;
  };
  createdAt?: Date;
}

export interface Comment {
  id: number;
  body: string;
  userId: number | undefined;
  postId: number;
  user: {
    id: number;
    name: string;
  };
  createdAt?: Date;
}
