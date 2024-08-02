import React, { FC } from "react";
import "./Toolbar.css";

interface ToolbarProps {
  handleExportClick: () => void;
  handleAddRowClick: () => void;
  handleClearTableClick: () => void;
  handleSaveDataClick: () => void;
  handleUndoChangesClick: () => void;
  handleDeleteSelectedClick: () => void;
  isChanged: boolean;
  anySelected: boolean;
};

export const Toolbar: FC<ToolbarProps> = ({
    handleExportClick,
    handleAddRowClick,
    handleClearTableClick,
    handleSaveDataClick,
    handleUndoChangesClick,
    handleDeleteSelectedClick,
    isChanged,
    anySelected,
}) => {

  return (
    <div className="toolbar-wrapper">

        <input type="file" id="import-button" ></input>

        <label htmlFor="import-button" className="toolbar-button" > Import </label>

        <button className="toolbar-button" onClick={handleExportClick}> Export </button>
        <button className="toolbar-button" onClick={handleAddRowClick}> Add row </button>
        <button className="toolbar-button" onClick={handleClearTableClick}>Clear table</button>
        <button className="toolbar-button" onClick={handleDeleteSelectedClick} disabled={!anySelected}>Delete selected</button>
        <button className="toolbar-button" onClick={handleUndoChangesClick} disabled={isChanged}>Undo changes</button>
        <button className="toolbar-button" onClick={handleSaveDataClick} disabled={isChanged}>Save</button>
    </div>
  )
}