import React from 'react'
import { uid } from 'uid'
import { menu } from "../util/elements.jsx";
import Nav from 'react-bootstrap/Nav';
import { menuItems } from '../config/menuConfig.js';


const Footer = () => {
const current=0;
  return (
    <div>
    <div className="fBlock">
        <div className="fTopBlock">
            <div className="container">
                <ul className="buttonMenu">
                    {menuItems.map((item, index) =>
                        <li key={uid()}>
                            <a className={current === index ? 'mActive footerA' : "footerA"}
                                href="">{item.title}</a>
                        </li>
                    )}
                </ul>
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
