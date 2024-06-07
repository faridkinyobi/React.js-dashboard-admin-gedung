import React, { useState } from "react";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fatch";
export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pengeluaran: "",
    desc: "",
  });
  //   console.log(form)

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.pengeluaran) {
      return Alert({
        title: "pengeluaran harus di isi",
        icon: "warning",
      });
    }
    if (!form.desc) {
      return Alert({
        title: "descripsi pengeluaran harus di isi",
        icon: "warning",
      });
    }
    setIsLoading(true);
    const res = await postData(`/cms/laporan`, form);
    if (res?.data?.data) {
      Alert({
        title: res?.response?.data?.msg ?? "success",
        icon: "success",
      });
      setIsLoading(false);
      navigate("/laporan");
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
        />
      </div>
    </main>
  );
}
