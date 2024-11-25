import { Outlet } from "react-router-dom";
import BaseListNavigations from "../../components/root/BaseListNavigation";

function StudentGroupLayout() {
  return (
    <>
      <BaseListNavigations baseRoute="studentgroups" baseName="Student Group" />
      <Outlet />
    </>
  );
}

export default StudentGroupLayout;
