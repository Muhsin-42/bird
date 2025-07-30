'use client';

import React from 'react';
import type { IUserMongo } from '@/interfaces/propInterfaces';
import { Input } from '../../ui/input';
import SearchDropDown from './SearchDropDown';
import useReducerProvider from './useReducerProvider';

const GlobalSearch = ({ users }: { users: IUserMongo[] }) => {
  const { state, dispatch } = useReducerProvider({ users });
  const { isFocused, searchKey, filteredUsers } = state;

  return (
    <div className="bg-green-500">
      <div className="-translate-x-1/2 absolute top-0 left-1/2 my-2 w-7/12 xs:w-4/12 sm:w-7/12 md:left-[60%] xl:left-1/2 xl:w-6/12">
        <Input
          className="!bg-dark-1 rounded-full text-white"
          onBlur={() =>
            setTimeout(() => {
              dispatch({ type: 'BLUR' });
            }, 200)
          }
          onChange={(e) =>
            dispatch({ type: 'SET_SEARCH_KEY', value: e.target.value })
          }
          onFocus={() => dispatch({ type: 'FOCUS' })}
          placeholder="Search.."
          type="search"
          value={searchKey}
        />
        {isFocused && (
          <div
            className={`transition-all duration-300 ease-in-out ${
              isFocused ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            <SearchDropDown searchKey={searchKey} users={filteredUsers} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
