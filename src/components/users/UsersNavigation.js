import { NavLink } from "react-router-dom";

import classes from "../root/BaseListNavigation.module.css";

function UserNavigations() {
  return (
    <header className={classes.baseNavigationHeader}>
      <nav>
        <ul className={classes.baseNavigationList}>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New User
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default UserNavigations;
