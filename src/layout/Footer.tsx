import React from 'react'
import { uid } from 'uid'
import { menu } from "../util/elements.jsx";
import Nav from 'react-bootstrap/Nav';
import { menuItems } from '../config/menuConfig.js';
import Navigation from './header/Navigation.js';


const Footer = () => {
const current=0;
  return (
    <div>
    <div className="fBlock">
        <div className="fTopBlock">
            <div className="container">
                <Navigation />
            </div>
        </div>
        <div className="fInfo">
            <div className="container">
                <h5>BLB@gmail.com</h5>
                <span>Fotos und Artikeltitel stammen von tagesschau.de. Die Vorlage wurde für nichtkommerzielle Zwecke entwickelt, um das Programmieren mit React zu studieren.</span>
            </div>
        </div>
    </div>
    <div className="button">
        <h3>Bundesland Blog</h3>
        <span>© {new Date().getFullYear()}</span>
    </div>
</div>
  )
}

export default Footer
