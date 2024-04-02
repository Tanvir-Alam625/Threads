/**
 * @description This file contains all the constants used in the application
*/
export type SidebarLinkType = {
    imgURL: string;
    route: string;
    label: string;
}
export const sidebarLinks: SidebarLinkType[] = [
    {
        imgURL: "/assets/home.svg",
        route: "/",
        label: "Home",
    },
    {
        imgURL: "/assets/community.svg",
        route: "/communities",
        label: "Communities",
    },
    {
        imgURL: "/assets/create.svg",
        route: "/create-thread",
        label: "Create Thread",
    },
    {
        imgURL: "/assets/user.svg",
        route: "/profile",
        label: "Profile",
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

];

export type TabItemType = {
    icon: string;
    value: string;
    label: string;
}
export type CSSUnit = `${number}${'px' | 'rem' | 'em' | 'vw' | 'vh' | '%'}`;

export const profileTabs: TabItemType[] = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];
export const communityTabs: TabItemType[] = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];