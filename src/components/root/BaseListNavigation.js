import { NavLink } from "react-router-dom";

import classes from "./BaseListNavigation.module.css";

function BaseListNavigations({ baseRoute, baseName }) {
  return (
    <header className={classes.baseNavigationHeader}>
      <nav>
        <ul className={classes.baseNavigationList}>
          <li>
            <NavLink
              to={`/${baseRoute}`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All {baseName}s
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${baseRoute}/new`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New {baseName}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default BaseListNavigations;
