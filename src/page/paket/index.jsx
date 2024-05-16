import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../utils/fatch";
import { fetchPaket } from "../../redux/paket/actions";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import Button from "../../components/Button";
import Thead from "../../components/Thead";
import Alert from "../../components/Alert";
import { accessPaket } from "../../const/access";
// import Swalfire from "../../components/Swal";
import Swal from "sweetalert2";
export default function Paket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pekets = useSelector((state) => state.Paket);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });
  const chekAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessPaket).forEach(function (kay, index) {
      if (accessPaket[kay].indexOf(role) >= 0) {
        access[kay] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    chekAccess();
  }, []);
  useEffect(() => {
    dispatch(fetchPaket());
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
        const res = await deleteData(`/cms/pakets/${id}`);
        Alert({
          title: res?.response?.data?.msg ?? "success",
          icon: "success",
        });

        dispatch(fetchPaket());
      }
    });
  };

  return (
    <main className="px-4 lg:px-20">
      {access.tambah && (
        <Button
          className={
            "btn bg-slate-300 border border-slate-400 py-3 px-10 hover:outline-slate-500 hover:bg-slate-500/90 shadow "
          }
          title={"Tambah"}
          onClick={() => navigate("/paket/create")}
        />
      )}
      <div className="mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className=" text-center text-blue-20 w-full">
          <Thead
            text={["No", "Paket", "Fasilitas", "Harga", "aktor"]}
            className={"p-3"}
          />
          <tbody>
            {pekets.data.map((item, index) => (
              <tr className="border border-blue-20" key={index}>
                <td className="p-2">{(index += 1)}</td>
                <td className="p-2">{item.titel}</td>
                <td className="p-2 text-left">
                  {item.fasilitas.map((fasilitasItem, fasilitasIndex) => (
                    <h1 key={fasilitasIndex}>{fasilitasItem.detail}</h1>
                  ))}
                </td>
                <td className="p-1">
                  {item.harga.map((hargaItem, hargaIndex) => (
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
                <td className="py-3 border-l  border-blue-20">
                  {access.edit && (
                    <Button
                      className={
                        "btn bg-red-300 py-2 px-3  border border-red-500 hover:outline-red-500 hover:bg-red-400/90 my-3 mx-3  shadow-md"
                      }
                      title={<BsFillPencilFill />}
                      onClick={() => navigate(`/paket/edit/${item._id}`)}
                    />
                  )}
                  {access.hapus && (
                    <Button
                      className={
                        "btn bg-gray-400 py-2 px-2 border border-gray-500 hover:outline-gray-500 hover:bg-gray-400/90 mt-2  shadow-md "
                      }
                      type="button"
                      title={<BsFillTrash3Fill />}
                      onClick={() => handleDelete(item._id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
