import React, { useState } from "react";
import { FC } from "react";
import { Graph } from "./Graph";
import { CellSelectionType } from "./CellSelectionType";

interface GraphAppProps {
    rows: number;
    cols: number;
};


export const GraphApp: FC<GraphAppProps> = (props) => {

    const initialSelection = Array.from({ length: props.rows }, () => Array(props.cols).fill(CellSelectionType.NOT_SELECTED));

    const [selected, setSelected] = useState<CellSelectionType[][]>(initialSelection);
    const [selectionType, setSelectionType] = useState<CellSelectionType>(CellSelectionType.NOT_SELECTED);


    const removeCellType = (selected: CellSelectionType[][], type: CellSelectionType) => {
        const newSelected = [...selected];
        newSelected.forEach((row,i) =>{
            row.forEach((v,j) => {
                if(v === type){
                    newSelected[i][j] = CellSelectionType.NOT_SELECTED;
                }
            })
        } );
        return newSelected;
    }

    const handleCellClick = (ri: number,ci: number) => {
        let newSelected = [...selected];

        newSelected = removeCellType(newSelected,CellSelectionType.PATH);

        if(selected[ri][ci] === CellSelectionType.NOT_SELECTED){

            if(selectionType === CellSelectionType.START){
                newSelected = removeCellType(newSelected,CellSelectionType.START);
            }
            else if(selectionType === CellSelectionType.FINISH){
                newSelected = removeCellType(newSelected,CellSelectionType.FINISH);
            }

            newSelected[ri][ci] = selectionType;
        }
        else{
            newSelected[ri][ci] = CellSelectionType.NOT_SELECTED;
        }

        setSelected(newSelected);
    }

    const handleClearCanvasClick = () => {
        setSelected(initialSelection);
    }

    const handleSwitchSelectionType = (type: CellSelectionType) => {
        setSelectionType(type);
    }

    const handleComputeClick = () => {
        let newSelected = [...selected];
        newSelected = removeCellType(newSelected,CellSelectionType.PATH);

        newSelected[0][0] = CellSelectionType.PATH;
        newSelected[0][1] = CellSelectionType.PATH;
        newSelected[0][2] = CellSelectionType.PATH;

        setSelected(newSelected);


    }

    return (
        <div className="graphApp">
            <button onClick={handleComputeClick}>Compute</button>
            <button onClick={() => handleSwitchSelectionType(CellSelectionType.START)}>Start</button>
            <button onClick={() => handleSwitchSelectionType(CellSelectionType.FINISH)}>End</button>
            <button onClick={() => handleSwitchSelectionType(CellSelectionType.BLOCKED)}>Block</button>

            <button onClick={handleClearCanvasClick}>Clear canvas</button>

            <Graph handleCellClick={handleCellClick} selected={selected} rows={props.rows} cols={props.cols} />


        </div>
    );
}