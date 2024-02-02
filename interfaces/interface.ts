import { IUserGeneral } from "./propInterfaces";

interface IPostCommon {
  _id: string;
  text: string;
  author: IUserGeneral;
  like: string[];
  bookmark?: string[];
  deleted: boolean;
  createdAt: string;
  parentId: string | null;
}

interface IPostChild extends IPostCommon {
  parentId: string;
  children: IPostChild[];
}

export interface IPost extends IPostCommon {
  image: string;
  community: null;
  children: IPostChild[];
}
