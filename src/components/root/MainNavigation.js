import { NavLink, useRouteLoaderData, Form } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const roles = useRouteLoaderData("root");

  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            {roles.length > 0 && (
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
            )}
            {(roles.includes("SuperAdmin") || roles.includes("Admin")) && (
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Users
                </NavLink>
              </li>
            )}
            {(roles.includes("SuperAdmin") || roles.includes("Admin")) && (
              <li>
                <NavLink
                  to="/groups"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Groups
                </NavLink>
              </li>
            )}
            {(roles.includes("SuperAdmin") || roles.includes("Admin")) && (
              <li>
                <NavLink
                  to="/subjects"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Subjects
                </NavLink>
              </li>
            )}
            {(roles.includes("SuperAdmin") || roles.includes("Admin")) && (
              <li>
                <NavLink
                  to="/studentgroups"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Student Groups
                </NavLink>
              </li>
            )}
            {(roles.includes("SuperAdmin") || roles.includes("Admin")) && (
              <li>
                <NavLink
                  to="/teachersubjectgroups"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Teacher Subject Groups
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <Form action="/logout" method="post">
          <button className={classes.logoutButton}>Log out</button>
        </Form>
      </header>
    </>
  );
}

export default MainNavigation;
