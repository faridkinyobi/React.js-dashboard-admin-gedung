import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOrder, setPage } from "../../redux/order/actions";
const CustomPagination = ({ totalItems, itemsPage, currentPage }) => {
  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalItems / itemsPage);
  console.log(totalPages, "total");

  const handlePageChange = (Page) => {
    if (Page >= 1 && Page <= totalPages) {
      dispatch(fetchOrder());
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`border border-blue-20 p-2 text-blue-40${
            currentPage === i ? "active" : ""
          }`}
        >
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <ul className="flex gap-1 text-blue-40">
        <li className="border border-blue-20 p-2 ">
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        {renderPagination()}
        <li className="border border-blue-20 p-2 ">
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;
