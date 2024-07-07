import React, { FC } from "react";
import { HomeButton } from "./HomeButton";

interface Calculator2Props {
  
}

export const Calculator2: FC<Calculator2Props> = () => {

  return (
    <div className="calculator2">
        <HomeButton/>
        <div>calculator 2</div>
    </div>
  );
}
