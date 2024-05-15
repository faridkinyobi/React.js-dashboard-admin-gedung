import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../../utils/fatch";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import Thead from "../../components/Thead";
import { config } from "../../config";
import Alert from "../../components/Alert";
export default function Order() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Img, setImgBuk] = useState([]);

  const fetchOneBukti = async () => {
    const res = await getData(`/cms/pembayaran/${id}`);
    setImgBuk(res.data?.data);
    Alert({
      title: res?.response?.data?.msg ?? "name",
      icon: "warning",
    });
  };
  useEffect(() => {
    fetchOneBukti();
  }, []);
  return (
    <main className="items-center px-4 lg:px-20 ">
      <Button
        className={
          "btn bg-slate-400 py-3 px-10 hover:outline-slate-500 hover:bg-slate-10/90 "
        }
        title={"back"}
        onClick={() => navigate("/Order")}
      />
      <div className=" mt-3 mb-2 overflow-x-scroll md:overflow-hidden">
        <table className="text-left text-white-10 w-full">
          <Thead
            text={["Bukti Pembayaran Uang muka", " Bukti Pelunasan", "aktor"]}
            className={"px-8 py-2"}
          />
          <tbody>
            <tr className="border-2">
              <td className="px-8 py-2 ">
                <img
                  width={100}
                  height={100}
                  src={`${config.api_image}/${Img?.BuktiUangMuka?.name}`}
                  alt="50x50"
                />
              </td>
              <td>
                <img
                  width={100}
                  height={100}
                  src={`${config.api_image}/${Img?.BuktiPelunasan?.name}`}
                  alt="50x50"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
