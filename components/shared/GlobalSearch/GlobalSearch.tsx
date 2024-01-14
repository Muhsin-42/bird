"use client";

import React, { useEffect } from "react";
import { Input } from "../../ui/input";
import { IUserMongo } from "@/interfaces/propInterfaces";
import useReducerProvider from "./useReducerProvider";
import SearchDropDown from "./SearchDropDown";

const GlobalSearch = ({ users }: { users: IUserMongo[] }) => {
  const { state, dispatch } = useReducerProvider({ users });
  const { isFocused, searchKey, filteredUsers } = state;

  return (
    <div className="bg-green-500">
      <div className="my-2 w-7/12 xs:w-4/12 sm:w-7/12 xl:w-6/12 top-0 absolute left-1/2 md:left-[60%] xl:left-1/2  transform -translate-x-1/2">
        <Input
          onFocus={() => dispatch({ type: "FOCUS" })}
          onBlur={() =>
            setTimeout(() => {
              dispatch({ type: "BLUR" });
            }, 200)
          }
          type="search"
          placeholder="Search.."
          className="rounded-full !bg-dark-1 text-white"
          value={searchKey}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_KEY", value: e.target.value })
          }
        />
        {
          isFocused &&
        <div
          className={`transition-all duration-300 ease-in-out ${
            isFocused ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <SearchDropDown users={filteredUsers} searchKey={searchKey} />
        </div>
        }
      </div>
    </div>
  );
};

export default GlobalSearch;
