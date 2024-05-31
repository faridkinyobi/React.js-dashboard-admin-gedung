import React, { useEffect, useRef } from "react";
import Button from "../../components/Button";
import Thead from "../../components/Thead";
import Input from "../../components/TextInput/Index";
import CustomPagination from "../../components/Custom_Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLaporan,
  setLimit,
  setPage,
  setEndDate,
  setStartDate,
} from "../../redux/Laporan/actions";
import { format } from "date-fns";

export default function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const laporan = useSelector((state) => state.Laporan);
  const hasFetched = useRef(false); // loop yang tak diinginkan
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchLaporan());
      hasFetched.current = true;
    }
  }, [laporan.page, laporan.limit, laporan.startDate, laporan.endDate]); //dependensi berubah

  const handlePageChange = (e) => {
    dispatch(setLimit(e.target.value));
    dispatch(fetchLaporan());
  };
  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e.target.value));
    dispatch(fetchLaporan());
  };

  const handleEndDateChange = (e) => {
    dispatch(setEndDate(e.target.value));
    dispatch(fetchLaporan());
  };

  const totalDebit =
    laporan.data.length > 0
      ? laporan.data.reduce((index, items) => index + (items.pemasukan || 0), 0)
      : 0;

  const totalKredit =
    laporan.data.length > 0
      ? laporan.data.reduce(
          (index, items) => index + (items.pengeluaran || 0),
          0
        )
      : 0;
  // const totalSaldo =
  //   laporan.data.length > 0
  //     ? laporan.data.reduce((index, items) => index - (items.Saldo || 0), 0)
  //     : 0;
  const totalSaldo = totalDebit - totalKredit;
  return (
    <div className="items-center px-4 lg:px-20 text-blue-40">
      <div className=" flex flex-wrap justify-between items-center">
        <div className="items-center flex ">
          <h1 className="font-bold mr-1">Show</h1>
          <Input
            className="md:max-w-40 max-w-20 mr-3"
            name="limit"
            type="number"
            onChange={(e) => handlePageChange(e)}
            value={laporan.limit}
            min={1}
          />
        </div>
        <div className="items-center flex flex-wrap gap-3">
          <h1 className="font-bold mr-1">Data Start</h1>
          <Input
            className=" max-w-40  mr-3"
            type="date"
            value={laporan.startDate}
            onChange={(e) => handleStartDateChange(e)}
          />
          <h1 className="font-bold mr-1">Data Start</h1>
          <Input
            className=" max-w-40 mr-3"
            type="date"
            value={laporan.endDate}
            onChange={(e) => handleEndDateChange(e)}
          />
        </div>
        <div>
          <Button
            className={"btn_greey"}
            title={"pengeluaran"}
            onClick={() => navigate("/laporan/create")}
          />
        </div>
      </div>
      <div className=" mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className="text-center  w-full h-auto border border-blue-20">
          <Thead
            text={[
              "No",
              "tanggal",
              "Yang Bersangkuran",
              "descripsi",
              "Debit",
              "Credit",
              "Saldo",
            ]}
            className={"px-8 py-2"}
          />
          <tbody>
            {laporan.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              laporan.data.map((items, index) => (
                <tr className="border border-blue-20" key={index}>
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">
                    {" "}
                    {new Date(items.date).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>{items.petugas}</td>
                  <td>{items.desc}</td>
                  <td>
                    {items.pemasukan?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td>
                    {items.pengeluaran?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td>
                    {items.Saldo?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-2 py-2 font-bold">Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="px-2 py-2 font-bold">
                {totalDebit?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
              <td className="px-2 py-2 font-bold">
                {totalKredit?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
              <td className=" py-2 font-bold">
                {totalSaldo?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <CustomPagination
        limit={laporan.limit}
        page={laporan.page}
        pages={laporan.pages}
        setPage={setPage}
        fetch={fetchLaporan}
      />
    </div>
  );
}
