import React, { FC } from "react";

interface NavBarProps {
  
}

export const NavBar: FC<NavBarProps> = () => {

    return (
        <div>
            <h1 className = "title">Homepage</h1>

            <a href="recipe.html">
                <button className="homebutton"> Recipe</button>
            </a>

            <a href="contact.html">
                <button className="homebutton"> Contact</button>
            </a>

            <a href="rps.html">
                <button className="homebutton"> RPS</button>
            </a>

            <a href="sketch.html">
                <button className="homebutton"> Sketch</button>
            </a>

            <a href="calculator.html">
                <button className="homebutton"> Calculator</button>
            </a>

            <a href="calculator2">
                <button className="homebutton"> Calculator2</button>
            </a>

        </div>
    );

}

export default NavBar;