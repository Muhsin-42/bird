import UserCard from "@/components/cards/UserCard";
import BackButton from "./backButton";

interface User {
  id: string;
  name: string;
  username: string;
  image: string;
}

interface Props {
  title: string;
  users: User[];
  isNext: boolean;
  username: string;
}

const FollowList = ({ title, users, isNext, username }: Props) => {
  return (
    <section className="head-text mb-10">
      <div className="flex items-center gap-4 mb-8">
        <BackButton />
        <div>
          <h1 className="text-heading2-bold text-light-1">{username}</h1>
          <p className="text-small-regular text-gray-1">{title}</p>
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-4">
        {users.length === 0 ? (
          <p className="no-result">No users found</p>
        ) : (
          users.map((user) => (
            <UserCard
              key={user.id}
              id={user.username}
              name={user.name}
              username={user.username}
              imgUrl={user.image}
              personType="User"
            />
          ))
        )}
      </div>

      {isNext && (
        <div className="mt-8 text-center">
          <p className="text-small-regular text-gray-1">Load more users...</p>
        </div>
      )}
    </section>
  );
};

export default FollowList;
