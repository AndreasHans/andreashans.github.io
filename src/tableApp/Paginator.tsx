import React, { FC } from "react";
import "./Paginator.css";

interface PaginatorProps {
    pageNumber: number;
    maxPageNumber: number;
    setPageNumber: (newPageNumber: number) => void;
}

export const Paginator: FC<PaginatorProps> = ({
    pageNumber,
    setPageNumber,
    maxPageNumber,
}) => {

    const handleNextPageClick = () => {
        const newPageNumber = Math.min(pageNumber+1,maxPageNumber);
        setPageNumber(newPageNumber);
    }

    const handlePreviousPageClick = () => {
        const newPageNumber = Math.max(0,pageNumber-1);
        setPageNumber(newPageNumber);
    }

    const handleFirstPageClick = () => {
        setPageNumber(0);
    }

    const handleLastPageClick = () => {
        setPageNumber(maxPageNumber);
    }


    return (

        <div className="paginator">
            <button className="paginator-button" onClick={handleFirstPageClick}> First page</button>
            <button className="paginator-button" onClick={handlePreviousPageClick}> Prev page</button>
            <div className="paginator-currentpage">page {pageNumber}</div>
            <button className="paginator-button" onClick={handleNextPageClick}> Next page</button>
            <button className="paginator-button" onClick={handleLastPageClick}> Last page</button>

        </div>

    );
}