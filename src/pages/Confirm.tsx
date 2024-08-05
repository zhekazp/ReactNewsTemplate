import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Spinner from "../features/mainPage/components/spinner/Spinner";
import { useNavigate } from "react-router-dom";
const Confirm = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      "/api/user/confirmation?" +
        `data=${searchParams.get("data")}
        &code=${searchParams.get("code")}`
    ).then((response) => {
      if (response.status === 200) 
        {
            console.log(response);
            
        navigate("/login");
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading ? (
        <h1>Confirmation Failed</h1>
      ) : (
        <Spinner show={loading} color="red" />
      )}
    </>
  );
};
export default Confirm;
