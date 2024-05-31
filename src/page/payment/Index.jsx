import React, { useEffect } from "react";
import { fetchPayment } from "../../redux/payment/actions";
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

  const payment = useSelector((state) => state.Payment);

  useEffect(() => {
    dispatch(fetchPayment());
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
        dispatch(fetchPayment());
      }
    });
  };

  return (
    <main className="items-center px-4 lg:px-20 ">
      <Button
        className={
          "btn_greey"
        }
        title={"Tambah"}
        onClick={() => navigate("/payment/create")}
      />
      <div className="mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className=" text-center text-blue-20 w-full">
          <Thead
            text={["No", "Nama Bank", "Nomer Rekening", "foto", "aktor"]}
            className={"px-8 py-2"}
          />
          <tbody>
            {payment.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              payment.data.map((item, index) => (
                <tr className="border border-blue-20" key={index}>
                  <td>{(index += 1)}</td>
                  <td>{item.type}</td>
                  <td>{item.Number}</td>
                  <td>
                    <img
                      width={50}
                      height={50}
                      src={`${config.api_image}/${item.image?.name}`}
                      alt={item.type}
                    />
                  </td>
                  {/* <td className="p-2">{item.no_tlp}</td> */}
                  <td className="py-3  border-l  border-blue-20">
                    <Button
                      className={
                        "btn bg-red-300 py-2 px-3  border border-red-500 hover:outline-red-500 hover:bg-red-400/90 my-3 mx-3  shadow-md"
                      }
                      title={<BsFillPencilFill />}
                      onClick={() => navigate(`/payment/edit/${item._id}`)}
                    />

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
