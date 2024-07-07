import React from "react";
import { FC } from "react";
import { GraphRow } from "./GraphRow";

import "./Graph.css";
import { CellSelectionType } from "./CellSelectionType";

interface GraphProps {
    rows: number;
    cols: number;
    handleCellClick: (ri: number,ci: number) => void;
    selected: CellSelectionType[][];
};


export const Graph: FC<GraphProps> = (props) => {


    const rows: number[] = [...Array(props.rows).keys()];

    return (
        <div className="graphCenter">

            <table className="graph">
                <tbody>
                    {rows.map((ri) => <GraphRow key={ri} ri={ri} cols={props.cols} handleCellClick={props.handleCellClick} selectedRows={props.selected[ri]} />)}
                </tbody>
            </table>
        </div>
    );
}