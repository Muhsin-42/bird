import { IUserGeneral, IUserMongo } from "@/interfaces/propInterfaces";
import React, { useEffect, useReducer } from "react";

const useReducerProvider = ({ users }: { users: IUserMongo[] }) => {
  type State = {
    isFocused: boolean;
    searchKey: string;
    filteredUsers: IUserMongo[];
  };

  type Action =
    | { type: "FOCUS" }
    | { type: "BLUR" }
    | { type: "SET_SEARCH_KEY"; value: string }
    | { type: "SET_FILTERED_USERS"; value: IUserMongo[] };

  const initialState: State = {
    isFocused: false,
    searchKey: "",
    filteredUsers: [],
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "FOCUS":
        return { ...state, isFocused: true };
      case "BLUR":
        return { ...state, isFocused: false };
      case "SET_SEARCH_KEY":
        return { ...state, searchKey: action.value };
      case "SET_FILTERED_USERS":
        return { ...state, filteredUsers: action.value };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchKey } = state;

  useEffect(() => {
    if (searchKey) {
      let key = searchKey.toLowerCase();
      const searchFilteredUsers = users?.filter(
        (user: { name: string; username: string }) =>
          user.name?.toLowerCase().includes(key) ||
          user.username?.toLowerCase().includes(key)
      );
      dispatch({ type: "SET_FILTERED_USERS", value: searchFilteredUsers });
    } else {
      dispatch({ type: "SET_FILTERED_USERS", value: users });
    }
  }, [searchKey, users]);

  return { state, dispatch };
};

export default useReducerProvider;
