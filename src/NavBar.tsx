import React, { FC } from "react";

interface NavBarProps {
  
}

export const NavBar: FC<NavBarProps> = () => {

    return (
        <div>
            <h1 className = "title">Homepage</h1>


            <ul>
                <li>
                    <a href="recipe.html">
                        <button className="homebutton"> Recipe</button>
                    </a>
                </li>


                <li>
                    <a href="contact.html">
                        <button className="homebutton"> Contact</button>
                    </a>
                </li>


                <li>
                    <a href="rps.html">
                        <button className="homebutton"> RPS</button>
                    </a>
                </li>


                <li>
                    <a href="sketch.html">
                        <button className="homebutton"> Sketch</button>
                    </a>
                </li>


                <li>
                    <a href="calculator.html">
                        <button className="homebutton"> Calculator</button>
                    </a>
                </li>

            
                <li>
                    <a href="#/calculator2">
                        <button className="homebutton"> Calculator2</button>
                    </a>
                    
                </li>

                
                <li>
                    <a href="#/graph">
                        <button className="homebutton"> Graph</button>
                    </a>
                </li>

                <li>
                    <a href="#/tableapp">
                        <button className="homebutton"> Table App</button>
                    </a>
                </li>

            </ul>
        </div>
    );

}

export default NavBar;