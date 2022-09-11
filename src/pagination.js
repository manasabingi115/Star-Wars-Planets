import React from "react";

export default function Pagination({ filteredData, dataLimit }) {
    const [pages] = React.useState(Math.round(filteredData?.length / dataLimit));
    const [currentPage, setCurrentPage] = React.useState();
    const pageNumbers = [];

    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    console.log(currentPage);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return filteredData.slice(startIndex, endIndex);
    };


    return (
        <div className='pagination'>
            <button className="page-change-buttons">Prev</button>

            <p className='page-num'>
                1
            </p>
            <p className='page-num'>
                2
            </p>

            {pageNumbers?.map((number) =>
                <p key={number} onClick={() => changePage(number)} className='page-num'>
                    {number}
                </p>
            )}

            <button className="page-change-buttons">Next</button>
        </div>
    )
}