import React, { FC } from "react";
import "./Dropdown.css";

interface DropdownProps {
    onChange: (e) => void;
    options: string[];
}

export const Dropdown: FC<DropdownProps> = ({
    onChange,
    options
}) => {


    return (
        <select className="dropdown" onChange={onChange}>
            {options.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
    );
}