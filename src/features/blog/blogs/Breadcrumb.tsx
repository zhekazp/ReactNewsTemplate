import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './blogsStyles/breadcrumb.css';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);


return (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return index === pathnames.length - 1 ? (
          <li key={to} className="breadcrumb-item active-item" aria-current="page">
            {value}
          </li>
        ) : (
          <li key={to} className="breadcrumb-item">
            <Link to={to}>{value}</Link>
          </li>
        );
      })}
    </ol>
  </nav>
);
};

export default Breadcrumb;