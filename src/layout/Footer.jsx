import { menuItems } from '../../config/menuConfig.ts';
import { uid } from "uid"

const Footer = () => {
    const current = 0;
    return (
        <>
            <div className="fBlock">
                <div className="fTopBlock">
                    <div className="container">
                        <ul className="buttonMenu">
                            {menuItems.map((item, index) =>
                                <li key={uid()}>
                                    <a className={current === index ? 'mActive footerA' : "footerA"}
                                        href="">{item}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="fInfo">
                    <div className="container">
                        <h5>EMail@gmail.com</h5>
                        <span>Fotos und Artikeltitel stammen von tagesschau.de. Die Vorlage wurde für nichtkommerzielle Zwecke entwickelt, um das Programmieren mit React zu studieren.</span>
                    </div>
                </div>
            </div>
            <div className="button">
                <h3>Bundesland Blog</h3>
                <span>© {new Date().getFullYear()}</span>
            </div>
        </>
    )
}

export default Footer