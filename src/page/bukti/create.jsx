import React, { useState } from "react";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate,useParams,  } from "react-router-dom";
import { deleteData, postData } from "../../utils/fatch";
export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Order: id,
    BuktiUangMuka: "",
    avatar: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData(`/cms/images`, formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        let size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);
        if (size > 2.00) {
          Alert({
            title: "Please select image size less than 3 MB",
            icon: "warning",
          });
          setForm({ ...form, image: "", [e.target.name]: "" });
        } else {
          if (form.BuktiUangMuka) {
            console.log(form.BuktiUangMuka)
            await deleteData(`/cms/images/${form.BuktiUangMuka}`);
            Alert({
              title:  "delet",
              icon: "warning",
            });
          }
          const res = await handleImage(e.target.files[0]);
          setForm({
            ...form,
            BuktiUangMuka: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        Alert({
          title: "type image png | jpg | jpeg",
          icon: "warning",
        });
        setForm({ ...form, image: "", [e.target.name]: "" });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await postData(`/cms/pembayaran`, form);
    if (res?.data?.data) {
      Alert({
        title: res?.response?.data?.msg ?? "success",
        icon: "success",
      });
      setIsLoading(false);
      navigate("/order");
    } else {
      setIsLoading(false);
      Alert({
        title: res?.response?.data?.msg ?? "name",
        icon: "warning",
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
          {/* <FormSignin
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              form={form}
              isLoading={isLoading}
            /> */}
        </div>
      </div>
    </main>
  );
}
