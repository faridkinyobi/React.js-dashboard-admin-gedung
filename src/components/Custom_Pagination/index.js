import React  from "react";
import { useDispatch } from "react-redux";
// import { fetchOrder, setPage } from "../../redux/order/actions";
const CustomPagination = ({ pages, page, setPage, fetch }) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pages) {
      dispatch(setPage(page));
      dispatch(fetch());
    }
  };

  const renderPagination = () => {
    const render = [];
    for (let i = 1; i <= pages; i++) {
      render.push(
        <li
          key={i}
          className={`border border-blue-20 p-2 text-blue-40 ${
            pages === i ? "active" : ""
          }`}
        >
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }
    return render;
  };

  return (
    <div className="pagination">
      <ul className="flex gap-1 text-blue-40">
        <li className="border border-blue-20 p-2 ">
          <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        </li>
        {renderPagination()}
        <li className="border border-blue-20 p-2 ">
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;
