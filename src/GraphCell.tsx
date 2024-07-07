import React from "react";
import { FC } from "react";

import "./GraphCell.css";
import { CellSelectionType } from "./CellSelectionType";


interface GraphCellProps {
    ri: number;
    ci: number;
    selected: CellSelectionType;
    handleCellClick: (ri: number,ci: number) => void;
};

export const GraphCell: FC<GraphCellProps> = (props) => {

    const { ri, ci, selected, handleCellClick } = props;

    const onClick = () => {
        handleCellClick(ri,ci);
    }

    const handleMouseOver = (e) => {
        if(e.shiftKey){
            handleCellClick(ri,ci);
        }
    }

    const getClass = () => {
        return "graphCell " + getCellSelectionClass();
    }

    const getCellSelectionClass = () => {
        switch (selected){
            case CellSelectionType.NOT_SELECTED: return "graphCellNotSelected";
            case CellSelectionType.BLOCKED: return "graphCellBlocked";
            case CellSelectionType.START: return "graphCellStart";
            case CellSelectionType.FINISH: return "graphCellFinish";
            case CellSelectionType.PATH: return "graphCellPath";
        }
    }

    return (
        <td className={getClass()} onClick={onClick} onMouseOver={handleMouseOver} />
);


}