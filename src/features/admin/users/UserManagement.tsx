import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { fetchUsers, blockUser, upgradeUser } from "./userSlice";

const UserManagement: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlockUser = (userId: number) => {
    dispatch(blockUser(userId));
  };

  const handleUpgradeUser = (userId: number) => {
    dispatch(upgradeUser(userId));
  };

  return (
    <div className="user-management">
      <h2>Управление пользователями</h2>
      <input type="text" placeholder="Поиск пользователя..." />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleBlockUser(user.id)}>
              Заблокировать
            </button>
            <button onClick={() => handleUpgradeUser(user.id)}>
              Сделать администратором
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;


// const users = [
//   {id: 1, email: 'Alex@email.com', role:'user'},
//   {id: 2, email: 'Kate@email.com', role:'admin'},
//   {id: 3, email: 'Dennis@email.com', role:'user'},
// ]

// const UserManagement: FC = () => {

//   return (
//     <div>
//       <h2>Управление Пользователями</h2>
//       <input type="text" placeholder="Поиск пользователя" />

//       <ul className="user__list">
//         {users.map((user) => (
//           <li className="user__item">
//             <div className="user__email">{user.email}</div>
//             <div className="user__role">{user.role}</div>
//             <button type="button">Make admin</button>
//             <button type="button">Block user</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserManagement;

// const UserItem = ({ user }) => (
//   <li className="user__item">
//             <div className="user__email">{user.email}</div>
//             <div className="user__role">{user.role}</div>
//             <button type="button">Make admin</button>
//             <button type="button">Block user</button>
//           </li>
// )

// const UsersList = ({users}) => (
//   <ul className="user__list">
//     {users.map((user) => <UserItem user={user} />)}
//       </ul>

// )