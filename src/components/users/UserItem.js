import classes from "./UserItem.module.css";

function UserItem({ user }) {
  return (
    <>
      <div className={classes.userItemInfoContainer}>
        <div className={classes.userItemSeparator}>
          <h3>Дані користуввача</h3>
          <table className={classes.userItemTable}>
            <tbody>
              <tr>
                <td>
                  <b>Ім'я</b>
                </td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>
                  <b>Прізвище</b>
                </td>
                <td>{user.surname}</td>
              </tr>
              <tr>
                <td>
                  <b>Email</b>
                </td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>Ролі користувача</h3>
          <ul className={classes.userItemUl}>
            {user.roles.map((role) => (
              <li key={role} className={classes.usersLi}>
                <b>{role}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={classes.userItemButtonBlock}></div>
    </>
  );
}

export default UserItem;
