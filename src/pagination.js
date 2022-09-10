// import React from "react";

// export default function Pagination({ filteredData, dataLimit }) {
//     const [pages] = React.useState(Math.round(filteredData.length / dataLimit));
//     const [currentPage, setCurrentPage] = React.useState();

//     function goToNextPage() {
//         setCurrentPage((page) => page + 1);
//     }

//     function goToPreviousPage() {
//         setCurrentPage((page) => page - 1);
//     }

//     function changePage(event) {
//         const pageNumber = Number(event.target.textContent);
//         setCurrentPage(pageNumber);
//     }

//     const getPaginatedData = () => {
//         const startIndex = currentPage * dataLimit - dataLimit;
//         const endIndex = startIndex + dataLimit;
//         return data.slice(startIndex, endIndex);
//     };

//     const getPaginationGroup = () => {
//         // not yet implemented
//     };


//     // return(

//     // )
// }