import React, { useEffect, useState } from "react";
import ModalComponent from "../features/mainPage/components/modal/ModalComponent";
const Restore = () => {
   const [show, setShow] = useState(true);
    return (
      <>
   <ModalComponent  show={show}
             title="Error"
             content="Some Error"
             buttonContent="ok"
             danger = {true}
             onClose={()=>setShow(false)}
             />
      </>
    );
  };
  export default Restore;