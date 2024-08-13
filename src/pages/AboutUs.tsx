import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { uid } from "uid";

const AboutUs = () => {
  interface ITeamMember {
    name: string;
    role: string;
    description: string;
    photoUrl: string;
    url: string;
  }
  interface ITeam {
    team: ITeamMember[];
  }
  const [members, setMembers] = useState<ITeam>();
  useEffect(() => {
    fetch("/api/team")
      .then((response) => response.json())
      .then((data: ITeam) => {
        setMembers(data);
      });
  }, []);
  return (
    <>
      <div className="container mainBlock textColorMain textCenter">
        <h2>Willkommen auf dem Bundesland Blog!</h2>
        <p>
          Unsere Website dient als Bildungsressource und wurde von engagierten
          Studierenden der AIT TR Supplementary Technology School Berlin, einem
          renommierten IT-Bildungsinstitut in Deutschland, erstellt.
        </p>
        <p>
          Dieses Projekt veranschaulicht eindrucksvoll die Kompetenzen, die in
          einem intensiven 7-monatigen Weiterbildungsprogramm erlernt werden
          können. Innerhalb von nur zwei Wochen hat ein Team von neun
          talentierten Mitgliedern diese Seite von Grund auf neu entwickelt.
        </p>
        <p>
          Wir laden Sie ein, die Ergebnisse unserer Arbeit zu erkunden und sich
          von den Möglichkeiten inspirieren zu lassen, die eine fundierte
          IT-Ausbildung bieten kann.
        </p>
        <p>
          Die verwendeten Fotos und Artikeltitel stammen von tagesschau.de.
          Diese Vorlage wurde für nichtkommerzielle Zwecke entwickelt, um das
          Programmieren mit React zu studieren und zu üben.
        </p>
      </div>
      <div className="container">
      <h3 className="modalComponentTitle">Unser Technologiepaket</h3>
        <div className="technology">
          <img
            src="https://www.lerned.top/imj/kurses/b1.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b2.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b3.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b4.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b5.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b6.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b7.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b8.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b9.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/b11.png"
            alt=""
            width="60px"
          />
                  
        </div>
        <div className="technology">
          <img
            src="https://www.lerned.top/imj/kurses/f1.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/f2.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/f3.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/f4.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/f5.png"
            alt=""
            width="60px"
          />
          <img
            src="https://www.lerned.top/imj/kurses/f6.png"
            alt=""
            width="60px"
          />
          
        </div>
        <h3 className="modalComponentTitle">Unser Team</h3>
        <div className="row">
          {members?.team.map((item) => (
            <div key={uid()} className="col-md-6 col-lg-3">
              <div className="d-flex justify-content-around aboutMargin">
                <Card data-bs-theme="dark" style={{ width: "15rem" }}>
                  <Card.Img variant="top" src={item.photoUrl} />
                  <Card.Body className="textCenter">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.role}</Card.Text>
                    <Card.Text style={{ height: "72px" }}>
                      {item.description}
                    </Card.Text>
                    <Link to={item.url}>member page</Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
};

export default AboutUs;
