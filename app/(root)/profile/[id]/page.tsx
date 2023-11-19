import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PROFILE_TABS } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
type Props={
    params: { id: string}
}
async function Page ({params}:Props){
    
    const user = await currentUser();
    if(!user) return redirect('/sign-in');

    const userInfo = await fetchUser(params.id);
    const mongoCurrentUser = await fetchUser(user.id);
    console.log('usi ',userInfo)
    if(!userInfo) redirect('/onboarding');

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {PROFILE_TABS.map((tab)=>(
                            <TabsTrigger key={tab.label} value={tab.value} className="tab" >
                                <Image
                                src={tab.icon}
                                alt={tab.label}
                                height={24}
                                width={24}
                                className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>

                                {tab.label === 'Threads' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {userInfo?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {PROFILE_TABS.map((tab)=>(
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1" >
                            <ThreadsTab
                                currentUserId={mongoCurrentUser?._id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default Page;