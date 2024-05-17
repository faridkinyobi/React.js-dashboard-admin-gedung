import React, { useEffect } from "react";
import Button from "../../components/Button";
import Thead from "../../components/Thead";
import Input from "../../components/TextInput/Index";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaporan, setKeyword } from "../../redux/Laporan/actions";
import { format } from "date-fns";

export default function Index() {
  const dispatch = useDispatch();
  const laporan = useSelector((state) => state.Laporan);

  useEffect(() => {
    dispatch(fetchLaporan());
  }, [laporan.keyword]); //dependensi berubah

  const handleFilter = (e) => {
    // dispatch(setKeyword(e.target.value));
    // dispatch(fetchLaporan());
  };

  const { totalPemasukan, totalPengeluaran, Saldo } =
    laporan.data.length > 0
      ? {
          totalPemasukan: laporan.data[laporan.data.length - 1].totalPemasukan,
          totalPengeluaran:
            laporan.data[laporan.data.length - 1].totalPengeluaran,
          Saldo:
            laporan.data[laporan.data.length - 1].totalPemasukan -
            laporan.data[laporan.data.length - 1].totalPengeluaran,
        }
      : { totalPemasukan: 0, totalPengeluaran: 0 };
  return (
    <div className="items-center px-4 lg:px-20 text-blue-40">
      <div>
        <Input
          name="keyword"
          type="date"
          placeholder="Masukan pencarian Namber Order"
          onChange={(e) => handleFilter(e)}
          value={laporan.keyword}
        />
      </div>
      <div className=" mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className="text-center  w-full h-auto border border-blue-20">
          <Thead
            text={["No", "tanggal", "descripsi", "pemasukan", "pengeluaran"]}
            className={"px-8 py-2"}
          />
          <tbody>
            {laporan.data.map((items, index) => (
              <tr className="border border-blue-20" key={index}>
                <td className="px-2 py-2">{index + 1}</td>
                <td className="px-2 py-2">
                  {" "}
                  {format(new Date(items.date), "dd/MM/yyyy")}
                </td>
                <td>{items.desc}</td>
                <td>
                  {items.pemasukan.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td>
                  {items.pengeluaran.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-2 py-2 font-bold">Total</td>
              <td></td>
              <td></td>
              <td className="px-2 py-2 font-bold">
                {totalPemasukan?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
              <td className="px-2 py-2 font-bold">
                {totalPengeluaran?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
            </tr>
            <tr className="bg-gray-10/50">
              <td className="px-2 py-2 font-bold">Saldo</td>
              <td></td>
              <td></td>
              <td colSpan="10" className=" py-2 font-bold">
                {Saldo?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
