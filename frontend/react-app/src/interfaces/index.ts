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

export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

export interface Post {
  id: number;
  content: string;
  images: Image[];
  user: {
    id: number | string;
    name: string;
    email: string;
  };
  createdAt?: any;
  likes: number;
  isLiked: boolean;
}

export interface Image {
  url: string;
}

export interface PostApiJson {
  posts: Post[];
}
