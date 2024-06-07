import React, { useState, useEffect } from "react";
import Form from "./form";
import Alert from "../../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { putData, getData } from "../../../utils/fatch";

export default function Edit() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchOneAdmin = async () => {
    const res = await getData(`/cms/getaOnedmin/${Id}`);
    if (res.data && res.data.data) {
      setForm({
        name: res.data.data[0].name,
        email: res.data.data[0].email,
        role: res.data.data[0].role,
      });
    }
  };

  useEffect(() => {
    fetchOneAdmin();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await putData(`/cms/UpdateAdmin/${Id}`, form);
    if (res?.data?.data) {
      Alert({
        title: "success",
        icon: "success",
      });
      setIsLoading(false);
      navigate("/admin");
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
    <main className="container flex items-center justify-center  md:mt-[-4rem]">
      <div className="bg-white-20 md:ml-40 rounded-2xl mt-1 md:mt-[3rem] p-7 shadow-xl ">
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          form={form}
          isLoading={isLoading}
          edit
        />
      </div>
    </main>
  );
}
