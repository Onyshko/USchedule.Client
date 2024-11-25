import { Link } from "react-router-dom";

import classes from "../root/BaseList.module.css";

function UserList({ baseList }) {
  return (
    <div className={classes.baseListContainer}>
      <table className={classes.baseListTable}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {baseList.map((elem) => (
            <tr className={classes.baseListTr} key={elem.id}>
              <td>{elem.name}</td>
              <td>{elem.surname}</td>
              <td>{elem.email}</td>
              <td>
                <Link to={elem.id}>details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
