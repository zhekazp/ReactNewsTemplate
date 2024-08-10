import React from 'react';
import Gewinn from '../components/Gewinn/Gewinn.tsx'; // Убедитесь, что путь корректен

function Gewinnen() {
  return (
    <div>
	<main>
	<div className="container mainBlock textColorMain textCenter">
	
     <p> <h2>Hier könnte Ihre Werbung sein!</h2></p>
	  <p><h4>Um Ihre Werbung auf dieser Seite zu platzieren, wenden Sie sich bitte&nbsp; 
	  <a style={{ color: 'red' }} href="/#/contact">hierhin!</a> </h4></p>
	  <p><h7>Um einen Rabatt zu erhalten, drücken Sie auf den Knopf.</h7></p>
      <Gewinn />
	  </div>
	  </main>
    </div>
  );
}

export default Gewinnen;
