import React, { useEffect } from "react";
import Button from "../../components/Button";
import { fetchPenyewa } from "../../redux/penyewa/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { deleteData } from "../../utils/fatch";
import Alert from "../../components/Alert";
import Thead from "../../components/Thead";
import Swal from "sweetalert2";
export default function Penyewa() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const penyewa = useSelector((state) => state.Penyewa);

  useEffect(() => {
    dispatch(fetchPenyewa());
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
        const res = await deleteData(`/cms/penyewa/${id}`);
        Alert({
          title: res?.response?.data?.msg ?? "success",
          icon: "success",
        });

        dispatch(fetchPenyewa());
      }
    });
  };
  return (
    <div className="px-4 lg:px-20 ">
      <Button
        className={
          "btn bg-slate-300 border border-slate-400 py-3 px-10 hover:outline-slate-500 hover:bg-slate-500/90 shadow "
        }
        title={"Tambah"}
        onClick={() => navigate("/penyewa/create")}
      />
      <div className="mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className=" text-center text-blue-20 w-full">
          <Thead
            text={["No", "Nama", "Email", "Alamat", "Nomer telepon", "aktor"]}
            className={"px-8 py-2"}
          />

          <tbody>
            {penyewa.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              penyewa.data.map((item, index) => (
                <tr className="border border-blue-20" key={index}>
                  <td className="px-1">{(index += 1)}</td>
                  <td className="px-1">{item.name}</td>
                  <td className="px-1">{item.email}</td>
                  <td className="px-1">{item.alamat}</td>
                  <td className="px-1">{item.no_tlp}</td>
                  <td className="  border-l  border-blue-20">
                    <Button
                      className={
                        "btn bg-red-300 py-2 px-3  border border-red-500 hover:outline-red-500 hover:bg-red-400/90 my-1 mx-3  shadow-md"
                      }
                      title={<BsFillPencilFill />}
                      onClick={() => navigate(`/penyewa/edit/${item._id}`)}
                    />

                    <Button
                      className={
                        "btn bg-gray-400 py-2 px-2 border border-gray-500 hover:outline-gray-500 hover:bg-gray-400/90   shadow-md "
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
