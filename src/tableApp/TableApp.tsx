import React, { FC, useEffect, useState } from "react";
import { Table } from "./Table";
import { Toolbar } from "./Toolbar";
import { ConfirmModal } from "./ConfirmModal";
import "./TableApp.css"
import exportData from "./exportData";
import importData from "./importData";


interface TableAppProps {
  
};

export const TableApp: FC<TableAppProps> = () => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [savedData, setSavedData] = useState<string[][]>(data);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);

  const [loaded, setLoaded] = useState<boolean>(false);



  useEffect(() => {

    async function fetchMyAPI() {
      const {headers, data} = await importData();

      setHeaders(headers);
      setData(data);

      console.log(headers,data);
      setLoaded(true);
    }

    fetchMyAPI();


  }, []);

  const printData = () => {
    console.log(data);
  };

  const getNewEmptyRow = () => {
    const newRow = headers.map(_ => "");
    return newRow;
  }

  const handleAddRow = () => {
    setData([...data,getNewEmptyRow(),getNewEmptyRow(),getNewEmptyRow(),getNewEmptyRow(),getNewEmptyRow(),getNewEmptyRow(),getNewEmptyRow(),getNewEmptyRow(),getNewEmptyRow(),getNewEmptyRow()])
  }

  const clearTable = () => {
    setData([]);
  }

  const saveData = () => {
    const newSavedData = data.map(row => [...row]);
    setSavedData(newSavedData);

    exportData(data,headers);

    closeModal();
  }

  const saveDataClick = () => {
    setShowSaveModal(true);
  }

  const isChanged = () => {
    return JSON.stringify(data) === JSON.stringify(savedData);
  }

  const undoChanges = () => {
    const newData = savedData.map(row => [...row]);
    setData(newData);
  }

  const deleteSelected = () => {
    const newData = data.filter((_,i) => !selectedIndexes.includes(i));
    setData(newData);
    setSelectedIndexes([]);
  }

  const toggleSelectRow = (row: number) => {
    
    if(selectedIndexes.includes(row)){
      setSelectedIndexes(selectedIndexes.filter(e => e !== row));
    }else{
      setSelectedIndexes([row,...selectedIndexes]);
    }
  }

  const closeModal = () => {
    setShowSaveModal(false);
  }

  return loaded && (
    <div className="tableApp">
      <Toolbar 
        handleExportClick={printData} 
        handleAddRowClick={handleAddRow} 
        handleClearTableClick={clearTable} 
        handleSaveDataClick={saveDataClick} 
        handleUndoChangesClick={undoChanges}
        handleDeleteSelectedClick={deleteSelected} 
        isChanged={isChanged()}
        anySelected={selectedIndexes.length > 0}
      />

      <Table 
        headers={headers} 
        data={data} setData={setData} 
        toggleSelectRow={toggleSelectRow}
        selectedIndexes={selectedIndexes} 
        readOnlyColumns={[3]} 
        paginator 
       />

      <ConfirmModal 
        show={showSaveModal}
        text={"Confirm changes"}
        onConfirm={saveData}
        onCancel={closeModal}
      />
    </div>
  )

}