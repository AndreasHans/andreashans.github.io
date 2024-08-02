import React, { FC, useState } from "react";
import { TableRow } from "./TableRow";
import "./Table.css";
import { Paginator } from "./Paginator";
import { Textfield } from "./Textfield";

interface TableProps {
    headers: string[];
    data: string[][];
    setData: (newData: string[][]) => void;
    paginator?: boolean;
    toggleSelectRow: (row:number)=> void;
    selectedIndexes: number[];
    readOnlyColumns?: number[];
}



export const Table: FC<TableProps> = ({
    headers,
    data,
    setData,
    paginator,
    toggleSelectRow,
    selectedIndexes,
    readOnlyColumns,
}) => {

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
    const [searchValues, setSearchValues] = useState<string[]>(headers.map(_ => ""));

    const pageSize = 10;


    const getRowsToShow = () => {
        const rowContainsFilterValues = (rowIndex: number): boolean => {
            return data[rowIndex].every((value,i) => value.startsWith(searchValues[i]));
        }

        const rowsContainingFilters = data.map((_,i) => rowContainsFilterValues(i) ? i : null).filter(e => e != null);

        if(!paginator){
            return rowsContainingFilters;
        }

        return rowsContainingFilters.filter((_,i) => currentPageNumber*pageSize <= i && i < (currentPageNumber+1)*pageSize);
    }

    const rowsToShow = getRowsToShow();

    const maxPageNumber = Math.max(Math.ceil(data.length / pageSize)-1,0);



    const handleSearchValueChange = (i:number) => (e:any) => {
        let newSearchValues = [...searchValues];
        newSearchValues[i] = e.target.value;
        setSearchValues(newSearchValues);
        setCurrentPageNumber(0);
    }

    const clearSearchValues = () => {
        const newSearchValues = headers.map(_ => "");
        setSearchValues(newSearchValues);
    }

    return (

        <div>
            <div className="table-wrapper">
                <table >
                    <thead className="table-head">
                        <tr >
                            <th className="checkbox-column"></th>

                            {headers.map(header => <th className="table-header" key={header}>{header}</th>)}

                            <th className="delete-column"></th>
                        </tr>

                        <tr>
                            <th></th>

                            {searchValues.map((value,i) => <th className="table-header table-header-search" key={i}> <Textfield placeholder="search" value={value} handleChange={handleSearchValueChange(i)}/> </th>)}

                            <th>
                                <button onClick={clearSearchValues}>Cls</button>
                            </th>
                        </tr>

                    </thead>


                    <tbody>
                        <tr className="empty-space"><td><div className="empty-space"/></td></tr>
                        {data.map((_rowData,index) => <TableRow key={index} row={index} data={data} setData={setData}  toggleSelectRow={toggleSelectRow} checked={selectedIndexes.includes(index)} hide={!rowsToShow.includes(index)} disabledIndices={readOnlyColumns}/> )}
                        <tr></tr>
                    </tbody>
                </table>
            </div>
            


            {paginator && <Paginator pageNumber={currentPageNumber} setPageNumber={setCurrentPageNumber} maxPageNumber={maxPageNumber}/> }
        </div>
    );
}