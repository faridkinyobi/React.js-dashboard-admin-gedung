import React, { useState, useEffect } from "react";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { putData, getData } from "../../utils/fatch";

export default function Edit() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { PaketId } = useParams();
  const [form, setForm] = useState({
    titel: "",
    fasilitas: [
      {
        detai: "",
      },
    ],
    harga: [
      {
        kegiatan: "",
        hari: "",
        warga: "",
        hargadetail: "",
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchOnePaket = async () => {
    const res = await getData(`/cms/pakets/${PaketId}`);
    // console.log(res.data.data.fasilitas.detail, "res");
    setForm({
      ...form,
      titel: res.data.data.titel,
      fasilitas: res.data.data.fasilitas,
      harga: res.data.data.harga,
    });
  };

  useEffect(() => {
    fetchOnePaket();
  }, []);

  const handlePlusHarga = (e) => {
    e.preventDefault();
    let _temp = [...form.harga];

    _temp.push({
      kegiatan: "",
      hari: "",
      warga: "",
      hargadetail: "",
    });

    setForm({ ...form, harga: _temp });
  };

  const handlePlusFasilitas = (e) => {
    e.preventDefault();
    let _temp = [...form.fasilitas];
    _temp.push({
      detail: "", // Changed from `detai` to `detail`
    });

    setForm({ ...form, fasilitas: _temp }); // Changed from `harga` to `fasilitas`
  };

  const handleHargaChange = (e, i) => {
    let _temp = [...form.harga];

    _temp[i][e.target.name] = e.target.value;

    setForm({ ...form, harga: _temp });
  };

  const handleFasilitasChange = (e, i) => {
    let _temp = [...form.fasilitas];

    _temp[i][e.target.name] = e.target.value;

    setForm({ ...form, fasilitas: _temp });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await putData(`/cms/pakets/${PaketId}`, form);
    if (res?.data?.data) {
      Alert({
        title: "success",
        icon: "success",
      });
      setIsLoading(false);
      navigate("/paket");
    } else {
      setIsLoading(false);
      Alert({
        title: res?.response?.data?.msg ?? "Internal server error",
        icon:
          res?.response?.data?.msg === "Please provide email and password"
            ? "warning"
            : "error",
      });
    }
  };
  return (
    <main className=" md:h-[20rem] h-[28rem]">
      <div className="container flex items-center justify-center">
        <div className="bg-white-20 md:ml-40 rounded-2xl mt-10 sm:mt-[9rem] lg:mt-[2rem]">
          <div className="m-10">
            <Form
              edit
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              form={form}
              isLoading={isLoading}
              handleFasilitasChange={handleFasilitasChange}
              handlePlusHarga={handlePlusHarga}
              handleHargaChange={handleHargaChange}
              handlePlusFasilitas={handlePlusFasilitas}
            />
            {/* <FormSignin
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              form={form}
              isLoading={isLoading}
            /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
