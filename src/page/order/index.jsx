import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../utils/fatch";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/Custom_Pagination";
import Button from "../../components/Button";
import Input from "../../components/TextInput/Index";
import Alert from "../../components/Alert";
// import Swalfire from "../../components/Swal";
import Swal from "sweetalert2";
import { formatHarga } from "../../utils/formatHarga";
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

  const hasFetched = useRef(false); // loop yang tak diinginkan

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchOrder());
      hasFetched.current = true;
    }
  }, [dispatch, Order.keyword, Order.page, Order.limit]); //dependensi berubah;

  const handleFilter = (e) => {
    dispatch(setKeyword(e.target.value));
    dispatch(fetchOrder());
  };

  const handlePageChange = (e) => {
    dispatch(setLimit(e.target.value));
    dispatch(fetchOrder());
  };

  const HandleStatusGagal = async (id) => {
    dispatch(UpdateOrderStatus(id, true, false, false));
    dispatch(fetchOrder());
  };

  const HandleStatusSukses = async (id) => {
    dispatch(UpdateOrderStatus(id, false, false, true)).then(() => {
      dispatch(fetchOrder());
    });
  };

  const HandleCoba = (ids) => {
    const { paket, jadwal, penyewa, _id, paymen, harga } = ids;
    navigate(`/order/bukti/${_id}`, {
      state: { paket, jadwal, penyewa, paymen, harga },
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
      <div className="flex justify-between">
        <div className="flex items-center ">
          <h1 className="font-bold mr-1">Show</h1>
          <Input
            className="lg:w-20 md:w-20 w-20 mr-3"
            name="limit"
            type="number"
            onChange={(e) => handlePageChange(e)}
            value={Order.limit}
            min={1}
          />
        </div>
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
          <thead className=" bg-blue-30 text-white-20">
            <tr className="">
              <th className="px-1 pl-3">No</th>
              <th className="px-2 ">Tanggal Pemesanan</th>
              <th className="px-3 ">Kode Pemesanan</th>
              <th className="px-2 ">Nama Paket</th>
              <th className="px-2">Status</th>
              <th className="px-2">Total Pembayaran</th>
              <th className="px-1 md:px-3  ">Uang Muka</th>
              <th className="px-2 ">Sisa Pembayaran</th>
              <th className="px-2 py-1">Metode Pembayaran</th>
              <th className=" md:px-24 px-40 border-l  border-blue-20">Aksi</th>
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
                  <td className="px-1 py-2">{index + 1}</td>
                  <td className="px-1 py-2">
                    {" "}
                    {new Date(item.date).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZoneName: "short",
                    })}
                  </td>
                  <td>{item.NumberOrder}</td>
                  <td>{item.historyPaket.title}</td>
                  <td>
                    <p
                      className={`py-1 px-1 mx-2 border  rounded-2xl ${
                        item.status === "pending"
                          ? "bg-yellow-300/45 border-yellow-300"
                          : item.status === "uang muka" ||
                            item.status === "proses"
                          ? "bg-blue-300/45 border-blue-300"
                          : item.status === "sukses"
                          ? "bg-lime-600/45 border-lime-600"
                          : "bg-red-500/45 border-red-500"
                      }`}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td>{formatHarga(item.total)}</td>
                  <td className="px-5">{formatHarga(item.total_dp)}</td>
                  <td>{formatHarga(item.sisa_pembayaran)}</td>
                  <td>{item.MetPembayaran}</td>
                  <td className="p-2 border-l  border-blue-20 ">
                    <Button
                      className={
                        "btn bg-blue-300 py-1 px-3 border border-blue-500 hover:outline-blue-500 hover:bg-blue-400/90 mr-1 shadow-md"
                      }
                      title="Detail"
                      onClick={() =>
                        HandleCoba({
                          paket: item.paket,
                          jadwal: item.jadwal,
                          penyewa: item.penyewa,
                          _id: item._id,
                          paymen: item.MetPembayaran,
                          harga: item.historyPaket.hargadetail,
                        })
                      }
                    />
                    {item.status ? (
                      <Button
                        className={
                          "btn bg-green-10/50 border border-green-500 py-1 px-3 hover:outline-green-500 hover:bg-green-10/75 shadow-md"
                        }
                        title="Proses"
                        onClick={() => HandleStatusSukses(item._id)}
                      />
                    ) : null}
                    <Button
                      className={
                        "btn bg-red-300 py-1 px-3 border border-red-500 hover:outline-red-500 hover:bg-red-400/90 mx-1  shadow-md "
                      }
                      title="Gagal"
                      onClick={() => HandleStatusGagal(item._id)}
                    />
                    <Button
                      className={
                        "btn bg-orange-300 py-1 px-3 border border-orange-500 hover:outline-orange-500 hover:bg-orange-400/90 mr-1  shadow-md "
                      }
                      title="Hapus"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <CustomPagination
        limit={Order.limit}
        page={Order.page}
        pages={Order.pages}
        setPage={setPage}
        fetch={fetchOrder}
      />
    </main>
  );
}
