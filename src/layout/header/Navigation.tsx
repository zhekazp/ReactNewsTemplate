import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { uid } from 'uid';
import { menuItems } from '../../config/menuConfig.ts';
import { Link } from 'react-router-dom';


const Navigation = () => {
  const [activeLink, setActiveLink] = useState<number>(0);

  const handleNavClick = (index: number) => {
    setActiveLink(index);
  };
  return (
    <>
      <Navbar sticky="top" expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <a  className='logo' href="#">
            <h3>B L B</h3>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
             {menuItems.map((item, index)=> 
            <Nav.Link key={index}  
            as={Link}
                to={item.path}
                className={activeLink === index ? 'mActive' : ''}
                onClick={() => handleNavClick(index)}>{item.title}</Nav.Link>
            )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
    </>
  )
}

export default Navigation