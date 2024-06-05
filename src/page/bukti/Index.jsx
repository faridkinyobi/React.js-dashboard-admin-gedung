import React, { useEffect } from "react";
import { fetchBukti } from "../../redux/bukti/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { deleteData } from "../../utils/fatch";
import { config } from "../../config";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import Thead from "../../components/Thead";
import Swal from "sweetalert2";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const result = useSelector((state) => state.Bukti);
  console.log(result.data);
  useEffect(() => {
    dispatch(fetchBukti());
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
        const res = await deleteData(`/cms/payments/${id}`);
        Alert({
          title: res?.response?.data?.msg ?? "success",
          icon: "success",
        });
        dispatch(fetchBukti());
      }
    });
  };

  return (
    <main className="items-center px-4 lg:px-20 ">
      <div className="mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className=" text-center text-blue-20 w-full">
          <Thead
            text={[
              "No",
              "Bukti Pembayaran Uang muka",
              " Bukti Pelunasan",
              "aktor",
            ]}
            className={"px-8 py-2"}
          />
          <tbody>
            {result.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              result.data.map((item, index) => (
                <tr className="border border-blue-20" key={index}>
                  <td className="p-2">{index + 1}</td>
                  <td className="px-8 py-2 ">
                    <img
                      width={100}
                      height={100}
                      src={`${config.api_image}/${item?.BuktiUangMuka?.name}`}
                      alt="50x50"
                    />
                  </td>
                  <td>
                    <img
                      width={100}
                      height={100}
                      src={`${config.api_image}/${item?.BuktiPelunasan?.name}`}
                      alt="50x50"
                    />
                  </td>

                  {/* <td className="p-2">{item.no_tlp}</td> */}
                  <td className="py-3  border-l  border-blue-20">
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
    </main>
  );
}
