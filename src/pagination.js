import React from "react";

export default function Pagination(props) {
    const {changePage, goToPreviousPage, goToNextPage, pageNumbers, currentPage} = props;

    return (
        <div className='pagination'>
            <button className="page-change-buttons" disabled={currentPage === 1} onClick={goToPreviousPage}>Prev</button>

            {pageNumbers?.map((number) =>
                <button key={number} onClick={() => changePage(number)} className={currentPage === number? 'page-num active-page':'page-num'}>
                    {number}
                </button>
            )}

            <button className="page-change-buttons" disabled={currentPage === pageNumbers.length} onClick={goToNextPage}>Next</button>
        </div>
    )
}