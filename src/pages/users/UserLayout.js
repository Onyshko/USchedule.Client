import { Outlet } from "react-router-dom";

import UserNavigations from "../../components/users/UsersNavigation";

function UserLayout() {
  return (
    <>
      <UserNavigations />
      <Outlet />
    </>
  );
}

export default UserLayout;
