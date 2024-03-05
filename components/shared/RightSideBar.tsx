import { IUserGeneral } from "@/interfaces/propInterfaces";
import React from "react";
import UserRow from "./UserRow";

const RightSideBar = ({
  users,
  currentUser,
}: {
  users: IUserGeneral[];
  currentUser: IUserGeneral;
}) => {
  return (
    <section className="custom-scrollbar  rightsidebar ">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <div className="mt-4 flex flex-col gap-5">
          {users?.map((user) => (
            <UserRow
              currentUser={JSON.parse(JSON.stringify(currentUser))}
              user={user}
              key={user._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
