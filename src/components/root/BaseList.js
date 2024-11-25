import { Link } from "react-router-dom";

import classes from "./BaseList.module.css";

function BaseList({ baseList }) {
  return (
    <div className={classes.baseListContainer}>
      <table className={classes.baseListTable}>
        <thead>
          <tr>
            <th>Назва</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {baseList.map((elem) => (
            <tr className={classes.baseListTr} key={elem.id}>
              <td>{elem.name}</td>
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

export default BaseList;
