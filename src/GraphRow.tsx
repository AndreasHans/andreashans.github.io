import React from "react";
import { FC } from "react";
import { GraphCell } from "./GraphCell";
import { CellSelectionType } from "./CellSelectionType";


interface GraphRowProps {
    ri: number;
    cols: number;
    selectedRows: CellSelectionType[];
    handleCellClick: (ri: number,ci: number) => void;

};

export const GraphRow: FC<GraphRowProps> = (props) => {

    const cols: number[] = [...Array(props.cols).keys()];

    return (
        <tr className="graphRow">
            {cols.map((j) => <GraphCell key={j} ri={props.ri} ci={j} handleCellClick={props.handleCellClick} selected={props.selectedRows[j]}  />)}
        </tr>


    );


}