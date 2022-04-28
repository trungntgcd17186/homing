import Profile from "../pages/Profile";
import Password from "../pages/Password";
import Notification from "../pages/Notification";
import Communications from "../pages/Communications";
import MyVideos from "../pages/MyVideos";
import MyArticles from "../pages/MyArticles";

export type RouteProps = {
  key: string;
  title: string;

  url: string;
  Component?: any;
  disabled?: boolean;
  exact?: boolean;
};

export let routes = [
  {
    key: "/home/profile",
    title: "Edit Profile",
    url: "/home/profile",
    exact: true,
    Component: Profile,
  },
  {
    key: "/home/password",
    title: "Password",
    url: "/home/password",
    exact: true,
    Component: Password,
  },
  {
    key: "/home/notification",
    title: "Notification setting",
    url: "/home/notification",
    exact: true,
    Component: Notification,
  },
  {
    key: "/home/communications",
    title: "Communications",
    url: "/home/communications",
    exact: true,
    Component: Communications,
  },

  {
    key: "/home/myvideos",
    title: "My videos",
    url: "/home/myvideos",
    exact: true,
    Component: MyVideos,
  },
  {
    key: "/home/myarticles",
    title: "My Articles",
    url: "/home/myarticles",
    exact: true,
    Component: MyArticles,
  },
];

export default routes;
