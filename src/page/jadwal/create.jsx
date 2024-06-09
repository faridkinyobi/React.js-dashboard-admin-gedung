import React, { useState } from "react";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fatch";
export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tgl_mulai: "",
    tgl_akhir: "",
    waktu: "",
    kegiatan: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let timeRange = "";
    if (value === "Pagi") {
      timeRange = "(06:00 - 18:00) Pagi";
    } else if (value === "Malam") {
      timeRange = "(18:00 - 06:00) Malam";
    }
    setForm({ ...form, [name]: value, waktu: timeRange });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const setFormformat = {
      ...form,
      tgl_akhir: form.tgl_akhir === "" ? null : form.tgl_akhir,
    };
    const res = await postData(`/cms/jadwal`, setFormformat);
    if (res?.data?.data) {
      Alert({
        title: res?.response?.data?.msg ?? "success",
        icon: "success",
      });

      setIsLoading(false);
      navigate("/jadwal");
    } else {
      setIsLoading(false);
      Alert({
        title: res?.response?.data?.msg ?? "Tanggal harus diisi",
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
        />
      </div>
    </main>
  );
}
