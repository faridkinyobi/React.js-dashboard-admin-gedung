import React, { useEffect } from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrash3Fill } from "react-icons/bs";
import { deleteData } from "../../../utils/fatch";
import Alert from "../../../components/Alert";
import Thead from "../../../components/Thead";
import Swal from "sweetalert2";
import { fetchPelanggan } from "../../../redux/user/actions";

export default function Penyewa() {
  const dispatch = useDispatch();
  const Pelangan = useSelector((state) => state.User);
  useEffect(() => {
    dispatch(fetchPelanggan());
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
        const res = await deleteData(`/deletPelanggan/${id}`);
        
        Alert({
          title: res?.response?.data?.msg ?? "success",
          icon: "success",
        });

        dispatch(fetchPelanggan());
      }
    });
  };
  return (
    <div className="px-4 lg:px-20 ">
      {/* <Button
        className={
          "btn bg-slate-400 py-3 px-10 hover:outline-slate-500 hover:bg-slate-10/90 "
        }
        title={"Tambah"}
        onClick={() => navigate("/penyewa/create")}
      /> */}
      <div className="mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className="text-center text-blue-30 w-full">
          <Thead
            text={["No", "firstName", "lastName", "email", "aktor"]}
            className={"px-8 py-2"}
          />

          <tbody>
            {Pelangan.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              Pelangan.data.map((item, index) => (
                <tr className="border border-blue-20" key={index}>
                  <td className="p-2">{(index += 1)}</td>
                  <td className="p-2">{item.firstName}</td>
                  <td className="p-2">{item.lastName}</td>
                  <td className="p-2">{item.email}</td>
                  <td className="py-3  border-l  border-blue-20">
                    {/* <Button
                      className={
                        "btn bg-red-400 py-2 px-3 hover:outline-red-500 hover:bg-red-10/90 mx-3 "
                      }
                      title={<BsFillPencilFill />}
                      onClick={() => navigate(`/penyewa/edit/${item._id}`)}
                    /> */}
                    <Button
                      className={
                        "btn bg-gray-400 py-2 px-2 border border-gray-500 hover:outline-gray-500 hover:bg-gray-400/90 mt-2  shadow-md "
                      }
                      type="button"
                      title={<BsFillTrash3Fill />}
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
