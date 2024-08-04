import React from "react";
import { uid } from "uid";
import { menuItems } from "../config/menuConfig.js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store.js";
import { topSlice } from "../layout/header/topElSlice";
import { Link } from "react-router-dom";
const Footer = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: RootState) => state.top);
  const handleClick = (index: number) => {
    dispatch(topSlice.actions.setCurrentPage(index));
  };

  return (
    <div>
      <div className="fBlock">
        <div className="fTopBlock">
          <div className="container">
            <ul className="buttonMenu">
              {menuItems.map((item, index) => (
                <li key={uid()}>
                  <Link to={item.path}>
                    <span
                      className={
                        currentPage === index ? "mActive footerA" : "footerA"
                      }
                      onClick={() => handleClick(index)}
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="fInfo">
          <div className="container">
            <h5>BLB@gmail.com</h5>
            <span>
              Fotos und Artikeltitel stammen von tagesschau.de. Die Vorlage
              wurde für nichtkommerzielle Zwecke entwickelt, um das
              Programmieren mit React zu studieren.
            </span>
          </div>
        </div>
      </div>
      <div className="button">
        <h3>Bundesland Blog</h3>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Footer;
