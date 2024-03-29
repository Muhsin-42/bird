export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Activity",
  },
  // {
  //   imgURL: "/assets/create.svg",
  //   route: "/create-post",
  //   label: "Create Post",
  // },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Communities",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const PROFILE_TABS = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "like", label: "Liked", icon: "/assets/heart-gray.svg" },
  { value: "bookmark", label: "Bookmarks", icon: "/assets/tag.svg" },
] as const;
export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
] as const;
