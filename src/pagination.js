import React from "react";

export default function Pagination(props) {
    const {changePage, goToPreviousPage, goToNextPage, pageNumbers, currentPage} = props;
    // const [pages, setPages] = React.useState(0);

    // React.useEffect(() => {
    //     setPages(Math.round(filteredData?.length / dataLimit));
    // },[filteredData])
    // const [currentPage, setCurrentPage] = React.useState(1);
    // const pageNumbers = [];


    // for (let i = 1; i <= pages; i++) {
    //     pageNumbers.push(i);
    // }

    // const goToNextPage = () => {
    //     setCurrentPage((page) => page + 1);
    // }

    // const goToPreviousPage = () => {
    //     setCurrentPage((page) => page - 1);
    // }

    // const changePage = (number) => {
    //     const pageNumber = Number(number);
    //     setCurrentPage(pageNumber);
    // }

    // const getPaginatedData = () => {
    //     const startIndex = currentPage * dataLimit - dataLimit;
    //     const endIndex = startIndex + dataLimit;
    //     return filteredData.slice(startIndex, endIndex);
    // };


    return (
        <div className='pagination'>
            <button className="page-change-buttons" disabled={currentPage === 1} onClick={goToPreviousPage}>Prev</button>

            {pageNumbers?.map((number) =>
                <button key={number} onClick={() => changePage(number)} className='page-num'>
                    {number}
                </button>
            )}

            <button className="page-change-buttons" disabled={currentPage === pageNumbers.length} onClick={goToNextPage}>Next</button>
        </div>
    )
}