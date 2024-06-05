import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";
import { putData, deleteData } from "../../utils/fatch";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import Thead from "../../components/Thead";
import Alert from "../../components/Alert";
import { config } from "../../config";
// import { format, isValid } from "date-fns";
// import { fetchPenyewa } from "../../redux/penyewa/actions";
import { fetchPaket } from "../../redux/paket/actions";
import { fetchJadwal } from "../../redux/jadwal/actions";
import { fetchBukti } from "../../redux/bukti/actions";
export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hasFetched = useRef(false); // loop yang tak diinginkan
  const { id } = useParams();
  const { paket, jadwal, penyewa, paymen } = location.state || {};
  // const DatePenyewa = useSelector((state) => state.Penyewa);
  const Datapekets = useSelector((state) => state.Paket);
  const DataJadwal = useSelector((state) => state.Jadwal);
  const DataPembayaran = useSelector((state) => state.Bukti);

  useEffect(() => {
    if (!hasFetched.current) {
      // dispatch(fetchPenyewa(penyewa, true));
      dispatch(fetchBukti(id, true));
      dispatch(fetchPaket(paket, true));
      dispatch(fetchJadwal(jadwal, true));
      hasFetched.current = true;
    }
  }, [dispatch]);

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
        const res = await deleteData(`/cms/jadwal/${id}`);
        Alert({
          title: res?.response?.data?.msg ?? "success",
          icon: "success",
        });

        dispatch(fetchJadwal());
      }
    });
  };

  const handleStatusChange = async (id, status_kegiatan) => {
    await putData(`/cms/JadwalStatus/${id}`, {
      status_kegiatan:
        status_kegiatan === "sedang diproses"
          ? "sudah dipesan"
          : "sedang diproses",
    });
    dispatch(fetchJadwal()); // Re-fetch data after status change
  };

  // const formatDate = (date) => {
  //   const parsedDate = new Date(date);
  //   return isValid(parsedDate) ? format(parsedDate, "dd/MM/yyyy h:i") : "-";
  // };
  return (
    <main className="items-center px-4 lg:px-20 ">
      <Button
        className={
          "btn bg-slate-400 py-3 px-10 hover:outline-slate-500 hover:bg-slate-10/90 "
        }
        title={"back"}
        onClick={() => navigate("/Order")}
      />
      {!DataPembayaran?.data?.BuktiUangMuka?.name? (
        <Button
          className={
            "btn bg-slate-400 py-3 px-10 hover:outline-slate-500 hover:bg-slate-10/90 "
          }
          title={"Bukti Uang muka"}
          onClick={() => navigate(`/bukti/create/${id}`)}
        />
      ):("")}

      {/* start Map Bukti Pembayaran */}
      <div className="overflow-x-scroll md:overflow-hidden flex-row">
        <h1 className=" my-2">Bukti Nota pembayaran</h1>
        <table className="text-left text-white-10 w-full">
          <Thead
            text={["Bukti Pembayaran Uang muka", " Bukti Pelunasan", "aktor"]}
            className={"px-8 py-2"}
          />
          <tbody>
            {DataPembayaran === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              <tr className="border border-blue-20">
                <td className="px-8 py-2 ">
                  <img
                    width={100}
                    height={100}
                    src={`${config.api_image}/${DataPembayaran?.data?.BuktiUangMuka?.name}`}
                    alt="50x50"
                  />
                </td>
                <td>
                  <img
                    width={100}
                    height={100}
                    src={`${config.api_image}/${DataPembayaran?.data?.BuktiPelunasan?.name}`}
                    alt="50x50"
                  />
                </td>
                <td>
                  {DataPembayaran?.data?.status == true && (
                    <Button
                      className={
                        "btn bg-slate-400 py-3 px-10 hover:outline-slate-500 hover:bg-slate-10/90 "
                      }
                      title={"Bukti Pelunasan"}
                      onClick={() =>
                        navigate(`/bukti/edit/${DataPembayaran.data._id}`)
                      }
                    />
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* end Bukti Pembayaran */}

      {/* start Map  Paket */}
      <div className=" overflow-x-scroll md:overflow-hidden">
        <h1 className=" my-4">Paket</h1>
        <table className=" text-center text-blue-20 w-full">
          <Thead
            text={["Nama", "Fasilitas", "Harga"]}
            className={" px-10 p-3"}
          />
          <tbody>
            <tr className="border border-blue-20">
              {/* <td className="p-2">{(index += 1)}</td> */}
              <td className="p-2">{Datapekets.data.titel}</td>
              <td className="p-2 text-left">
                {Datapekets?.data?.fasilitas?.map(
                  (fasilitasItem, fasilitasIndex) => (
                    <h1 key={fasilitasIndex}>{fasilitasItem.detail}</h1>
                  )
                )}
              </td>
              <td className="p-1">
                {Datapekets?.data?.harga?.map((hargaItem, hargaIndex) => (
                  <div
                    className="flex  border-2 my-1 w-[27rem] p-1 text-left"
                    key={hargaIndex}
                  >
                    <div className="mx-8">
                      kegiatan: {hargaItem.kegiatan} <br />
                      hari: {hargaItem.hari}
                      <br />
                    </div>
                    warga: {hargaItem.warga}
                    <br />
                    harga: Rp.{hargaItem.hargadetail}
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* end Map  Paket */}

      {/* start Jadwal */}
      <div className="my-5 overflow-x-scroll md:overflow-hidden">
        <table className=" text-center text-blue-40  w-full">
          <Thead
            text={[
              "tanggal mulai",
              "tanggal akhir",
              "waktu",
              "lama sewa",
              "kegiatan",
              "status",
              "aktor",
            ]}
            className={"px-8 py-2"}
          />
          <tbody>
            {DataJadwal?.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              <tr className=" border border-blue-20">
                <td>
                  {new Date(DataJadwal?.data?.tgl_mulai).toLocaleString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}{" "}
                </td>
                <td>
                  {new Date(DataJadwal?.data?.tgl_akhir).toLocaleString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}{" "}
                </td>
                <td>{DataJadwal?.data?.waktu}</td>
                <td>{DataJadwal?.data?.lama_sewa} hari</td>
                <td>{DataJadwal?.data?.kegiatan}</td>
                <td>
                  <p
                    className={`py-1 px-1 mx-4 border rounded-2xl ${
                      DataJadwal?.data?.status_kegiatan === "sedang diproses"
                        ? " bg-yellow-300/45 border-yellow-300"
                        : ""
                    }`}
                  >
                    {DataJadwal?.data?.status_kegiatan}
                  </p>
                </td>
                <td className="px-3 border-l  border-blue-20">
                  <input
                    className="w-7 h-5 "
                    // className={
                    //   "btn bg-green-10 py-2 px-2 hover:outline-green-10 hover:bg-green-10/90 mr-1"
                    // }
                    type="checkbox"
                    checked={
                      DataJadwal?.data?.status_kegiatan === "sudah dipesan"
                    }
                    onChange={() =>
                      handleStatusChange(
                        DataJadwal?.data?._id,
                        DataJadwal?.data?.status_kegiatan
                      )
                    }
                  />

                  {/* <Button
                      className={
                        "btn bg-red-300 py-2 px-2  border border-red-500 hover:outline-red-500 hover:bg-red-400/90 my-1 mx-3  shadow-md"
                      }
                      title={<BsFillPencilFill />}
                      onClick={() => navigate(`/jadwal/edit/${DataJadwal?.data._id}`)}
                    /> */}
                  <Button
                    className={
                      "btn bg-gray-400 py-2 px-2 border border-gray-500 hover:outline-gray-500 hover:bg-gray-400/90 mt-2  shadow-md "
                    }
                    type="button"
                    title={<BsFillTrash3Fill />}
                    onClick={() =>
                      handleDelete(
                        DataJadwal?.data?._id,
                        DataJadwal?.data?.kegiatan
                      )
                    }
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* end Jadwal */}
    </main>
  );
}
