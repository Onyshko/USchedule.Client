import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import HomePage, { loader as homePageLoader } from "./pages/root/Home";
import ErrorPage from "./pages/root/Error";
import RootLayout from "./pages/root/Root";
import UsersPage, { loader as usersLoader } from "./pages/users/Users";
import AuthenticationPage, {
  action as authAction,
} from "./pages/root/Authentication";
import UserLayout from "./pages/users/UserLayout";
import UserDetails, {
  loader as userDetailsLoader,
} from "./pages/users/UserDetails";
import NewUserPage, { loader as newUserLoader } from "./pages/users/NewUser";
import { action as userFormAction } from "./components/users/UserForm";
import EmailConfirmation, {
  action as emailConfirmationAction,
} from "./pages/users/EmailConfirmation";
import { userRolesLoader } from "./util/auth";
import { action as logout } from "./pages/root/LogOut";
import GroupLayout from "./pages/groups/GroupLayout";
import GroupsPage, { loader as groupsLoader } from "./pages/groups/Groups";
import GroupDetail, {
  loader as groupDetailsLoader,
} from "./pages/groups/GroupDetails";
import NewGroupPage from "./pages/groups/NewGroup";
import { action as itemFormAction } from "./components/root/BaseForm";
import SubjectLayout from "./pages/subjects/SubjectLayout";
import SubjectsPage, {
  loader as subjectsLoader,
} from "./pages/subjects/Subjects";
import NewSubjectPage from "./pages/subjects/NewSubject";
import SubjectDetail, {
  loader as subjectDetailsLoader,
} from "./pages/subjects/SubjectDetail";
import StudentGroupLayout from "./pages/studentgroup/StudentGroupLayout";
import StudentGroupsPage, {
  loader as studentGroupsLoader,
} from "./pages/studentgroup/StudentGroups";
import NewStudentGroupPage, {
  loader as newStudentGroupLoader,
} from "./pages/studentgroup/NewStudentGroup";
import { action as studentGroupFormAction } from "./components/root/BaseSelectorForm";
import StudentGroupDetail, {
  loader as studentGroupDetailsLoader,
} from "./pages/studentgroup/StudentGroupDetails";
import TeacherSubjectGroupLayout from "./pages/teachersubjectgroup/TeacherSubjectGroupLayout";
import TeacherSubjectGroupsPage, {
  loader as teacherSubjectGroupLoader,
} from "./pages/teachersubjectgroup/TeacherSubjectGroups";
import NewTeacherSubjectGroupPage, {
  loader as NewTeacherSubjectGroupLoader,
} from "./pages/teachersubjectgroup/NewTeacherSubjectGroup";
import TeacherSubjectGroupDetail, {
  loader as teacherSubjectGroupDetailLoader,
} from "./pages/teachersubjectgroup/TeacherSubjectGroupDetails";

const router = createBrowserRouter([
  { path: "/auth", element: <AuthenticationPage />, action: authAction },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    loader: userRolesLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage />, loader: homePageLoader },
      { path: "logout", action: logout, id: "logout" },
      {
        path: "users",
        element: <UserLayout />,
        children: [
          { index: true, element: <UsersPage />, loader: usersLoader },
          {
            path: "new",
            element: <NewUserPage />,
            loader: newUserLoader,
            action: userFormAction,
          },
          {
            path: ":userId",
            id: "user-detail",
            loader: userDetailsLoader,
            children: [
              {
                index: true,
                element: <UserDetails />,
              },
            ],
          },
          {
            path: "email-confirmation",
            element: <EmailConfirmation />,
            action: emailConfirmationAction,
          },
        ],
      },
      {
        path: "groups",
        element: <GroupLayout />,
        children: [
          { index: true, element: <GroupsPage />, loader: groupsLoader },
          {
            path: "new",
            element: <NewGroupPage />,
            action: itemFormAction,
          },
          {
            path: ":groupId",
            id: "group-detail",
            loader: groupDetailsLoader,
            children: [
              {
                index: true,
                element: <GroupDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "subjects",
        element: <SubjectLayout />,
        children: [
          { index: true, element: <SubjectsPage />, loader: subjectsLoader },
          {
            path: "new",
            element: <NewSubjectPage />,
            action: itemFormAction,
          },
          {
            path: ":subjectId",
            id: "subject-detail",
            loader: subjectDetailsLoader,
            children: [
              {
                index: true,
                element: <SubjectDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "studentgroups",
        element: <StudentGroupLayout />,
        children: [
          {
            index: true,
            element: <StudentGroupsPage />,
            loader: studentGroupsLoader,
          },
          {
            path: "new",
            element: <NewStudentGroupPage />,
            loader: newStudentGroupLoader,
            action: studentGroupFormAction,
          },
          {
            path: ":studentGroupId",
            id: "studentgroup-detail",
            loader: studentGroupDetailsLoader,
            children: [
              {
                index: true,
                element: <StudentGroupDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "teachersubjectgroups",
        element: <TeacherSubjectGroupLayout />,
        children: [
          {
            index: true,
            element: <TeacherSubjectGroupsPage />,
            loader: teacherSubjectGroupLoader,
          },
          {
            path: "new",
            element: <NewTeacherSubjectGroupPage />,
            loader: NewTeacherSubjectGroupLoader,
            action: studentGroupFormAction,
          },
          {
            path: ":teacherSubjectGroupId",
            id: "teachersubjectgroup-detail",
            loader: teacherSubjectGroupDetailLoader,
            children: [
              {
                index: true,
                element: <TeacherSubjectGroupDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
