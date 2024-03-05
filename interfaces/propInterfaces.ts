export interface IUserGeneral {
  _id?: string;
  id: string;
  username?: string;
  name: string;
  bio?: string;
  image: string;
}
export interface IUserMongo {
  _id: string;
  id: string;
  username: string;
  name: string;
  bio?: string;
  image: string;
  threads: string[];
  followingId?: {
    _id: string;
    following: string[];
    followers: string[];
  };
}

export interface IPostCard {
  key: string;
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  image?: string;
  like: string[];
  bookmark: string[];
  createdAt: Date | string;
  author: IUserGeneral;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  isDeleted: boolean;
}

export interface IActionsSection {
  isComment?: boolean;
  id: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  currentUserId: string;
  like: string[];
  bookmark: string[];
  author: {
    _id?: string;
    name: string;
    image: string;
    id: string;
  };
}
