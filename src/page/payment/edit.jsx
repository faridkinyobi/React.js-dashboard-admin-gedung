import React, { useState, useEffect } from "react";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { putData, getData, postData, deleteData } from "../../utils/fatch";
import Button from "../../components/Button";

export default function Edit() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { PaymentId } = useParams();
  const [form, setForm] = useState({
    type: "",
    Number: "",
    image: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchOnePenyewa = async () => {
    const res = await getData(`/cms/payments/${PaymentId}`);
    setForm({
      ...form,
      type: res.data.data.type,
      image: res.data.data.image._id,
      Number: res.data.data.Number,
      avatar: res.data.data.image.name,
    });
  };

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
        if (size > 0) {
          Alert({
            title: "Please select image size less than 3 MB",
            icon: "warning",
          });
          setForm({ ...form, image: "", [e.target.name]: "" });
        } else {
          if (form.image) {
            await deleteData(`/cms/images/${form.image}`);
          }
          const res = await handleImage(e.target.files[0]);
          setForm({
            ...form,
            image: res.data.data._id,
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

  useEffect(() => {
    fetchOnePenyewa();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await putData(`/cms/payments/${PaymentId}`, form);
    if (res?.data?.data) {
      Alert({
        title: "success",
        icon: "success",
      });
      setIsLoading(false);
      navigate("/payment");
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
    <main className="bg-blue-30 md:h-[20rem] h-[28rem]">
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
