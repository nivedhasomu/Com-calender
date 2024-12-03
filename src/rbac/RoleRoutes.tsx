import { Routes, Route, Navigate } from "react-router-dom";

import { ROLE_ROUTES } from "./lib";

import styles from "./RoleRoutes.module.scss";
import { useSelector } from "react-redux";
import { SLICE_NAMES } from "../constants/enums";
import USER_ROUTES from "./lib/user";

const RoleRoutes = () => {
  // const APP_USER = false;
  const APP_USER = useSelector((state: any) => state[SLICE_NAMES?.USER]);
  console.log(APP_USER)

  const AUTH_ROUTES = ROLE_ROUTES.auth[0].routes;
  const SIDEBAR_ROUTES = ROLE_ROUTES["user"][0].routes.filter(
    (route) => route.isSidebarMenu,
  );

  const PUBLIC_ROUTES = ROLE_ROUTES.public[0].routes;
  // const PUBLIC_ROUTES_PATHS = PUBLIC_ROUTES.map((route) => route.path);

  return APP_USER ? (
    <div className={styles.body}>
      <div className={styles.main}>
        <Routes>
          <Route path="*" element={<Navigate to={"/user/dashboard"} />} />
          {[...SIDEBAR_ROUTES, ...PUBLIC_ROUTES]?.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          {
            USER_ROUTES[0].routes?.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              )
            })
          }
        </Routes>
      </div>
    </div>
  ) : (
    <div className={styles.auth}>
      <Routes>
        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        {AUTH_ROUTES?.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default RoleRoutes;
