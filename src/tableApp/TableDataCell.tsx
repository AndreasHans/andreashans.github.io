import React, { FC } from "react";
import "./TableDataCell.css";
import { Textfield } from "./Textfield";
import { Dropdown } from "./Dropdown";

interface TableDataCellProps {
    value: string;
    row: number;
    col: number;
    setValue: (newValue: string, row: number, col: number) => void;
    disabled?: boolean;
}

export const TableDataCell: FC<TableDataCellProps> = ({
    value,
    setValue,
    row,
    col,
    disabled,
}) => {

    const handleChange = (e) => {
        setValue(e.target.value, row, col);
    }

    const disabledClass = disabled ? "table-data-cell-disabled": "";

    return (
        <td className={"table-data-cell " + disabledClass}>
            {
                col !== 2 ?
                <Textfield value={value} handleChange={handleChange} disabled={disabled}/>
                :
                <Dropdown onChange={handleChange} options={["Danish", "English", "Spanish"]}/>


            }

            
        </td>
    );
}