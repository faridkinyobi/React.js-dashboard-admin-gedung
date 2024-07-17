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
import { formatHarga } from "../../utils/formatHarga";
import { formatDate } from "../../utils/formatDate";
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from 'react-export-table-to-excel';

export default function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const componentRef = useRef();
  const laporan = useSelector((state) => state.Laporan);
  const hasFetched = useRef(false); // loop yang tidak diinginkan
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchLaporan());
      hasFetched.current = true;
    }
  }, [dispatch,laporan.page, laporan.limit, laporan.startDate, laporan.endDate]); //dependensi

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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { onDownload } = useDownloadExcel({
    currentTableRef: componentRef.current,
    filename: 'Laporan',
    sheet: 'laporan'
})
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
          <Button
            className={
              ".btn bg-blue-300 py-3 px-10   border border-blue-500 hover:outline-blue-500 hover:bg-blue-400/90 mx-2  shadow-md rounded-full"
            }
            title={"Print"}
            onClick={handlePrint}
          />
          <Button
            className={
              ".btn bg-blue-300 py-3 px-10   border border-blue-500 hover:outline-blue-500 hover:bg-blue-400/90 shadow-md rounded-full"
            }
            title={"excel"}
            onClick={onDownload}
          />
        </div>
      </div>
      <div
        className=" mt-3 mb-2 overflow-x-scroll md:overflow-hidden print:overflow-x-hidden"
        ref={componentRef}
      >
        <h1 className="hidden text-center my-3 font-bold text-sm print:block print:text-xl">LAPORAN KEUANGAN GEDUNG DESA CANGKOL</h1>
        <table className="text-center  w-full print:w-auto h-auto border border-blue-20 mx-0 print:mx-5">
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
            className={"px-8 py-2 print:px-4"}
          />
          <tbody>
            {laporan.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              laporan.data.map((items, index) => (
                <tr className="border border-blue-20" key={index}>
                  <td className="px-2 py-2 print:px-0">{index + 1}</td>
                  <td className="px-2 py-2 print:px-0">{formatDate(items.date)}</td>
                  <td>{items.petugas}</td>
                  <td>{items.desc}</td>
                  <td className="text-left">{formatHarga(items.pemasukan)}</td>
                  <td className="text-left">
                    {formatHarga(items.pengeluaran)}
                  </td>
                  <td className="text-left">{formatHarga(items.Saldo)}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-1 py-2 font-bold">Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="px-2 py-2 font-bold text-left">
                {formatHarga(laporan.totalDebit)}
              </td>
              <td className="px-2 py-2 font-bold text-left">
                {formatHarga(laporan.totalKredit)}
              </td>
              <td className=" py-2 font-bold text-left">
                {formatHarga(laporan.saldo)}
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
