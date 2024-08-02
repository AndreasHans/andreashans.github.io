import React, { FC } from "react";
import "./Textfield.css";

interface TextfieldProps {
    value: string;
    handleChange: (e) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const Textfield: FC<TextfieldProps> = ({
    value,
    handleChange,
    placeholder,
    disabled,
}) => {

    return (
            <input 
                className="text-field"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
            />
    );
}