import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../utils/fatch";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/Custom_Pagination";
import Button from "../../components/Button";
import Input from "../../components/TextInput/Index";
import Alert from "../../components/Alert";
// import Swalfire from "../../components/Swal";
import Swal from "sweetalert2";

import {
  fetchOrder,
  UpdateOrderStatus,
  setKeyword,
  setLimit,
  setPage,
} from "../../redux/order/actions";

export default function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Order = useSelector((state) => state.Order);

  // const itemsPage = 5; // jumlah item per halaman
  const [itemsPage, setitemsPage] = useState(5); // show Page
  const [Page, setPages] = useState(1); // halaman saat ini
  const [pageData, setPageData] = useState([]);

  const hasFetched = useRef(false); // loop yang tak diinginkan

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchOrder());
      hasFetched.current = true;
    }
  }, [Order.keyword, Order.page, Order.limit]); //dependensi berubah;

  const handleFilter = (e) => {
    dispatch(setKeyword(e.target.value));
    dispatch(fetchOrder());
  };

  const handlePageChange = (e) => {
    dispatch(setLimit(e.target.value));
    dispatch(fetchOrder());
  };
  // const handlePageChange  = (e) => {
  //   dispatch(setKeyword(e.target.value));
  //   dispatch(fetchOrder());
  // };

  const HandleStatusGagal = async (id) => {
    dispatch(UpdateOrderStatus(id, true));
    dispatch(fetchOrder());
  };

  const HandleStatusSukses = async (id) => {
    dispatch(UpdateOrderStatus(id)).then(() => {
      dispatch(fetchOrder());
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: `warning`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/order/${id}`);
        Alert({
          title: res?.response?.data?.msg ?? "success",
          icon: "success",
        });

        dispatch(fetchOrder());
      }
    });
  };

  return (
    <main className="items-center px-4 lg:px-20 text-blue-40">
      <div>
        <h1>Show</h1>
        <Input
          className="lg:w-28 md:w-24 w-20 mr-3"
          name="limit"
          type="number"
          onChange={(e) => handlePageChange(e)}
          value={Order.limit}
        />
        <Input
          name="keyword"
          type="text"
          placeholder="Masukan pencarian Namber Order"
          onChange={(e) => handleFilter(e)}
          value={Order.keyword}
        />
      </div>
      <div className=" mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className="text-center  w-full border border-blue-20">
          <thead className=" bg-blue-400">
            <tr className="">
              <th className="px-1 pl-3">Nomer</th>
              <th className="px-2 ">Tanggal Order</th>
              <th className="px-9 ">Namber Order</th>
              <th className="px-5">Status</th>
              <th className="px-2">Total pembayan</th>
              <th className="px-10 py-2">Total uang muka</th>
              <th className="px-2 py-2">Sisa pembayaran</th>
              <th className="px-2 py-2">Metode pembayaran</th>
              <th className=" px-20 ">aktor</th>
            </tr>
          </thead>
          <tbody>
            {Order.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              Order.data.map((item, index) => (
                <tr className="border border-blue-20" key={index}>
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">
                    {" "}
                    {format(new Date(item.date), "dd/MM/yyyy")}
                  </td>
                  <td>{item.NumberOrder}</td>
                  <td>
                    <p
                      className={`py-1 px-1 mx-2 border  rounded-2xl ${
                        item.status === "pending"
                          ? "bg-yellow-300/45 border-yellow-300"
                          : item.status === "sukses"
                          ? "bg-lime-600/45 border-lime-600"
                          : "bg-red-500/45 border-red-500"
                      }`}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td>
                    {item.total.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td className="px-5">
                    {item.total_dp.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td>
                    {item.sisa_pembayaran.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td>{item.MetPembayaran}</td>
                  <td className="p-2  border-l  border-blue-20">
                    <Button
                      className={
                        "btn bg-green-10/50 border border-green-10 py-1 px-2 hover:outline-green-10 hover:bg-green-10/75 shadow-md"
                      }
                      title="sukses"
                      onClick={() => HandleStatusSukses(item._id)}
                    />

                    <Button
                      className={
                        "btn bg-red-300 py-1 px-3 border border-red-500 hover:outline-red-500 hover:bg-red-400/90 mx-1  shadow-md "
                      }
                      title="gagal"
                      onClick={() => HandleStatusGagal(item._id)}
                    />
                    <Button
                      className={
                        "btn bg-orange-300 py-1 px-2 border border-orange-500 hover:outline-orange-500 hover:bg-orange-400/90 mr-1  shadow-md "
                      }
                      title="hapus"
                      onClick={() => handleDelete(item._id)}
                    />
                    <Button
                      className={
                        "btn bg-gray-400 py-1 px-2 border border-gray-500 hover:outline-gray-500 hover:bg-gray-400/90 mt-2  shadow-md "
                      }
                      title="Pembayaran"
                      onClick={() => navigate(`/order/bukti/${item._id}`)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <CustomPagination
        totalItems={Order.data.length}
        itemsPage={Order.limit}
        currentPage={Order.page}
      />
    </main>
  );
}
