import React, { useState } from "react";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fatch";
export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titel: "",
    fasilitas: [
      {
        detail: "",
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
  const handleDeletform = (e) => {
    e.preventDefault();
    let _temp = [...form.harga];

    _temp.pop()({
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
      detail: "",
    });

    setForm({ ...form, fasilitas: _temp });
  };

  const handleDeletFasilitas = (e) => {
    e.preventDefault();
    let _temp = [...form.fasilitas];
    _temp.pop({
      detail: "", 
    });

    setForm({ ...form, fasilitas: _temp }); 
  };
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    const res = await postData(`/cms/pakets`, form);
    if (res?.data?.data) {
      Alert({
        title: res?.response?.data?.msg ?? "success",
        icon: "success",
      });

      setIsLoading(false);
      navigate("/paket");
    } else {
      setIsLoading(false);
      Alert({
        title: res?.response?.data?.msg ?? "name",
        icon: "warning",
      });
    }
  };
  return (
    <main className="container flex items-center justify-center  md:mt-[-4rem]">
      <div className="bg-white-20 md:ml-40 rounded-2xl mt-1 md:mt-[3rem] p-7 shadow-xl ">
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          form={form}
          isLoading={isLoading}
          handleFasilitasChange={handleFasilitasChange}
          handlePlusHarga={handlePlusHarga}
          handleHargaChange={handleHargaChange}
          handlePlusFasilitas={handlePlusFasilitas}
          handleDeletform={handleDeletform}
          handleDeletFasilitas={handleDeletFasilitas}
        />
      </div>
    </main>
  );
}
