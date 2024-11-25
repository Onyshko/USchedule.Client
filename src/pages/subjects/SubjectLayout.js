import { Outlet } from "react-router-dom";
import BaseListNavigations from "../../components/root/BaseListNavigation";

function SubjectLayout() {
  return (
    <>
      <BaseListNavigations baseRoute="subjects" baseName="Subject" />
      <Outlet />
    </>
  );
}

export default SubjectLayout;
