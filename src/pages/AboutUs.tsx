<<<<<<< HEAD
import React from 'react'

const AboutUs = () => {
  return (
    <div>AboutUs</div>
  )
}

export default AboutUs
=======
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
  },[]);
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
          Unser Team setzte sich aus einem Backend-Team von vier Personen und
          einem Frontend-Team von fünf Personen zusammen. Für die
          Backend-Entwicklung kamen Technologien wie Java, Spring Boot, Maven,
          MySQL, REST API, externe APIs, Spring Security, JUnit, Mockito und
          MockitoMVC zum Einsatz. Das Frontend-Team nutzte moderne Technologien
          wie React, TypeScript und Redux, um eine ansprechende und
          leistungsfähige Benutzeroberfläche zu schaffen. Die Versionierung und
          das Projektmanagement wurden dabei durch die Nutzung von Git
          unterstützt.
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
        <h3 className="modalComponentTitle">Unser Team</h3>
        <div className="row">
          {members?.team.map((item) => (
            <div className="col-md-6 col-lg-3">
              <div className="d-flex justify-content-around aboutMargin">
                <Card data-bs-theme="dark" style={{ width: "15rem" }}>
                  <Card.Img variant="top" src={item.photoUrl} />
                  <Card.Body className="textCenter">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <h6>{item.role}</h6>
                      <p style={{height:"72px"}}>{item.description}</p>
                      <Link to={item.url}>member page</Link>
                    </Card.Text>
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
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db
