export interface IPostCard {
  key: string;
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  like: string[];
  author: {
    name: string;
    image: string;
    id: string;
    _id?: string;
  };
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
  isDeleted:boolean;
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
    author: {
        _id?: string;
        name: string;
        image: string;
        id: string;
  };
}
