import React, { FC } from "react";
import { TableDataCell } from "./TableDataCell";
import "./TableRow.css";

interface TableRowProps {
    data: string[][];
    setData: (newData:string[][]) => void;
    row: number;
    toggleSelectRow: (row:number) => void;
    checked: boolean;
    hide?: boolean;
    disabledIndices?: number[];
}

export const TableRow: FC<TableRowProps> = ({
    data,
    row,
    setData,
    toggleSelectRow,
    checked,
    hide,
    disabledIndices,
}) => {

    const setValue = (newValue: string, row: number, col: number) => {
        let newData = [...data];
        newData[row][col] = newValue;
        setData(newData);
    }

    const deleteRow = () => {
        setData(data.filter((_,i) => i !== row));
    }

    const className = hide ? "tr-hide": "";

    return (
        <tr className={className}>
            <td>
                <input onChange={() => toggleSelectRow(row)} className="checkbox" type="checkbox" checked={checked}>
                </input>

            </td>


            {data[row].map((value,index) => <TableDataCell key={index} value={value} row={row} col={index} setValue={setValue} disabled={disabledIndices && disabledIndices.includes(index)}/>)}

            <td>
                <button onClick={deleteRow}>
                    Del
                </button>
            </td>
        </tr>
    );
}