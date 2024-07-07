import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

interface HomeButtonProps {
  
}

export const HomeButton: FC<HomeButtonProps> = () => {
  const navigate = useNavigate();

  const handleOnClick = () =>{
    navigate("/");
  }

    return (
        <button onClick={handleOnClick}>Home</button>
    );
}
