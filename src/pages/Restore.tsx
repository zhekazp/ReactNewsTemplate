import React, { useEffect, useState } from "react";
import ModalComponent from "../features/mainPage/components/modal/ModalComponent";
import Spinner from "../features/mainPage/components/spinner/Spinner";
import { useSearchParams,  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { topSlice } from "../layout/header/topElSlice";


const Restore = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMassage] = useState<{title:string, message:string, err:boolean, url:string}>
  ({title: "Error", message:"Ihr Bestätigungscode ist beschädigt. Kontaktieren Sie unseren Administrator.",
    err:true, url:"/contact"});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(topSlice.actions.setCurrentPage(-1));
  useEffect(() => {
    fetch(
      "api/user/recover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: searchParams.get("data"),
            code:searchParams.get("code")
        }),
      }
    ).then((response) => {
      
      if (response.status === 200) {
        setMassage({title: "Antwort", message:"Ihr Passwort wurde wiederhergestellt.",
          err:false, url:"/login"});
      }
      setLoading(false);
    });
  }, []);


  return (
    <>
      {!loading ? (
        <ModalComponent
          show={true}
          title={message.title}
          content={message.message}
          buttonContent="ok"
          danger={message.err}
          onClose={() => navigate(message.url)}
        />
      ) : (
        <Spinner show={loading} color="red" />
      )}
    </>
  );

  };
  export default Restore;