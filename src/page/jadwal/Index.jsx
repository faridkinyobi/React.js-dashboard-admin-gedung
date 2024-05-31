import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchJadwal } from "../../redux/jadwal/actions";
import { deleteData, putData } from "../../utils/fatch";
import { format } from "date-fns";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import Thead from "../../components/Thead";
import Swal from "sweetalert2";

export default function Jadwal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Jadwal = useSelector((state) => state.Jadwal);

  useEffect(() => {
    dispatch(fetchJadwal());
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

  return (
    <main className="items-center px-4 lg:px-20 ">
      <Button
        className={"btn_greey "}
        title={"Tambah"}
        onClick={() => navigate("/jadwal/create")}
      />
      <div className="mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className=" text-center text-blue-40  w-full">
          <Thead
            text={[
              "No",
              "Date Creat",
              "tanggal mulai",
              "tanggal akhir",
              "waktu",
              "lama sewa",
              "kegiatan",
              "status",
              "aktor",
            ]}
            className={"px-2 py-2"}
          />
          <tbody>
            {Jadwal.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              Jadwal.data.map((item, index) => (
                <tr className=" border border-blue-20" key={index}>
                  <td className="p-2">{(index += 1)}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZoneName: "short",
                    })}
                  </td>
                  <td>{format(new Date(item.tgl_mulai), "dd/MM/yyyy")}</td>
                  <td>
                    {item.tgl_akhir
                      ? format(new Date(item.tgl_akhir), "dd/MM/yyyy")
                      : "-"}
                  </td>
                  <td>{item.waktu}</td>
                  <td>{item.lama_sewa} hari</td>
                  <td>{item.kegiatan}</td>
                  <td>
                    <p
                      className={`py-1 px-1 mx-4 border rounded-2xl ${
                        item.status_kegiatan === "sedang diproses"
                          ? " bg-yellow-300/45 border-yellow-300"
                          : ""
                      }`}
                    >
                      {item.status_kegiatan}
                    </p>
                  </td>
                  <td className="px-3 border-l  border-blue-20">
                    <input
                      className="w-7 h-5 "
                      // className={
                      //   "btn bg-green-10 py-2 px-2 hover:outline-green-10 hover:bg-green-10/90 mr-1"
                      // }
                      type="checkbox"
                      checked={item.status_kegiatan === "sudah dipesan"}
                      onChange={() =>
                        handleStatusChange(item._id, item.status_kegiatan)
                      }
                    />

                    <Button
                      className={
                        "btn bg-red-300 py-2 px-2  border border-red-500 hover:outline-red-500 hover:bg-red-400/90 my-1 mx-3  shadow-md"
                      }
                      title={<BsFillPencilFill />}
                      onClick={() => navigate(`/jadwal/edit/${item._id}`)}
                    />

                    <Button
                      className={
                        "btn bg-gray-400 py-2 px-2 border border-gray-500 hover:outline-gray-500 hover:bg-gray-400/90 mt-2  shadow-md "
                      }
                      type="button"
                      title={<BsFillTrash3Fill />}
                      onClick={() => handleDelete(item._id, item.kegiatan)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
