import React, { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminPanel: FC = () => {
  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <ul>
          <li><NavLink to="users">Пользователи</NavLink></li>
          <li><NavLink to="news">Новости</NavLink></li>
          <li><NavLink to="blogs">Блоги</NavLink></li>
          <li><NavLink to="ads">Объявления</NavLink></li>
        </ul>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
