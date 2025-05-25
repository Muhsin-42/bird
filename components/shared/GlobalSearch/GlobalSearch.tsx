"use client";

import React from "react";
import { Input } from "../../ui/input";
import { IUserMongo } from "@/interfaces/propInterfaces";
import useReducerProvider from "./useReducerProvider";
import SearchDropDown from "./SearchDropDown";

const GlobalSearch = ({ users }: { users: IUserMongo[] }) => {
  const { state, dispatch } = useReducerProvider({ users });
  const { isFocused, searchKey, filteredUsers } = state;

  return (
    <div className="bg-green-500">
      <div className="absolute left-1/2 top-0 my-2 w-7/12 -translate-x-1/2 xs:w-4/12 sm:w-7/12 md:left-[60%] xl:left-1/2  xl:w-6/12">
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
        {isFocused && (
          <div
            className={`transition-all duration-300 ease-in-out ${
              isFocused ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <SearchDropDown users={filteredUsers} searchKey={searchKey} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
