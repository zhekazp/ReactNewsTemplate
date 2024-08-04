import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { uid } from 'uid';
import { Link } from 'react-router-dom';


const menuItems = [
  { title: 'Nachrichten', path: '/news' },
  // { title: 'Chat', path: '/chat' },
  { title: 'Blogs', path: '/blogs' },
  { title: 'Anzeige', path: '/advertisement' },
  { title: 'Gewinnen', path: '/gewinner' },
  { title: 'Über uns', path: '/about' },
  { title: 'Contact', path: '/contact' },
];


const Navigation = () => {
  const [activeLink, setActiveLink] = useState<number>(0);

  useEffect(() => {
    // Извлекаем индекс активной ссылки из локального хранилища при монтировании компонента
    const storedActiveLink = localStorage.getItem('activeLink');
    if (storedActiveLink !== null) {
      setActiveLink(parseInt(storedActiveLink, 10));
    }
  }, []);

  const handleNavClick = (index: number) => {
    // Сохраняем индекс активной ссылки в локальное хранилище
    localStorage.setItem('activeLink', index.toString());
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
            <Nav.Link key={uid()}
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