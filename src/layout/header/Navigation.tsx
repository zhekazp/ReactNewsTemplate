import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { uid } from 'uid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { topSlice } from "../../layout/header/topElSlice";
import { menuItems } from '../../config/menuConfig.ts';


const Navigation = () => {
  const dispatch = useDispatch();
  const {currentPage} = useSelector((state:RootState) => state.top);
  const handleClick = (index: number) => {
      dispatch(topSlice.actions.setCurrentPage(index));
  };

  return (
    <>
      <Navbar sticky="top" expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <a  className='logo' href="/">
            <h3>B L B</h3>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
             {menuItems.map((item, index)=> 
            <Nav.Link key={uid()}
            as={Link}
                to={item.path}
                className={currentPage === index ? 'mActive' : ''}
                onClick={() => handleClick(index)}>{item.title}</Nav.Link>
            )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
    </>
  )
}

export default Navigation