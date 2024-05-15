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
    // status_kegiatan: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await postData(`/cms/jadwal`, form);
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
        icon:"warning",
      });
    }
  };
  return (
    
      <main className="container flex items-center justify-center mt-[-2rem]">
        <div className="bg-white-20 md:ml-40 rounded-2xl mt-5 md:mt-[3rem] p-2 ">
          <div className="m-7">
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              form={form}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
  );
}
