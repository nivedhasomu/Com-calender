import { Dashboard, MyCalendar } from "../../pages";

const USER_ROUTES = [
  {
    path: "/user",
    routes: [
      {
        path: "/user/dashboard",
        name: "Dashboard",
        component: Dashboard,
        isSidebarMenu: false,
      },
      {
        path: "/user/calendar",
        name: "Calendar",
        component: MyCalendar,
        isSidebarMenu: false,
      },
    ],
  },
];

export default USER_ROUTES;
