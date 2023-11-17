import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function Search (){
    const user = await currentUser();
    if(!user) return redirect('/sign-in');

    const userInfo = await fetchUser(user?.id);
    console.log('userIiii ',userInfo)
    if(!userInfo?.onboarded) redirect('/onboarding');

    //fetch users
    const result = await fetchUsers({
        userId: user.id,
        searchString:'',
        pageNumber: 1,
        pageSize: 25,
        sortBy: 'desc'
    })

    return (
        <section>
            <h1 className="head-text">Search</h1>

            <div className="mt-14 flex flex-col gap-9">
                {result?.users?.length === 0 && <p className="no-result">No Users</p>}
                {result?.users?.map((person)=>(
                    <UserCard 
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        username={person.username}
                        imgUrl={person.image}
                        personType='User'
                    />
                ))}
            </div>
        </section>
    )
}