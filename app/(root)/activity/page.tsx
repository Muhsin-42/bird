import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";

export default async function Activity() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { data: userInfo } = await fetchUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { data: activity } = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          activity.map((activity) => (
            <Link
              href={`/thread/${activity?.author?.name}/${activity.parentId}`}
              key={activity._id}
            >
              <article className="activity-card">
                <Image
                  alt="Profile Picture"
                  className="rounded-full object-contain"
                  height={20}
                  src={activity.author.image}
                  width={20}
                />
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {activity?.author?.name}
                  </span>{" "}
                  replied to your thread.
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet.</p>
        )}
      </section>
    </section>
  );
}
