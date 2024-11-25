import { Outlet } from "react-router-dom";
import BaseListNavigations from "../../components/root/BaseListNavigation";

function TeacherSubjectGroupLayout() {
  return (
    <>
      <BaseListNavigations
        baseRoute="teachersubjectgroups"
        baseName="Teacher Subject Group"
      />
      <Outlet />
    </>
  );
}

export default TeacherSubjectGroupLayout;
