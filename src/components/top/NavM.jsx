import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { menu } from '../../util/elements,jsx';
import { uid } from 'uid';


function NavM() {
  const current=0;
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
             {menu.map((item, index)=> 
            <Nav.Link key={uid()}  
            className={current === index? 'mActive': ""}>{item}</Nav.Link>
            )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
    </>
  );
}

export default NavM;