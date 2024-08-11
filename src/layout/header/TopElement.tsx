import React, { FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import RunLine from "./Runline";
import { RootState } from "../../store.ts";
import { useDispatch, useSelector } from "react-redux";
import { topSlice } from "../../layout/header/topElSlice";
import { Link } from "react-router-dom";

const TopElement: FC = () => {
  const { currentPage, user } = useSelector((state: RootState) => state.top);
  const dispatch = useDispatch();
  
  useEffect(() => {
   
    dispatch(
      topSlice.actions.setUserData({
        useRole:  localStorage.getItem('role') === "ROLE_ADMIN",
        authorized: localStorage.getItem('token') !== "" && localStorage.getItem('token') !== undefined &&
        localStorage.getItem('token') !== null,
      })
    );
  },[])
  const logout = () => {
    dispatch(topSlice.actions.setUserData({ useRole: false, 
      authorized: false}));
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    }
  return (
    <div className="topBlock">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="left-content">
            <div className="topText">
              {currentPage === 0 ? (
                <>
                  <span className="topTitle">Aktuelles</span>
                  <RunLine />
                </>
              ) : (
                <>
                  <span className="topTitle notMain">Bundesland Blog</span>
                </>
              )}
            </div>
          </div>
          <div className="right-content d-flex align-self-center">
            <span>
              <span className="login">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>
              {user.authorized ? (
                <>
                  {user.useRole ? (
                    <>
                      <span className="loginButton">Admin Panel</span>
                      <span> / </span>
                    </>
                  ) : (
                    <></>
                  )}
                  <span onClick={()=>logout()} className="loginButton">
                    {" "}
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <span className="loginButton">Login </span>
                  </Link>
                      /
                  <Link to="/signup">
                    <span className="loginButton"> Registration</span>
                  </Link>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopElement;