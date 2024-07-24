import React, { useState } from "react";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { putData, postData, deleteData } from "../../utils/fatch";
export default function Edit() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    id: id,
    BuktiPelunasan: "",
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
          setForm({ ...form, BuktiPelunasan: "", [e.target.name]: "" });
        } else {
          if (form.BuktiPelunasan) {
            await deleteData(`/cms/images/${form.BuktiPelunasan}`);
          }
          const res = await handleImage(e.target.files[0]);
          setForm({
            ...form,
            BuktiPelunasan: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        Alert({
          title: "type image png | jpg | jpeg",
          icon: "warning",
        });
        setForm({ ...form, BuktiPelunasan: "", [e.target.name]: "" });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await putData(`/cms/pembayaran`, form);
    if (res?.data?.data) {
      Alert({
        title: "success",
        icon: "success",
      });
      setIsLoading(false);
      navigate("/order");
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
    <main className="md:h-[20rem] h-[28rem]">
      <div className="container flex  justify-center ">
        <div className="bg-white-20 md:ml-40 rounded-2xl mt-5  ">
          <div className="mx-10 my-6">
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              form={form}
              isLoading={isLoading}
              edit
            />
          </div>
        </div>
      </div>
    </main>
  );
}
