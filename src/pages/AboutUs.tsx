import React, { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import Advertisement from "./Advertisement";
import BlogPage from "./BlogPage";
import News from "./News";

const AboutUs: FC = () => {
  return (
   
      <div>
        <h1>Über uns</h1>
        <p>
          Willkommen auf unserer Website! Wir sind eine Plattform, die Ihnen
          aktuelle Nachrichten aus den verschiedenen Bundesländern liefert sowie
          einen Blog und Anzeigen für die Vermietung von Gegenständen und
          Technologie. Unser Ziel ist es, Sie über die neuesten Entwicklungen in
          den Bundesländern auf dem Laufenden zu halten. Von politischen
          Ereignissen über wirtschaftliche Entwicklungen bis hin zu kulturellen
          Veranstaltungen bieten wir Ihnen umfassende Informationen aus den
          einzelnen Regionen Deutschlands. Unser Blog ist der Ort, an dem wir
          über verschiedene Themen schreiben. Von Reisetipps und lokalen
          Veranstaltungen bis hin zu Lifestyle-Tipps und Experteninterviews
          finden Sie hier inspirierende und informative Inhalte. Zusätzlich zu
          den Nachrichten und dem Blog bieten wir auch eine Rubrik für die
          Vermietung von Gegenständen und Technologie. Wenn Sie beispielsweise
          kurzfristig eine Kamera, ein Musikinstrument oder andere technische
          Geräte benötigen, finden Sie bei uns die Möglichkeit zur Miete. Unsere
          Anzeigen sind von vertrauenswürdigen Anbietern, die qualitativ
          hochwertige Produkte und einen zuverlässigen Service bieten.
        </p>
        <p>
          Wir hoffen, dass Sie unsere Website genießen und von unseren Inhalten
          profitieren. Wenn Sie Fragen haben oder weitere Informationen
          benötigen, stehen wir Ihnen gerne zur{" "}
          <Link to="/contact">Verfügung</Link>. Vielen Dank, dass Sie uns
          besuchen!
        </p>
      </div>
      
    
  );
};

export default AboutUs;
