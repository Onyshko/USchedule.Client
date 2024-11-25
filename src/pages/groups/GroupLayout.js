import { Outlet } from "react-router-dom";
import BaseListNavigations from "../../components/root/BaseListNavigation";

function GroupLayout() {
  return (
    <>
      <BaseListNavigations baseRoute="groups" baseName="Group" />
      <Outlet />
    </>
  );
}

export default GroupLayout;
